import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { activityData, activityDataByTitle, SelectedCell } from "./outer_border_highlight_by_row";
import { format, toDate } from "date-fns";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";




type Tprops = {
    rowStyle: string,
    ParentState: {
        selectedColumn: number;
        datesInMonth: Date[];
        editCell: boolean;
    }
    groupedData: activityDataByTitle[];
    item: {
        title: string;
        data: activityData[];
    }
    activity_i: number
    group_i: number,
    dateInMonth: Date,
    group: activityDataByTitle
    i: number
    selectedCell: { activity_i: number; group_i: number, activityDate: Date } | null;
    setSelectedCell: ({activity_i, group_i, activityDate} : SelectedCell) => void ;
  
}




export default function Cell({ rowStyle, ParentState, groupedData, item, activity_i, group_i, dateInMonth, group, i,  selectedCell, setSelectedCell, }: Tprops) {

    const [state, setState] = useState({
        editCell: false,
        cellValue: "",
    })

    const isActive =  selectedCell?.activity_i === -1 &&  selectedCell?.group_i === -1 ||  selectedCell?.activity_i === activity_i && selectedCell?.group_i === group_i && format(toDate(selectedCell?.activityDate), "yyyy-MM-dd") === format(dateInMonth, "yyyy-MM-dd")
    // console.log("activity_i", selectedCell?.activity_i )
    // console.log("group_i", selectedCell?.group_i)
    // console.log("isActive", isActive)

    const handleXClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent onBlur from being called after click
        setSelectedCell({activity_i:-1, group_i: -1, activityDate: new Date()}); // Reset selectedCell after blur
        setState((prev) => ({ ...prev, editCell: false }));
    
    };

    const handleAcceptClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent onBlur from being called after click


        // console.log("state.cellValue:","group:" , group, "item:", item.title, state.cellValue, "selectedCell:", selectedCell)
        console.log({
            CellData: {
                group: group.group,
                title: item.title,
                date: format(dateInMonth, "yyyy-MM-dd"),
                value: state.cellValue
            }

    });


        setSelectedCell({activity_i:-1, group_i: -1, activityDate: new Date()}); // Reset selectedCell after blur
        setState((prev) => ({ ...prev, editCell: false }));
    };






    // console.log("state.editCell", state.editCell)

    return (

        <div key={activity_i + group_i + i}
            className={cn(
                rowStyle,
                `hover:bg-sky-500 cursor-pointer px-[1px]  `,
                ParentState.selectedColumn === i
                    ? `border-sky-600 border-l-2 border-r-2  border-t-gray-200 border-t ${groupedData.length - 1 === group_i && group.activity.length - 1 === activity_i && "border-b-2"}`
                    : "border-gray-200 border-l border-t")}
            onClick={() => {
           
                    setSelectedCell({ activity_i, group_i, activityDate: dateInMonth });
                     setState((prev) => ({ ...prev, editCell: true }));
                    console.log({
                        CellClicked: {
                            group: group.group,
                            title: item.title,
                            date: format(dateInMonth, "yyyy-MM-dd"),
                            value: state.cellValue
                        }

                });
            }}
             style={{ pointerEvents: isActive ? "auto" : "none" }}
        >

            {!state.editCell
                ? <p className={`text-center font-semibold`}>{item.data.find((activity) => format(toDate(activity.date), "yyyy-MM-dd") === format(dateInMonth, "yyyy-MM-dd") && activity.title === item.title)?.value}</p>
                :
                <>

                    <Input
                          autoFocus
                        //    onBlur={handleBlur}
                        
                        value={item.data.find((activity) => format(toDate(activity.date), "yyyy-MM-dd") === format(dateInMonth, "yyyy-MM-dd") && activity.title === item.title)?.value}
                        className={`h-4 border-none rounded-none text-center font-semibold focus-visible:outline-none  focus-visible:ring-0  focus-visible:ring-offset-0  `}
                        onChange={(e) => {                            
                            setState((prev) => ({...prev, cellValue: e.target.value}));
                        }} />

                    <div className={`relative right-[-10px] w-0 top-2`}> 
                        <div className={`flex w-10 h-10 space-x-1`}>
                            <Button size={'icon'} className={`h-6 w-6 p-1`} onClick={handleAcceptClick}> <Check size={20} color={"green"} /></Button>
                            <Button size={'icon'} className={`h-6 w-6 p-1`} onClick={handleXClick} > <X size={20} color={"red"} /></Button>

                        </div>
                    </div>
                </>
            }

        </div>

    )

}