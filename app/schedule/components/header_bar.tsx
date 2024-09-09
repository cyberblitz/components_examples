"use client";
import { addMonths, eachDayOfInterval, endOfMonth, format, parseISO, startOfMonth, subMonths } from "date-fns"
import { Button } from "@/components/ui/button";
import { CalendarCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";



type Tprops = {
    selectedMonth: (datesInMonth: Date[]) => void
    searchTerm: (term: string) => void
}

export default function  HeaderBar({selectedMonth, searchTerm}: Tprops) {

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


       const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => searchTerm(e.target.value), 300);
    

    return (
        

        <div className={'flex  h-20 sticky top-0 w-full items-center justify-start border p-2 bg-blue-100 '}>
            <div className={`flex flex-col justify-center `}>
                <div className={`flex flex-row items-center`}>
                    <Button variant={'ghost'} size={'sm'} onClick={prevDate}>
                        <ChevronLeft strokeWidth={3} size={22} color={'blue'} />
                    </Button>
                    <h1 className="font-bold min-w-32 border text-center">{format(startDate, 'MMMM yyyy')}</h1>
                    <Button variant={'ghost'} size={'sm'} onClick={nextDate}>
                        <ChevronRight strokeWidth={3} size={22} color={'blue'} />
                    </Button>
                
                </div>
                <div className={'flex w-40 ml-8'}>
                        <Input type="search" placeholder="Search" className={`h-8 `} onChange={handleSearch}/>
                </div>
              

            </div>

            <Button variant={'ghost'} size={'sm'} onClick={moveToday}>
                        <div className={`flex flex-col items-center justify-center`}><CalendarCheck strokeWidth={2} size={22} color={'green'} />
                            <span className={``}>NOW</span>
                        </div>
                    </Button>
           
            </div>
    );
}