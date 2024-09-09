import { Calendar } from "@/components/ui/calendar"
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function CalendarView() {
  const [date, setDate] = useState<DateRange | undefined>({ from: new Date() });

  const handleSelectRange = (range: DateRange | undefined) => {
    setDate(range);
  };

  return (
    <Calendar
      mode="range"
      selected={date}
      onSelect={handleSelectRange}
      className="border rounded-md w-full"
    />
  );
}