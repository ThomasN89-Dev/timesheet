import { useMemo, useState } from "react";
import { CAUSALS, type DayEntry } from "../../models/types";
import DayCard from "../../components/DayCard";
import useCurrentMonth from "../../hooks/useCurrentMonth";
import DayModal from "../../components/DayModal";
import {
  buildDays,
  calculateWorkedHours,
  isToday,
  isWeekEnd,
  monthMap,
  weekDaysMap,
} from "../../utils/dateUtils";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

export default function Timesheet() {
  const { month } = useParams();
  const navigate = useNavigate();
  const monthProp = Number(month);
  const { today, currentMonth } = useCurrentMonth({ monthProp });
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
    setDays(
      days.map((day) => (day.date === updatedDay.date ? updatedDay : day)),
    );
    setSelectedDay(null);
  };

  const totals = useMemo(() => {
    const causali = CAUSALS;
    const perCausale = Object.fromEntries(
      causali.map((c) => [
        c,
        days.reduce((sum, d) => sum + calculateWorkedHours(d, c), 0),
      ]),
    ) as Record<(typeof causali)[number], number>;
    return {
      ...perCausale,
      totale: Object.values(perCausale).reduce((a, b) => a + b, 0),
    };
  }, [days]);

  return (
    <div className="relative min-h-screen">
      <div className="flex justify-between items-center p-8">
        <h1>
          {monthMap(currentMonth.month)} - {currentMonth.year}
        </h1>
        <Button
          onClick={() => navigate("/timesheet-overview")}
          variant="outline"
        >
          Torna alla panoramica <MoveLeft />
        </Button>
      </div>
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
      <div className="px-8 py-4 flex gap-6">
        <span>Lavoro: {totals.lavoro}h</span>
        <span>Permesso: {totals.permesso}h</span>
        <span>Ferie: {totals.ferie}h</span>
        <span>Malattia: {totals.malattia}h</span>
        <span className="font-bold">Totale: {totals.totale}h</span>
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
