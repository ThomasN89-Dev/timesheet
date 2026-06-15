// dati di login
export interface LoginData {
  userEmail: string;
  password: string;
}

export interface CurrentMonthProps {
  monthProp: number;
}

// Fascia oraria
export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  causale: Causal;
}

// Causali
export type Causal = "lavoro" | "malattia" | "ferie" | "permesso";

// Giorno
export interface DayEntry {
  date: number;
  slots?: TimeSlot[];
}

export interface ButtonProps {
  onClick: () => void;
  children: string;
}

// props card
export interface DayCardProps {
  weekDay: string;
  isWeekend: boolean;
  handleInfo: (day: DayEntry) => void;
  dayEntry: DayEntry;
  workedHours?: number;
  orePermesso?: number;
  oreFerie?: number;
  oreMalattia?: number;
  isToday: boolean;
}

export interface DayModalProps {
  day: DayEntry;
  weekDay: string;
  onClose: () => void;
  onSave: (day: DayEntry) => void;
}

// Mese
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

// Costanti
export const CAUSALS: Causal[] = ["lavoro", "malattia", "ferie", "permesso"];

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
