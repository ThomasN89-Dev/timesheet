import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { monthMap } from "@/utils/dateUtils";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

function TimesheetOverview() {
  const user = "Thomas Neroni";
  const now = new Date();
  const month = now.getMonth() + 1;
  const monthsPassed = Array.from({ length: month }, (_, i) => {
    return i + 1;
  });
  const navigate = useNavigate();

  const handleNavigate = (month: number) => {
    navigate(`/timesheet/${month}`);
  };

  return (
    <div>
      <h1>Benvenuto, {user}</h1>
      <div>
        {monthsPassed.map((month) => (
          <Card key={month}>
            <CardTitle>{monthMap(month)}</CardTitle>
            <CardContent>
              <p onClick={() => handleNavigate(month)}>
                Vai al timesheet <ArrowRight></ArrowRight>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default TimesheetOverview;
