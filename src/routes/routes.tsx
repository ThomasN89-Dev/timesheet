import { Navigate, Route, Routes } from "react-router";
import Login from "../pages/login/Login";
import Timesheet from "../pages/timesheet/Timesheet";
import TimesheetOverview from "@/pages/timesheetOverview/TimesheetOverview";
import RouteProtection from "./routeprotection";
import Header from "@/components/Header";

function AppRoutes() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        {/* login */}
        <Route path="login" element={<Login />} />
        {/* raggruppamento timesheet */}
        <Route
          path="timesheet-overview"
          element={
            <RouteProtection>
              <TimesheetOverview />
            </RouteProtection>
          }
        />
        {/* timesheet mensile */}
        <Route
          path="timesheet/:month"
          element={
            <RouteProtection>
              <Timesheet />
            </RouteProtection>
          }
        />
      </Routes>
    </div>
  );
}

export default AppRoutes;
