import { useState } from "react";
import { CAUSALS, type TimeSlot, type DayModalProps } from "../models/types";
import { timeToMinutes } from "../utils/time";
import { effectiveHours, MAX_DAILY_HOURS } from "../utils/dateUtils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
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
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {day.date} {weekDay}
          </DialogTitle>
        </DialogHeader>

        {timeSlots.length < 3 && (
          <div className="flex justify-center">
            <Button variant="default" onClick={onAddTimeSlot}>
              {t("modal.addSlot")} ➕
            </Button>
          </div>
        )}

        <div className="flex flex-col items-center gap-2">
          {timeSlots.map((slot) =>
            editingSlotId === slot.id ? (
              <div key={slot.id} className="flex items-center gap-2">
                <Input
                  type="time"
                  value={slot.startTime}
                  onChange={(e) =>
                    onTimeSlotChange(e.target.value, slot.id, "startTime")
                  }
                  className="w-auto"
                />
                <Input
                  type="time"
                  value={slot.endTime}
                  onChange={(e) =>
                    onTimeSlotChange(e.target.value, slot.id, "endTime")
                  }
                  className="w-auto"
                />
                <Select
                  value={slot.causal}
                  onValueChange={(value) =>
                    onTimeSlotChange(value, slot.id, "causal")
                  }
                >
                  <SelectTrigger className="w-auto">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CAUSALS.map((c) => (
                      <SelectItem key={c} value={c}>
                        {t(`causals.${c}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="default"
                  onClick={() => setEditingSlotId(null)}
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
                  aria-label={t("modal.editSlot")}
                >
                  ✏️
                </Button>
                <Button
                  variant="default"
                  onClick={() => onSlotDelete(slot.id)}
                  aria-label={t("modal.deleteSlot")}
                >
                  🗑️
                </Button>
              </p>
            ),
          )}
        </div>

        {error && (
          <p className="text-sm text-destructive italic text-center">
            {error}
          </p>
        )}

        <DialogFooter>
          <Button variant="default" onClick={handleSave}>
            {t("modal.save")} ✅
          </Button>
          <Button variant="outline" onClick={onClose}>
            {t("modal.close")} ❌
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
