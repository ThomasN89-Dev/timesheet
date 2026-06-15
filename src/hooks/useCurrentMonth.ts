import type { CurrentMonthProps, Month } from "../models/types";

const useCurrentMonth = ({ monthProp }: CurrentMonthProps) => {
  const now = new Date();
  let today = -1;

  const month = monthProp;
  const year = now.getFullYear();
  const days = new Date(year, month, 0).getDate();
  const firstDayOfTheMonth = new Date(year, month - 1, 1).getDay();
  if (monthProp === now.getMonth() + 1 && year === now.getFullYear()) {
    today = now.getDate();
  }

  const currentMonth: Month = {
    year,
    month,
    days,
    firstDay: firstDayOfTheMonth,
  };

  return { currentMonth, today };
};

export default useCurrentMonth;
