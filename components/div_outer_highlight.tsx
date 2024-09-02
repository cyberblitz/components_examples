"use client";

import React, { useState } from 'react';


//this one creates the grid rendering by column

const Div_Outer_Highlight = () => {
 
    const [state, setState] = useState({
            selectedColumn: 0
         });


    const rowStyle = `flex items-center justify-left h-5 border-b border-gray-500 bg-gray-50 text-left pl-1`


    const onHeaderClick = (i: number) => {

        setState((prev) => ({...prev, selectedColumn: i, highlightColumn: i >= 0 && true}));

    }

    return (
        <div className={`flex m-2 `}>

            {[...Array(7)].map((_, i) => (

                <div className={` w-36 border-2 ${state.selectedColumn === i ? "border-blue-500" : "border-gray-500"} cursor-pointer  `} >

                    <div className={`flex items-center justify-center h-5 border-b border-black ${state.selectedColumn === i ? "bg-blue-500" : "bg-gray-200"}`} onClick={() => onHeaderClick(i)}>HEADER {i + 1}</div>

                    {[...Array(8)].map((_, i) => (<div key={i} className={rowStyle}>ROW</div>))}

                </div>
            ))}

        </div>
    );
  };

export default Div_Outer_Highlight;
