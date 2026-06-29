import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  MONTHS_NUMBER,
  type NewTimesheet,
  type NewTimesheetProps,
} from "@/models/types";
import { t } from "i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function AddTimesheetModal({ onClose, onSave }: NewTimesheetProps) {
  const [newTimesheet, setNewTimesheet] = useState<NewTimesheet>({
    month: "",
    year: "",
  });
  const [error, setError] = useState<boolean>(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();

    if (newTimesheet.month === "" || newTimesheet.year === "") {
      setError(true);
      return;
    }

    onSave({ ...newTimesheet });
    setError(false);
  };

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("addTimesheet.addTimesheetTitle")}</DialogTitle>
        </DialogHeader>
        <div>
          <Select
            value={newTimesheet.month}
            onValueChange={(value) =>
              setNewTimesheet({ ...newTimesheet, month: value })
            }
          >
            <SelectTrigger className="w-auto">
              <SelectValue placeholder={t("addTimesheet.monthPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {MONTHS_NUMBER.map((m) => (
                <SelectItem key={m} value={m}>
                  {t(`months.${m}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            value={newTimesheet.year}
            onChange={(e) =>
              setNewTimesheet({ ...newTimesheet, year: e.target.value })
            }
            placeholder={t("addTimesheet.yearPlaceholder")}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>{t("modal.save")}</Button>
          {error && (
            <p className="text-sm text-destructive italic text-center">
              {t("addTimesheet.addTimesheetError")}
            </p>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddTimesheetModal;
