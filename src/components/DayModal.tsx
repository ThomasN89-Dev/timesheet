import { useState } from "react";
import { type TimeSlot, type DayModalProps } from "../models/types";
import Button from "./Button";
import { timeToMinutes } from "../utils/time";
import { effectiveHours, MAX_DAILY_HOURS } from "../utils/dateUtils";

export default function DayModal({
  day,
  weekDay,
  onSave,
  onClose,
}: DayModalProps) {
  const [editingSlotId, setEditingSlotId] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(day.slots ?? []);
  const [error, setError] = useState<string | null>(null);

  const onTimeSlotChange = (
    value: string,
    id: string,
    field: keyof TimeSlot,
  ) => {
    setError(null);
    setTimeSlots((slots) =>
      slots.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );
  };

  const onAddTimeSlot = () => {
    const newTimeSlot: TimeSlot = {
      id: crypto.randomUUID(),
      causale: "lavoro",
      startTime: "09:00",
      endTime: "18:00",
    };
    setTimeSlots((slots) => [...slots, newTimeSlot]);
    setEditingSlotId(newTimeSlot.id);
  };

  const onSlotDelete = (id: string) => {
    setError(null);
    setTimeSlots((slots) => slots.filter((s) => s.id !== id));
  };

  const handleSave = () => {
    const hasInvalidTimeSlot = timeSlots.some(
      (slot) => timeToMinutes(slot.startTime) >= timeToMinutes(slot.endTime),
    );

    if (hasInvalidTimeSlot) {
      setError("Fascia oraria non valida, inseriscine una valida.");
      return;
    }

    if (effectiveHours(timeSlots) > MAX_DAILY_HOURS) {
      setError("Superate ore giornaliere");
      return;
    }

    onSave({ ...day, slots: timeSlots });
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-4">
      <div className="w-96 min-h-80 shadow-lg rounded-lg p-4 border-2 bg-blue-100 flex flex-col justify-between">
        <div>
          <div className="flex w-full justify-center items-center gap-1.5">
            <p className="font-bold">{day.date}</p>
            <p className="font-bold">{weekDay}</p>
          </div>

          {timeSlots.length < 2 && (
            <div className="w-full flex justify-center mt-3">
              <Button onClick={onAddTimeSlot}>Aggiungi fascia oraria ➕</Button>
            </div>
          )}

          <div className="w-full min-h-full flex flex-col items-center mt-4">
            {timeSlots.map((slot) =>
              editingSlotId === slot.id ? (
                <div key={slot.id} className="flex items-center gap-2">
                  <input
                    type="time"
                    value={slot.startTime}
                    onChange={(e) =>
                      onTimeSlotChange(e.target.value, slot.id, "startTime")
                    }
                    className="border-2"
                  />
                  <input
                    type="time"
                    value={slot.endTime}
                    onChange={(e) =>
                      onTimeSlotChange(e.target.value, slot.id, "endTime")
                    }
                    className="border-2"
                  />
                  <select
                    value={slot.causale}
                    onChange={(e) =>
                      onTimeSlotChange(e.target.value, slot.id, "causale")
                    }
                    className="border-2"
                  >
                    <option value="lavoro">Lavoro</option>
                    <option value="permesso">Permesso</option>
                    <option value="ferie">Ferie</option>
                    <option value="malattia">Malattia</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => setEditingSlotId(null)}
                    className="cursor-pointer"
                    aria-label="Conferma fascia"
                  >
                    ✅
                  </button>
                </div>
              ) : (
                <p key={slot.id} className="w-full flex gap-2 items-center">
                  <span className="font-bold">
                    {slot.startTime} - {slot.endTime}
                  </span>
                  <span className="font-bold capitalize">{slot.causale}</span>
                  <button
                    type="button"
                    onClick={() => setEditingSlotId(slot.id)}
                    className="cursor-pointer"
                    aria-label="Modifica fascia"
                  >
                    ✏️
                  </button>
                  <button
                    type="button"
                    onClick={() => onSlotDelete(slot.id)}
                    className="cursor-pointer"
                    aria-label="Elimina fascia"
                  >
                    🗑️
                  </button>
                </p>
              ),
            )}
          </div>

          {error && (
            <p className="text-sm text-red-800 italic text-center mt-2">
              {error}
            </p>
          )}
        </div>

        <div className="flex justify-around w-full">
          <Button onClick={handleSave}>Salva ✅</Button>
          <Button onClick={onClose}>Chiudi ❌</Button>
        </div>
      </div>
    </div>
  );
}
