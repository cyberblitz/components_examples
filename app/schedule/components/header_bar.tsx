"use client";
import { addMonths, eachDayOfInterval, endOfMonth, format, parseISO, startOfMonth, subMonths } from "date-fns"
import { Button } from "@/components/ui/button";
import { CalendarCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useEffect } from "react";

type Tprops = {
    selectedMonth: (datesInMonth: Date[]) => void

}

export default function  HeaderBar({selectedMonth}: Tprops) {

    const scheduleToday = parseISO(startOfMonth(new Date()).toISOString())

    const [startDate, setStartDate] = useState(scheduleToday)
    // const [selectedDate, setSelectedDate] = useState<string | null>(null);
 
    const nextDate = () => setStartDate(addMonths(startDate, 1))

    const prevDate = () => setStartDate(subMonths(startDate, 1))    

    const moveToday = () => setStartDate(scheduleToday)    

    const endDate = endOfMonth(startDate)

    const datesInMonth = eachDayOfInterval({ start: startDate, end: endDate });

    //const handleHeaderClick = (date: Date) => selectedDate === date.toISOString() ? setSelectedDate(null) : setSelectedDate(date.toISOString())
    
       useEffect(() => selectedMonth(datesInMonth),[startDate])


    return (
        
            <div className={`flex flex-row w-full items-center border p-2 bg-blue-100 sticky top-0 h-14`}>
                <Button variant={'ghost'} size={'sm'} onClick={prevDate}>
                    <ChevronLeft strokeWidth={3} size={22} color={'blue'} />
                </Button>
                <h1 className="font-bold min-w-32 border text-center">{format(startDate, 'MMMM yyyy')}</h1>
                <Button variant={'ghost'} size={'sm'} onClick={nextDate}>
                    <ChevronRight strokeWidth={3} size={22} color={'blue'} />
                </Button>
                <Button variant={'ghost'} size={'sm'} onClick={moveToday}>
                    <div className={`flex flex-col items-center justify-center`}><CalendarCheck strokeWidth={2} size={22} color={'green'} />
                        <span className={``}>NOW</span>
                    </div>
                </Button>
            </div>

    );
}