import type { Month } from "../models/types";

const useCurrentMonth = () => {
  const now = new Date();

  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const days = new Date(year, month, 0).getDate();
  const firstDayOfTheMonth = new Date(year, month - 1, 1).getDay();
  const today = now.getDate();

  const currentMonth: Month = {
    year,
    month,
    days,
    firstDay: firstDayOfTheMonth,
  };

  return { currentMonth, today };
};

export default useCurrentMonth;
