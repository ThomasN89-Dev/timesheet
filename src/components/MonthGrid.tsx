import { useState } from "react";
import { type DayEntry } from "../models/types";
import DayCard from "./DayCard";
import useCurrentMonth from "../hooks/useCurrentMonth";
import DayModal from "./DayModal";
import {
  buildDays,
  calculateWorkedHours,
  isToday,
  isWeekEnd,
  monthMap,
  weekDaysMap,
} from "../utils/dateUtils";

export default function MonthGrid() {
  const { today, currentMonth } = useCurrentMonth();
  const [days, setDays] = useState<DayEntry[]>(() => buildDays(currentMonth));
  const [selectedDay, setSelectedDay] = useState<DayEntry | null>(null);
  const weekDay = (day: DayEntry) =>
    weekDaysMap((currentMonth.firstDay + day.date - 1) % 7);

  const handleDayInfo = (day: DayEntry) => {
    setSelectedDay(day);
  };

  const handleCloseDayInfo = () => {
    setSelectedDay(null);
  };

  const handleSaveEdit = (updatedDay: DayEntry) => {
    setDays(days.map((d) => (d.date === updatedDay.date ? updatedDay : d)));
    setSelectedDay(null);
  };

  return (
    <div className="relative min-h-screen">
      <h1 className="px-8 py-4">
        {monthMap(currentMonth.month)} - {currentMonth.year}
      </h1>
      <div className="grid xl:grid-cols-7 grid-cols-5 gap-2 px-8">
        {days.map((day: DayEntry) => {
          return (
            <DayCard
              dayEntry={day}
              weekDay={weekDay(day)}
              key={day.date}
              isWeekend={isWeekEnd(day.date, currentMonth.firstDay)}
              handleInfo={() => handleDayInfo(day)}
              workedHours={calculateWorkedHours(day, "lavoro")}
              orePermesso={calculateWorkedHours(day, "permesso")}
              oreFerie={calculateWorkedHours(day, "ferie")}
              oreMalattia={calculateWorkedHours(day, "malattia")}
              isToday={isToday(day, today)}
            />
          );
        })}
      </div>
      {selectedDay && (
        <DayModal
          day={selectedDay}
          weekDay={weekDay(selectedDay)}
          onClose={handleCloseDayInfo}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}
