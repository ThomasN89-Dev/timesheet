import { useEffect, useState } from "react";
import { MONTHS, WEEKDAYS, type DayEntry } from "../models/types";
import DayCard from "./DayCard";
import { timeToMinutes } from "../utils/time";
import useCurrentMonth from "../hooks/useCurrentMonth";

export default function MonthGrid() {
  const [selectedDay, setSelectedDay] = useState<DayEntry | null>(null);
  const { today, currentMonth } = useCurrentMonth();
  function monthMap(month: number) {
    return MONTHS[month - 1];
  }

  function weekDaysMap(weekDay: number) {
    return WEEKDAYS[weekDay];
  }

  const isWeekEnd = (day: number) => {
    const weekDay = (currentMonth.firstDay + day - 1) % 7;
    return weekDay === 6 || weekDay === 0;
  };

  const numberArray = Array.from({ length: currentMonth.days }, (_, i) => {
    const day = i + 1;
    const workingDay: DayEntry = {
      date: day,
      slots: isWeekEnd(day)
        ? []
        : [
            { id: crypto.randomUUID(), startTime: "09:00", endTime: "13:00" },
            { id: crypto.randomUUID(), startTime: "14:00", endTime: "18:00" },
          ],
    };

    return workingDay;
  });

  const isToday = (day: DayEntry) => day.date === today;

  const calculateWorkedHours = (day: DayEntry): number => {
    const totalMinutes =
      day.slots?.reduce((sum, t) => {
        return sum + timeToMinutes(t.endTime) - timeToMinutes(t.startTime);
      }, 0) ?? 0;

    const minutesToHours = totalMinutes / 60;

    return minutesToHours;
  };

  const handleDayInfo = (day: DayEntry) => {
    setSelectedDay(day);
  };

  useEffect(() => {
    console.log(selectedDay);
  }, [selectedDay]);

  return (
    <div>
      <h1 className="px-8 py-4">
        {monthMap(currentMonth.month)} - {currentMonth.year}
      </h1>
      <div className="grid xl:grid-cols-7 grid-cols-5 gap-2 px-8">
        {numberArray.map((day: DayEntry) => {
          return (
            <DayCard
              dayEntry={day}
              weekDay={weekDaysMap((currentMonth.firstDay + day.date - 1) % 7)}
              key={day.date}
              isWeekend={isWeekEnd(day.date)}
              handleInfo={() => handleDayInfo(day)}
              workedHours={calculateWorkedHours(day)}
              isToday={isToday(day)}
            />
          );
        })}
      </div>
    </div>
  );
}
