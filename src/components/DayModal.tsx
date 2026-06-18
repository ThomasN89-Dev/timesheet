import { useState } from "react";
import { CAUSALS, type TimeSlot, type DayModalProps } from "../models/types";
import { timeToMinutes } from "../utils/time";
import { effectiveHours, MAX_DAILY_HOURS } from "../utils/dateUtils";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

export default function DayModal({
  day,
  weekDay,
  onSave,
  onClose,
}: DayModalProps) {
  const { t } = useTranslation();
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
      causal: "lavoro",
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
      setError(t("modal.errors.invalidSlot"));
      return;
    }

    const total = CAUSALS.reduce(
      (sum, c) => sum + effectiveHours(timeSlots, c),
      0,
    );
    if (total !== MAX_DAILY_HOURS) {
      setError(
        total > MAX_DAILY_HOURS
          ? t("modal.errors.exceededHours")
          : t("modal.errors.insufficientHours", { total }),
      );
      return;
    }
    onSave({ ...day, slots: timeSlots });
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-4">
      <div className="w-96 min-h-80 shadow-lg rounded-lg p-4 border-2 bg-card text-card-foreground flex flex-col justify-between">
        <div>
          <div className="flex w-full justify-center items-center gap-1.5">
            <p className="font-bold">{day.date}</p>
            <p className="font-bold">{weekDay}</p>
          </div>

          {timeSlots.length < 3 && (
            <div className="w-full flex justify-center mt-3">
              <Button variant="default" onClick={onAddTimeSlot}>
                {t("modal.addSlot")} ➕
              </Button>
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
                    className="border-2 border-input bg-background text-foreground rounded-md px-2 py-1"
                  />
                  <input
                    type="time"
                    value={slot.endTime}
                    onChange={(e) =>
                      onTimeSlotChange(e.target.value, slot.id, "endTime")
                    }
                    className="border-2 border-input bg-background text-foreground rounded-md px-2 py-1"
                  />
                  <select
                    value={slot.causal}
                    onChange={(e) =>
                      onTimeSlotChange(e.target.value, slot.id, "causal")
                    }
                    className="border-2 border-input bg-background text-foreground rounded-md px-2 py-1"
                  >
                    {CAUSALS.map((c) => (
                      <option key={c} value={c}>
                        {t(`causals.${c}`)}
                      </option>
                    ))}
                  </select>
                  <Button
                    variant="default"
                    onClick={() => setEditingSlotId(null)}
                    className="cursor-pointer"
                    aria-label={t("modal.confirmSlot")}
                  >
                    ✅
                  </Button>
                </div>
              ) : (
                <p key={slot.id} className="w-full flex gap-2 justify-center">
                  <span className="font-bold">
                    {slot.startTime} - {slot.endTime}
                  </span>
                  <span className="font-bold">{t(`causals.${slot.causal}`)}</span>
                  <Button
                    variant="default"
                    onClick={() => setEditingSlotId(slot.id)}
                    className="cursor-pointer"
                    aria-label={t("modal.editSlot")}
                  >
                    ✏️
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => onSlotDelete(slot.id)}
                    className="cursor-pointer"
                    aria-label={t("modal.deleteSlot")}
                  >
                    🗑️
                  </Button>
                </p>
              ),
            )}
          </div>

          {error && (
            <p className="text-sm text-destructive italic text-center mt-2">
              {error}
            </p>
          )}
        </div>

        <div className="flex justify-around w-full">
          <Button variant="default" onClick={handleSave}>
            {t("modal.save")} ✅
          </Button>
          <Button variant="default" onClick={onClose}>
            {t("modal.close")} ❌
          </Button>
        </div>
      </div>
    </div>
  );
}
