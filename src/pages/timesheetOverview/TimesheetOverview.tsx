import AddTimesheetModal from "@/components/AddTimesheetModal";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import type { NewMonth, NewTimesheet } from "@/models/types";
import { monthMap } from "@/utils/dateUtils";
import { ArrowRight, Trash } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function TimesheetOverview() {
  const [timesheets, setTimesheets] = useState<NewMonth[]>(() => {
    return localStorage.getItem("timesheets")
      ? JSON.parse(localStorage.getItem("timesheets")!)
      : [];
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const { state } = useAuth();
  const user = state.userName;
  const { t } = useTranslation();

  const handleNavigate = (month: number, year: number) => {
    navigate(`/timesheet/${year}/${month}`);
  };

  const handleOpenAddTimesheet = () => {
    setIsOpen(true);
  };

  const handleCloseTimesheetModal = () => {
    setIsOpen(false);
  };

  const handleAddNewTimesheet = (newTimesheet: NewTimesheet) => {
    const getYear = new Date().getFullYear();
    const getMonth = new Date().getMonth() + 1;
    const newTimesheets = [
      ...timesheets,
      {
        id: crypto.randomUUID(),
        month: Number(newTimesheet.month),
        year: Number(newTimesheet.year),
      },
    ];
    const sortedValue = newTimesheets.sort(
      (a, b) => a.year - b.year || a.month - b.month,
    );

    if (
      timesheets.some(
        (n) =>
          n.month === Number(newTimesheet.month) &&
          n.year === Number(newTimesheet.year),
      )
    ) {
      return toast(t("overview.timesheetAlreadyPresent"), {
        position: "top-right",
      });
    }

    if (
      Number(newTimesheet.year) > getYear ||
      (Number(newTimesheet.year) === getYear &&
        Number(newTimesheet.month) > getMonth)
    ) {
      return toast(t("overview.futureDate"), {
        position: "top-right",
      });
    }

    setTimesheets(sortedValue);
    localStorage.setItem("timesheets", JSON.stringify(sortedValue));
    setIsOpen(false);
  };

  const handleDeleteTimesheet = (id: string) => {
    const filteredTimesheets = timesheets.filter((t) => t.id !== id);
    setTimesheets(filteredTimesheets);
    localStorage.setItem("timesheets", JSON.stringify(filteredTimesheets));
  };

  return (
    <div className="p-8 flex flex-col gap-4 items-center bg-muted">
      <h1 className="text-4xl font-bold">{t("overview.welcome", { user })}</h1>
      <Button onClick={handleOpenAddTimesheet}>
        {t("overview.addTimesheet")}
      </Button>
      <div className="min-h-screen w-1/2 flex flex-col gap-4">
        {timesheets.length === 0 && (
          <div className="flex justify-center items-center">
            <h2>{t("overview.noTimesheets")}</h2>
          </div>
        )}
        {timesheets.map((timesheet: NewMonth) => (
          <Card
            key={timesheet.id}
            className="p-4 min-h-16 flex justify-center cursor-pointer"
          >
            <CardTitle>
              <div className="flex justify-between items-center">
                <p>
                  {monthMap(timesheet.month)} - {timesheet.year}
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => handleDeleteTimesheet(timesheet.id)}
                  >
                    <Trash />
                  </Button>
                  <Button
                    className="flex items-center gap-3"
                    variant="ghost"
                    onClick={() =>
                      handleNavigate(timesheet.month, timesheet.year)
                    }
                  >
                    {t("overview.goToTimesheet")} <ArrowRight />
                  </Button>
                </div>
              </div>
            </CardTitle>
          </Card>
        ))}
      </div>
      {isOpen && (
        <AddTimesheetModal
          onSave={handleAddNewTimesheet}
          onClose={handleCloseTimesheetModal}
        />
      )}
    </div>
  );
}

export default TimesheetOverview;
