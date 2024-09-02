"use client";
import { addDays, eachDayOfInterval, format, parseISO, startOfWeek, subDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { CalendarCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function  HeaderBar() {

    const scheduleToday = parseISO(startOfWeek(new Date(), { weekStartsOn: 1 }).toISOString())

    const [startDate, setStartDate] = useState(scheduleToday)
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
 
    const nextDate = () => setStartDate(addDays(startDate, 7))

    const prevDate = () => setStartDate(subDays(startDate, 7))    

    const moveToday = () => setStartDate(scheduleToday)    

    const endDate = addDays(startDate, 6)

    const dates = eachDayOfInterval({ start: startDate, end: endDate });

    const handleHeaderClick = (date: Date) => selectedDate === date.toISOString() ? setSelectedDate(null) : setSelectedDate(date.toISOString())


    return (
        
<div className={`flex flex-row w-full items-center border p-2 bg-blue-100 sticky top-0 h-14`}>
                <Button variant={'ghost'} size={'sm'} onClick={prevDate}>
                    <ChevronLeft strokeWidth={3} size={22} color={'blue'} />
                </Button>
                <h1 className="font-bold">Shift Schedule: {format(startDate, 'dd/MM/yy')}-{format(endDate, 'dd/MM/yy')}</h1>
                <Button variant={'ghost'} size={'sm'} onClick={nextDate}>
                    <ChevronRight strokeWidth={3} size={22} color={'blue'} />
                </Button>
                <Button variant={'ghost'} size={'sm'} onClick={moveToday}>
                    <div className={`flex flex-col items-center justify-center`}><CalendarCheck strokeWidth={3} size={22} color={'green'} />
                        <span className={`font-black`}>TODAY</span>
                    </div>
                </Button>
            </div>

    );
}