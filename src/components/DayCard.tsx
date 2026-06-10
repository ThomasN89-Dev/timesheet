import type { DayCardProps, TimeSlot } from "../models/types";

function DayCard({
  weekDay,
  isWeekend,
  handleInfo,
  dayEntry,
  workedHours,
  isToday,
}: DayCardProps) {
  return (
    <div
      className={`min-w-30 w-56 border flex flex-col justify-between gap-2 border-l-5 rounded-2xl bg-gray-100 ${isWeekend ? "text-red-800 border-l-2 border-red-800 " : "text-blue-800 border-blue-800"}`}
    >
      <div className="px-4 pt-1.5">
        <p>
          {dayEntry.date} {isToday && "⭐"}
        </p>
        <p>{weekDay}</p>
        {dayEntry.slots &&
          dayEntry.slots.map((timeSlot: TimeSlot) => (
            <div key={timeSlot.id}>
              <p>
                {timeSlot.startTime} - {timeSlot.endTime}
              </p>
            </div>
          ))}
        {!isWeekend && <p>Ore lavorate: {workedHours}</p>}
      </div>

      <div
        className="w-8 h-8 border  flex items-center justify-center self-end mx-3 my-2 rounded-md"
        onClick={!isWeekend ? () => handleInfo(dayEntry) : undefined}
      >
        {isWeekend ? "🎉" : "i"}
      </div>
    </div>
  );
}

export default DayCard;
