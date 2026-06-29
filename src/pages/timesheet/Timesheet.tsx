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
import { Navigate, useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function TimesheetGuard() {
  const { month, year } = useParams();
  const monthProp = Number(month);
  const yearProp = Number(year);

  if (isNaN(monthProp) || monthProp < 1 || monthProp > 12) {
    return <Navigate to="/timesheet-overview" />;
  }

  return <Timesheet yearProp={yearProp} monthProp={monthProp} />;
}

function Timesheet({
  monthProp,
  yearProp,
}: {
  monthProp: number;
  yearProp: number;
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { today, currentMonth } = useCurrentMonth({ monthProp, yearProp });
  const [days, setDays] = useState<DayEntry[]>(() => {
    return localStorage.getItem(`timesheet-${monthProp}`)
      ? JSON.parse(localStorage.getItem(`timesheet-${monthProp}`)!)
      : buildDays(currentMonth);
  });
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
    const updatedDays = days.map((day) =>
      day.date === updatedDay.date ? updatedDay : day,
    );
    setDays(updatedDays);
    setSelectedDay(null);
    localStorage.setItem(`timesheet-${monthProp}`, JSON.stringify(updatedDays));
  };

  const totals = useMemo(() => {
    const causals = CAUSALS;
    const byCausal = Object.fromEntries(
      causals.map((c) => [
        c,
        days.reduce((sum, d) => sum + calculateWorkedHours(d, c), 0),
      ]),
    ) as Record<(typeof causals)[number], number>;
    return {
      ...byCausal,
      total: Object.values(byCausal).reduce((a, b) => a + b, 0),
    };
  }, [days]);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="flex justify-between items-center p-8">
        <h1>
          {monthMap(currentMonth.month)} - {currentMonth.year}
        </h1>
        <Button
          onClick={() => navigate("/timesheet-overview")}
          variant="outline"
        >
          {t("timesheet.backToOverview")} <MoveLeft />
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
              leaveHours={calculateWorkedHours(day, "permesso")}
              vacationHours={calculateWorkedHours(day, "ferie")}
              sickHours={calculateWorkedHours(day, "malattia")}
              isToday={isToday(day, today)}
            />
          );
        })}
      </div>
      <div className="px-8 py-4 flex gap-6">
        <span>
          {t("timesheet.totals.work")} {totals.lavoro}h
        </span>
        <span>
          {t("timesheet.totals.leave")} {totals.permesso}h
        </span>
        <span>
          {t("timesheet.totals.vacation")} {totals.ferie}h
        </span>
        <span>
          {t("timesheet.totals.sick")} {totals.malattia}h
        </span>
        <span className="font-bold">
          {t("timesheet.totals.total")} {totals.total}h
        </span>
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
