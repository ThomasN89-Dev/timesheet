import type { DayCardProps } from "../models/types";

function DayCard({
  weekDay,
  isWeekend,
  handleInfo,
  dayEntry,
  workedHours,
  isToday,
  leaveHours,
  vacationHours,
  sickHours,
}: DayCardProps) {
  return (
    <div
      className={`min-w-30 w-56 border flex flex-col justify-between gap-2 border-l-5 rounded-2xl bg-card text-card-foreground
        ${isWeekend ? "border-l-2 border-destructive opacity-60" : "border-primary"}
        ${leaveHours !== 0 ? "border-r-5 border-r-green-600 dark:border-r-green-400" : ""}
        ${vacationHours ? "border-r-5 border-r-orange-600 dark:border-r-orange-400" : ""}
        ${sickHours ? "border-r-5 border-r-fuchsia-600 dark:border-r-fuchsia-400" : ""}`}
    >
      <div className="px-4 pt-1.5">
        <p>
          {dayEntry.date} - {weekDay} {isToday && "⭐"}
        </p>
        {!isWeekend && <p>Ore lavorate: {workedHours}</p>}
        {leaveHours !== 0 && <p>Ore di permesso: {leaveHours}</p>}
        {vacationHours !== 0 && <p>Ore di ferie: {vacationHours}</p>}
        {sickHours !== 0 && <p>Ore di malattia: {sickHours}</p>}
      </div>

      <div
        className="w-8 h-8 border border-border flex items-center justify-center self-end mx-3 my-2 rounded-md"
        onClick={!isWeekend ? () => handleInfo(dayEntry) : undefined}
      >
        {isWeekend ? "🎉" : "i"}
      </div>
    </div>
  );
}

export default DayCard;
