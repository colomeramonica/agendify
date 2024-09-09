import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Card } from "./ui/card";
import dayjs from 'dayjs'
import objectPlugin from "dayjs/plugin/toObject";
import isTodayPlugin from "dayjs/plugin/isToday";
import weekdayPlugin from "dayjs/plugin/weekday";
import { ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";
import { Button } from "./ui/button";

dayjs.extend(weekdayPlugin);
dayjs.extend(objectPlugin);
dayjs.extend(isTodayPlugin);

export default function ListView() {
  const now = dayjs();
  const [currentMonth, setCurrentMonth] = useState(now);
  const [arrayOfDays, setArrayOfDays] = useState<{ dates: { day: number; weekday: string; month: number; year: number; isCurrentMonth: boolean; isCurrentDay: boolean; }[]; }[]>([]);
  const currentDayRef = useRef<HTMLDivElement | null>(null);

  const nextMonth = () => {
    const plus = currentMonth.add(1, "month");
    setCurrentMonth(plus);
  };
  const prevMonth = () => {
    const minus = currentMonth.subtract(1, "month");
    setCurrentMonth(minus);
  };

  const formateDateObject = useCallback((date: dayjs.Dayjs) => {
    const clonedObject = { ...date.toObject() };
    return {
      day: clonedObject?.date,
      weekday: date.format("ddd"),
      month: clonedObject.months,
      year: clonedObject.years,
      isCurrentMonth: clonedObject.months === currentMonth.month(),
      isCurrentDay: date.isToday(),
    };
  }, [currentMonth]);

  useEffect(() => {
    const getAllDays = () => {
      let currentDate = currentMonth.startOf("month");
      const endOfMonth = currentMonth.endOf("month");
      const allDates = [];
      let weekDates = [];
      let weekCounter = 1;

      while (currentDate.isBefore(endOfMonth) || currentDate.isSame(endOfMonth, 'day')) {
        const formatted = formateDateObject(currentDate);
        weekDates.push(formatted);
        if (weekCounter === 7) {
          allDates.push({ dates: weekDates });
          weekDates = [];
          weekCounter = 0;
        }
        weekCounter++;
        currentDate = currentDate.add(1, "day");
      }

      if (weekDates.length > 0) {
        allDates.push({ dates: weekDates });
      }

      setArrayOfDays(allDates);
    };

    getAllDays();
  }, [currentMonth, formateDateObject]);

  useEffect(() => {
    if (currentDayRef.current) {
      currentDayRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [arrayOfDays]);

  return (
    <>
      <div className="flex flex-row gap-1 items-center justify-center p-2">
        <div>
          <Button className="icon" variant="outline" size="icon" onClick={() => prevMonth()}>
            <ChevronLeft className="h-4 stroke-slate-700 w-4" />
          </Button>
        </div>
        <div>
          <h3 className="dark:text-gray-300 font-bold text-slate-700 text-xl">{currentMonth.format("MMMM")}</h3>
        </div>
        <Button variant="outline" size="icon" className="col col-end" onClick={() => nextMonth()}>
          <ChevronRight className="h-4 stroke-slate-700 w-4" />
        </Button>
      </div>
      {arrayOfDays.map((week) => (
        week.dates.map((day, index) => (
          <Card className="m-3" key={index} ref={day.isCurrentDay ? currentDayRef : null}>
            <div className="flex w-full">
              <div className="bg-gray-100 dark:bg-gray-500 flex flex-row grow-0 justify-center p-3 rounded w-1/6">
                <h3 className="dark:text-gray-300 font-bold text-2xl text-center text-slate-700">{day.day}<br />{day.weekday}</h3>
              </div>
              <div className="align-middle flex flex-col grow p-3">
                <h3 className="dark:text-gray-300 font-bold p-1 text-center text-slate-700 text-xl">Class Meeting</h3>
                <div className="align-middle flex flex-row gap-1 items-center justify-between ml-2">
                  <div className="flex flex-row gap-1 items-center">
                    <Clock className="h-4 stroke-slate-500 w-4" />
                    <span className="dark:text-slate-400 text-slate-500 text-sm">10:00 AM - 11:00 AM</span>
                  </div>
                  <div className="align-middle flex flex-row gap-1 items-center">
                    <MapPin className="h-4 stroke-slate-500 w-4" />
                    <span className="dark:text-slate-400 text-slate-500 text-sm">Online</span>
                  </div>
                  <div className="h-[30px] items-center w-[30px]">
                    <Avatar className="h-[30px] w-[30px]">
                      <AvatarImage src="https://github.com/shadcn.png" className="rounded-full" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))
      ))}
    </>
  );
}