export interface LoginData {
  userEmail: string;
  password: string;
}

export interface CurrentMonthProps {
  monthProp: number;
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

export type TimesheetData = Record<Causal, Record<string, DayEntry>>;

export interface AppState {
  data: TimesheetData;
  selectedCausal: Causal;
  selectedDay: string | null;
}

export const CAUSALS: Causal[] = ["lavoro", "malattia", "ferie", "permesso"];

export const LANGS: Langs[] = ["en", "it"];

export const CAUSAL_LABELS: Record<Causal, string> = {
  lavoro: "Lavoro",
  malattia: "Malattia",
  ferie: "Ferie",
  permesso: "Permesso",
};

export const MONTHS: string[] = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];

export const WEEKDAYS: string[] = [
  "Domenica",
  "Lunedì",
  "Martedì",
  "Mercoledì",
  "Giovedì",
  "Venerdì",
  "Sabato",
];
