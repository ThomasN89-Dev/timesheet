import { Navigate, Route, Routes } from "react-router";
import Login from "../pages/login/Login";
import Timesheet from "../pages/timesheet/Timesheet";
import TimesheetOverview from "@/pages/timesheetOverview/TimesheetOverview";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      {/* login */}
      <Route path="login" element={<Login />} />
      {/* raggruppamento timesheet */}
      <Route path="timesheet-overview" element={<TimesheetOverview />} />
      {/* timesheet mensile */}
      <Route path="timesheet/:month" element={<Timesheet />} />
    </Routes>
  );
}

export default AppRoutes;
