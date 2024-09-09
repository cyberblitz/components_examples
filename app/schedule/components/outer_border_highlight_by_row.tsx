"use client";

import { cn } from "@/lib/utils";
import React, { useCallback, useMemo, useState } from 'react';
import { format, startOfMonth } from 'date-fns';
import HeaderBar from './header_bar';
import Cell from "./cell";
import RowHeader from "./rowHeader";

export type activityData = {
    id: number
    date: string
    group: string
    title: string
    value: string
}

export type activityDataByTitle = {
    group: string
    activity: {
        title: string
        data: activityData[];
    }[]
}

export type SelectedCell = {
    activity_i: number;
    group_i: number;
    activityDate: Date;
}




const shifts: activityData[] = [
    { id: 0,    date: '2024-09-01',     group: 'ACUITY',    title: "1:1",                   value: '10' },
    { id: 1,    date: '2024-09-01',     group: 'ACUITY',    title: "1:2",                   value: '4.5' },
    { id: 2,    date: '2024-09-01',     group: 'ACUITY',    title: "2:1",                   value: '9' },
    { id: 3,    date: '2024-09-01',     group: 'STAFF',     title: "DAY SHIFT",             value: '12' },
    { id: 4,    date: '2024-09-01',     group: 'STAFF',     title: "SICK",                  value: '15' },
    { id: 5,    date: '2024-09-01',     group: 'KPI',       title: "OUT OF HOURS D/C",      value: '7' },
    { id: 6,    date: '2024-09-01',     group: 'KPI',       title: "INABILITY TO ADMIT",    value: '8' },
    { id: 8,    date: '2024-09-02',     group: 'ACUITY',    title: "1:2",                   value: '5' },
    { id: 9,    date: '2024-09-02',     group: 'ACUITY',    title: "2:1",                   value: '10' },
    { id: 10,   date: '2024-09-02',     group: 'STAFF',     title: "SICK",                  value: '14' },
    { id: 11,   date: '2024-09-02',     group: 'KPI',       title: "OUT OF HOURS D/C",      value: '8' },
    { id: 12,   date: '2024-09-02',     group: 'KPI',       title: "INABILITY TO ADMIT",    value: '9' },
    { id: 13,   date: '2024-10-03',     group: 'ACUITY',    title: "1:2",                   value: '7' },
    { id: 14,   date: '2024-10-03',     group: 'ACUITY',    title: "2:1",                   value: '8' },

    // Add more shift data as needed...
];


const getGroupByGroup = (shifts: activityData[]): activityDataByTitle[] => {
    return shifts.reduce<activityDataByTitle[]>((acc, item) => {
        // Find if group already exists in the accumulator
        let group = acc.find((g) => g.group === item.group);

        // If group doesn't exist, create a new one
        if (!group) {
            group = { group: item.group, activity: [] };
            acc.push(group);
        }

        // Find if title exists within the group's activity
        let title = group.activity.find((t) => t.title === item.title);

        // If title doesn't exist, create a new one
        if (!title) {
            title = { title: item.title, data: [] };
            group.activity.push(title);
        }

        // Add the current item to the title's data array
        title.data.push(item);

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
        selectedColumn: -1,
        datesInMonth: [] as Date[],
        editCell: Boolean(false),
        selectedCell: {
            activity_i: -1, 
            group_i: -1,
            activityDate: new Date()
        },
        rowExpanded: {} as Record<string, boolean>,
       
    });


    // console.log("getGroupByTitle", getGroupByTitle)

    // console.log(dateObj)

    const headerStyle = `flex justify-center items-center h-5  bg-gray-100 cursor-pointer min-w-14 h-12 z-10`
    const rowStyle = `flex items-center justify-center h-5 bg-gray-100 min-w-14`


    const groupedData = useMemo(() => getGroupByGroup(shifts), [shifts]);

    const handleHeaderClick = useCallback(
        (i: number) => {
            setState((prev) => ({
                ...prev,
                selectedColumn: i
            }));
        },
        [setState]
    );

    const toggleRow = (groupName: string) => {
        setState((prev) => ({
            ...prev,
            rowExpanded: {
                ...prev.rowExpanded,
                [groupName]: !prev.rowExpanded[groupName], // Toggle expansion for the specific group
            },
        }));
    };

    console.log("state.selectedCell.activity_i", state.selectedCell.activity_i)

    return (
        <>
            <HeaderBar selectedMonth={(datesInMonth: Date[]) => { setState((prev) => ({ ...prev, datesInMonth })) }} />

            <div className="w-[calc(100vw-1rem)] h-[calc(100vh-5rem)] m-3 border border-black justify-center items-center overflow-auto">
                <div className={`flex sticky top-0 z-20 bg-white `}>

                    <div className='flex flex-grow items-center justify-center border-gray-200 border-l-2 border-t-2  min-w-60 h-12  z-20'>
                        <div className={` font-bold text-2xl `}>ACTIVITY DATA</div>
                    </div>

                    {state.datesInMonth.map((dateInMonth, i) => (

                        <div className={cn(headerStyle, state.selectedColumn === i
                            ? "bg-sky-600 border-t-2 border-l-2 border-r-2 border-sky-600"
                            : format(new Date(), "yyyy-MM-dd") === format(dateInMonth, "yyyy-MM-dd") ? "bg-green-300 border-gray-200 border-l border-t " : "bg-gray-200 border-gray-200 border-l border-t ")}
                            onClick={() => handleHeaderClick(i)}>
                            <div className={`flex-col `}>
                                <p className={`text-center font-bold`}>{format(dateInMonth, "do")}</p>
                                <p className={`text-center font-semibold`}>{format(dateInMonth, "iii")}</p>
                            </div>
                        </div>

                    ))}

                </div>

                {groupedData.map((group, group_i) => (
                    <>

                        <RowHeader rowStyle={rowStyle} parentState={state} group={group} toggleRow={toggleRow} />
     
                        {!state.rowExpanded[group.group] && group.activity.map((item, activity_i) => (

                            <div className={`flex`}>

                                <div className={`flex min-w-60 flex-grow  h-5 border-t border-r-2 border-gray-200 items-center pl-2 sticky left-0 bg-gray-100 z-10`}>
                                    <p className={`font-semibold pl-2`}>{item.title}</p>
                                </div>


                                {state.datesInMonth.map((dateInMonth, i) => (
                             
                                    <Cell 
                                        rowStyle={rowStyle} 
                                        ParentState={state} 
                                        groupedData={groupedData} 
                                        dateInMonth={dateInMonth} 
                                        group={group} 
                                        item={item} 
                                        activity_i={activity_i} 
                                        group_i={group_i} 
                                        i={i}
                                        selectedCell={state.selectedCell}
                                        setSelectedCell={(newSelectedCell: SelectedCell) => {                        
                                            setState((prev) => ({
                                                ...prev,
                                                selectedCell: newSelectedCell
                                            }));
                                        }}                             
                                        />
                                ))}

                            </div>



                        ))}

                    </>

                ))}

            </div>
        </>
    )
};

export default OuterBorderHighlightByRow;
