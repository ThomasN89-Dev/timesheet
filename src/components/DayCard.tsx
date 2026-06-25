import type { DayCardProps } from "../models/types";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

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
  const { t } = useTranslation();
  return (
    <Card
      className={`min-w-30 w-56 flex flex-col justify-between gap-2 border-l-5 rounded-2xl
        ${isWeekend ? "border-l-2 border-destructive opacity-60" : "border-primary"}
        ${leaveHours !== 0 ? "border-r-5 border-r-green-600 dark:border-r-green-400" : ""}
        ${vacationHours ? "border-r-5 border-r-orange-600 dark:border-r-orange-400" : ""}
        ${sickHours ? "border-r-5 border-r-fuchsia-600 dark:border-r-fuchsia-400" : ""}`}
    >
      <CardContent className="px-4 pt-1.5 pb-0">
        <p>
          {dayEntry.date} - {weekDay} {isToday && "⭐"}
        </p>
        {!isWeekend && <p>{t("timesheet.workedHours")} {workedHours}</p>}
        {leaveHours !== 0 && <p>{t("timesheet.leaveHours")} {leaveHours}</p>}
        {vacationHours !== 0 && <p>{t("timesheet.vacationHours")} {vacationHours}</p>}
        {sickHours !== 0 && <p>{t("timesheet.sickHours")} {sickHours}</p>}
      </CardContent>

      <div className="flex justify-end px-3 pb-2">
        <Button
          variant="outline"
          size="icon-sm"
          onClick={!isWeekend ? () => handleInfo(dayEntry) : undefined}
          disabled={isWeekend}
        >
          {isWeekend ? "🎉" : "i"}
        </Button>
      </div>
    </Card>
  );
}

export default DayCard;
