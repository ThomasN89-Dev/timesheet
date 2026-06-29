export interface LoginData {
  userEmail: string;
  password: string;
}

export type LoginErrorsType = "email" | "password";

export interface CurrentMonthProps {
  monthProp: number;
  yearProp: number;
}

export interface NewMonth {
  id: string;
  month: number;
  year: number;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  causal: Causal;
}

export type Causal = "lavoro" | "malattia" | "ferie" | "permesso";

export type Langs = "en" | "it";

export interface DayEntry {
  date: number;
  slots?: TimeSlot[];
}

export interface DayCardProps {
  weekDay: string;
  isWeekend: boolean;
  handleInfo: (day: DayEntry) => void;
  dayEntry: DayEntry;
  workedHours?: number;
  leaveHours?: number;
  vacationHours?: number;
  sickHours?: number;
  isToday: boolean;
}

export interface DayModalProps {
  day: DayEntry;
  weekDay: string;
  onClose: () => void;
  onSave: (day: DayEntry) => void;
}

export interface Month {
  year: number;
  month: number;
  days: number;
  firstDay: number;
}

export interface NewTimesheet {
  month: string;
  year: string;
}

export interface NewTimesheetProps {
  onClose: () => void;
  onSave: (newTimesheet: NewTimesheet) => void;
}

export type TimesheetData = Record<Causal, Record<string, DayEntry>>;

export interface AppState {
  data: TimesheetData;
  selectedCausal: Causal;
  selectedDay: string | null;
}

export const CAUSALS: Causal[] = ["lavoro", "malattia", "ferie", "permesso"];

export const LANGS: Langs[] = ["en", "it"];

export const MONTHS_NUMBER: string[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];
