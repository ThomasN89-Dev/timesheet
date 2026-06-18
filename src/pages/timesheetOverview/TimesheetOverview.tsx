import { Card, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { monthMap } from "@/utils/dateUtils";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

function TimesheetOverview() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const monthsPassed = Array.from({ length: month }, (_, i) => {
    return i + 1;
  });
  const navigate = useNavigate();
  const { state } = useAuth();
  const user = state.userName;

  const handleNavigate = (month: number) => {
    navigate(`/timesheet/${month}`);
  };

  return (
    <div className="p-8 flex flex-col gap-4 items-center bg-muted">
      <h1 className="text-4xl font-bold">Benvenuto, {user}</h1>
      <div className="min-h-screen w-1/2 flex flex-col gap-4">
        {monthsPassed.map((month) => (
          <Card
            key={month}
            onClick={() => handleNavigate(month)}
            className="p-4 min-h-16 flex justify-center cursor-pointer"
          >
            <CardTitle>
              <div className="flex justify-between items-center">
                <p>{monthMap(month)}</p>
                <p className="flex items-center gap-3">
                  Vai al timesheet <ArrowRight />
                </p>
              </div>
            </CardTitle>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default TimesheetOverview;
