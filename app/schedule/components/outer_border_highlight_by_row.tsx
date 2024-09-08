"use client";

import { cn } from '@/utils/cn';
import React, { useMemo, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { format, isEqual, startOfMonth, startOfWeek, toDate } from 'date-fns';
import HeaderBar from './header_bar';


type activityData = {
    id: number
    date: string
    group: string
    title: string
    value: string
}

type activityDataByTitle ={
    group: string
    data: activityData[];


}

const shifts: activityData[] = [    
    { id: 0, date: '2024-09-03', group: 'ACUITY',   title: "1:1",                   value: '10' },
    { id: 1, date: '2024-09-04', group: 'ACUITY',   title: "1:2",                   value: '4.5' },
    { id: 2, date: '2024-09-05', group: 'ACUITY',   title: "2:1",                   value: '10' },
    { id: 3, date: '2024-09-06', group: 'STAFF',    title: "DAY SHIFT",             value: '12' },
    { id: 4, date: '2024-09-07', group: 'STAFF',    title: "SICK",                  value: '15' },
    { id: 5, date: '2024-09-08', group: 'KPI',      title: "OUT OF HOURS D/C",      value: '7' },
    { id: 6, date: '2024-09-09', group: 'KPI',      title: "INABILITY TO ADMIT",    value: '8' },

    // Add more shift data as needed...
];


const getGroupByGroup = (shifts: activityData[]): activityDataByTitle[] => {
    return shifts.reduce<activityDataByTitle[]>((acc, item) => {
      let group = acc.find(r => r.group === item.group);
      if (!group) {
        group = { group: item.group, data: [] };
        acc.push(group);
      }
      group.data.push(item);
      return acc;
    }, []);
  };





function dateConverter(date: string) {

    const startOfWeek_ = startOfMonth(new Date());


    const dateObj = new Date().toLocaleDateString('en-GB').split('/').reverse().join('-');

    // const year = dateObj.getFullYear();
    // const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    // const day = String(dateObj.getDate()).padStart(2, '0');
    // return `${year}-${month}-${day}`;
}


const OuterBorderHighlightByRow = () => {

    const [state, setState] = useState({
        selectedColumn: 0,
        datesInMonth: [] as Date[],
    });

   
// console.log("getGroupByTitle", getGroupByTitle)


    const dateObj = new Date().toLocaleDateString('en-GB').split('/').reverse().join('-');

    // console.log(dateObj)

    const headerStyle = `flex justify-center items-center h-5 flex-grow bg-gray-100 cursor-pointer min-w-14 h-12 z-10`
    const rowStyle = `flex items-center justify-center h-5 flex-grow bg-gray-100 min-w-14`


    const groupedShifts = useMemo(() => getGroupByGroup(shifts), [shifts]);

    return (
        <>
            <HeaderBar selectedMonth={(datesInMonth: Date[]) => { setState((prev) => ({ ...prev, datesInMonth })) }} />

            <div className="w-[calc(100vw-1rem)] h-[calc(100vh-5rem)] m-3 border border-black justify-center items-center overflow-auto">
                <div className={`flex sticky top-0 z-20 bg-white `}>

                    <div className='flex flex-grow items-center justify-center border-gray-200 border-l-2 border-t-2  min-w-60 h-12  z-20'>
                            <div className={`  `}>ACTIVITY DATA</div>
                    </div>

                    {state.datesInMonth.map((dateInMonth, i) => (

                        <div className={cn(headerStyle, state.selectedColumn === i 
                            ? "bg-sky-600 border-t-2 border-l-2 border-r-2 border-sky-600" 
                            : "bg-gray-100 border-gray-200 border-l border-t ")}
                            onClick={() => setState((prev) => ({ ...prev, selectedColumn: i, highlightColumn: i >= 0 && true }))}>
                            <div className={`flex-col `}>
                                <p className={`text-center font-bold`}>{format(dateInMonth, "do")}</p>
                                <p className={`text-center font-semibold`}>{format(dateInMonth, "iii")}</p>
                            </div>
                        </div>

                    ))}

                </div>

                {groupedShifts.map((item, i) => (
                    <>
                    <div className={`flex`}>
                        <div className={`flex min-w-60  h-5 border-t border-r-2 border-gray-200 items-center pl-2 sticky left-0 bg-gray-300 z-10`}>
                            <p className={`font-semibold`}>{item.group}</p>
                        </div>           
                     
                        {state.datesInMonth.map((_, i) => (
                            <>
                                <div className={cn(`${rowStyle} bg-gray-300`, `${state.selectedColumn === i ? "border-sky-600 border-l-2 border-r-2 border-t-gray-200 border-t" : "border-t-gray-200   border-t "}`)}
                                    onClick={() => { }}></div>
                            </>
                        ))}
        
                    </div>

             {item.data.map((item, i) => (

                 <div className={`flex`}>

                    <div className={`flex min-w-60 flex-grow  h-5 border-t border-r-2 border-gray-200 items-center pl-2 sticky left-0 bg-gray-100 z-10`}>
                            <p className={`font-semibold pl-2`}>{item.title}</p>
                    </div>  


                    {state.datesInMonth.map((dateInMonth, i) => (
                            <>
                                <div className={cn(`${rowStyle} hover:bg-sky-100 cursor-pointer`, `${state.selectedColumn === i ? "border-sky-600 border-l-2 border-r-2 border-t-gray-200 border-t" : "border-gray-200 border-l border-t  "}`)}
                                    onClick={() => { }}>

                                      {format(toDate(item.date),"yyyy-MM-dd") === format(dateInMonth, "yyyy-MM-dd")  ? 
                                      <p className={`text-center font-semibold`}>{item.value}</p> : 
                                      <p className={`text-center font-semibold`}></p>}


                                    </div>
                            </>
                        ))}

                 </div>
                


             ))}

</>

                ))}

                {/* <div className={`flex`}>
                    <div className={`min-w-40  h-5 border-b border-gray-200`}>title</div>
                        {state.datesInMonth.map((_, i) => (
                                            
                                <div className={cn(`${rowStyle}`, `${state.selectedColumn === i ? "border-sky-600 border-l-2 border-r-2 border-b-2 border-t-gray-200" : "border-gray-200 border-l-2 border-t-2"}`)}
                                onClick={() => {}}>000{i + 1}</div>
                        ))}
            </div> */}

            </div>
        </>
    )
};

export default OuterBorderHighlightByRow;
