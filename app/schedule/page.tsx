

import HeaderBar from "./components/header_bar";
import OuterBorderHighlightByRow from "./components/outer_border_highlight_by_row";
import { useState } from "react";

export default function Schedule() {

    

    return (
        <div className="flex flex-col w-full">

         
                <HeaderBar />
    
            <div className="w-[calc(100vw-2rem)] h-[calc(100vh-4rem)] m-2  border border-black justify-center items-center overflow-y-scroll">
                <OuterBorderHighlightByRow />
            </div>

        </div>
    )
}
