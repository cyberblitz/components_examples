"use client"
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import {  activityDataByTitle } from "./outer_border_highlight_by_row";
import { useState } from "react";

type Tprops = {
    rowStyle: string,
    parentState: {
        selectedColumn: number;
        datesInMonth: Date[];
        editCell: boolean;
        rowExpanded: Record<string, boolean>,
    }
    group: activityDataByTitle
    toggleRow: (headerName: string) => void ;
}


export default function RowHeader({group, parentState, rowStyle, toggleRow}: Tprops) {

const isExpanded = parentState.rowExpanded[group.group];

return(
    
    <div className={`flex`}>
    <div className={`flex min-w-60  h-5 border-t border-r-2 border-gray-200 items-center pl-2 sticky left-0 bg-gray-300 z-10 justify-between`}>
        <p className={`font-semibold`}>{group.group}</p>
        {isExpanded 
                    ? <ChevronUp onClick={() => toggleRow(group.group)} /> 
                    : <ChevronDown onClick={() => toggleRow(group.group)} />}
       
    </div>

    {parentState.datesInMonth.map((_, i) => (
        <>
            <div className={cn(`${rowStyle} bg-gray-300`, `${parentState.selectedColumn === i ? "border-sky-600 border-l-2 border-r-2 border-t-gray-200 border-t" : "border-t-gray-200   border-t "}`)}
                onClick={() => { }}></div>
        </>
    ))}

</div>


)

}