import {
  MONTHS,
  WEEKDAYS,
  type Causal,
  type DayEntry,
  type Month,
  type TimeSlot,
} from "../models/types";
import { timeToMinutes } from "./time";

const LUNCH_BREAK_HOURS = 1;
const LUNCH_BREAK_THRESHOLD_HOURS = 4;
export const MAX_DAILY_HOURS = 8;

export function isWeekEnd(day: number, firstDay: number): boolean {
  const weekDay = (firstDay + day - 1) % 7;
  return weekDay === 6 || weekDay === 0;
}

export function buildDays(currentMonth: Month): DayEntry[] {
  return Array.from({ length: currentMonth.days }, (_, i) => {
    const day = i + 1;

    return {
      date: day,
      slots: isWeekEnd(day, currentMonth.firstDay)
        ? []
        : [
            {
              id: crypto.randomUUID(),
              startTime: "09:00",
              endTime: "18:00",
              causale: "lavoro",
            },
          ],
    };
  });
}

export function slotDurationHours(slot: TimeSlot): number {
  return (timeToMinutes(slot.endTime) - timeToMinutes(slot.startTime)) / 60;
}

export function effectiveHours(slots: TimeSlot[], causale?: Causal): number {
  const relevant = causale ? slots.filter((s) => s.causale === causale) : slots;

  const total = relevant.reduce((sum, s) => sum + slotDurationHours(s), 0);

  const isSingleWorkSlot = relevant.length === 1;

  return isSingleWorkSlot && total > LUNCH_BREAK_THRESHOLD_HOURS
    ? total - LUNCH_BREAK_HOURS
    : total;
}

export const calculateWorkedHours = (day: DayEntry, causale: Causal): number =>
  effectiveHours(day.slots ?? [], causale);

export const isToday = (day: DayEntry, today: number) => day.date === today;

export function monthMap(month: number) {
  return MONTHS[month - 1];
}

export function weekDaysMap(weekDay: number) {
  return WEEKDAYS[weekDay];
}
