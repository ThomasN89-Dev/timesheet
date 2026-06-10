// Fascia oraria
export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
}

// Causali
export type Causal = "lavoro" | "malattia" | "ferie" | "permesso";

// Giorno
export interface DayEntry {
  date: number;
  slots?: TimeSlot[];
}

// props card
export interface DayCardProps {
  weekDay: string;
  isWeekend: boolean;
  handleInfo: (day: DayEntry) => void;
  dayEntry: DayEntry;
  workedHours?: number;
  isToday: boolean;
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

export const CAUSAL_COLORS: Record<Causal, string> = {
  lavoro: "bg-blue-100 text-blue-800",
  malattia: "bg-amber-100 text-amber-800",
  ferie: "bg-emerald-100 text-emerald-800",
  permesso: "bg-violet-100 text-violet-800",
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
  "mercoledì",
  "Giovedì",
  "Venerdì",
  "Sabato",
];
