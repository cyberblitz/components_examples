"use client";

import { cn } from '@/utils/cn';
import { CalendarCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';



//this one creates the grid rendering by column

const OuterBorderHighlightByRow = () => {
    const columns = 8
    const rows = 50

    const [state, setState] = useState({
        selectedColumn: 0
    });


    const headerStyle = `flex items-center justify-center h-5 flex-grow bg-gray-100 cursor-pointer `

    const rowStyle = `flex items-center justify-center h-5 flex-grow bg-gray-100`



    const onHeaderClick = (i: number) => {

        setState((prev) => ({ ...prev, selectedColumn: i, highlightColumn: i >= 0 && true }));

    }

    return (

        <>
            <div className={`flex sticky top-0 `}>

                {[...Array(columns)].map((_, i) => (

                    <>
                        <div className={cn(`${headerStyle}`, `${state.selectedColumn === i ? "bg-sky-600  border-t-2 border-l-2 border-r-2 border-sky-600" : "bg-gray-100 border-gray-200 border-l-2 border-t-2 "}`)}
                            onClick={() => onHeaderClick(i)}>HEADER {i + 1}</div>
                    </>

                ))}

            </div>

            {[...Array(rows)].map((_, i) => (

                <div className={`flex  `}>

                    {[...Array(columns)].map((_, i) => (

                        <>
                            <div className={cn(`${rowStyle}`, `${state.selectedColumn === i ? "border-sky-600 border-l-2 border-r-2 border-t-gray-200" : "border-gray-200 border-l-2 border-t-2"}`)}
                                onClick={() => {}}>ROW {i + 1}</div>
                        </>

                    ))}

                </div>

            ))}

            <div className={`flex  `}>

                {[...Array(columns)].map((_, i) => (

                    <div className={cn(`${rowStyle}`, `${state.selectedColumn === i ? "border-sky-600 border-l-2 border-r-2 border-b-2 border-t-gray-200" : "border-gray-200 border-l-2 border-t-2"}`)}
                        onClick={() => {}}>ROW {i + 1}</div>

                ))}

            </div>

        </>
    )
};

export default OuterBorderHighlightByRow;
