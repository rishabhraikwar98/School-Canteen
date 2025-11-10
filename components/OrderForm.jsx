"use client";
import { useState, useMemo } from "react";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "./ui/input";

export default function OrderForm({
  students = [],
  snacks = [],
  presetStudent = null,
  presetSnack = null,
  onSuccess,
}) {
  const { placeOrder } = useStore();

  const [studentId, setStudentId] = useState(
    presetStudent ? String(presetStudent.id) : ""
  );

  const [snackId, setSnackId] = useState(
    presetSnack ? String(presetSnack.id) : ""
  );

  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedSnack = useMemo(() => {
    if (presetSnack) return presetSnack;
    return snacks.find((s) => String(s.id) === snackId);
  }, [snackId, presetSnack, snacks]);

  const total = selectedSnack ? selectedSnack.price * quantity : 0;

  const validate = () => {
    const temp = {};

    if (!presetStudent && !studentId) temp.studentId = "Please select a student.";
    if (!presetSnack && !snackId) temp.snackId = "Please select a snack.";
    if (!quantity || quantity < 1 || quantity > 5)
      temp.quantity = "Quantity must be between 1 and 5.";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await placeOrder({
        studentId: studentId || presetStudent.id,
        snackId: snackId || presetSnack.id,
        quantity,
        price: selectedSnack.price,
      });
      onSuccess();
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {!presetStudent && (
        <div>
          <Label className="block mb-1 text-sm font-medium">Select Student</Label>
          <Select value={studentId} onValueChange={setStudentId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="-- Select Student --" />
            </SelectTrigger>
            <SelectContent>
              {students.map((s) => (
                <SelectItem key={s.id} value={String(s.id)}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.studentId && (
            <p className="text-red-500 text-sm mt-1">{errors.studentId}</p>
          )}
        </div>
      )}

      {!presetSnack && (
        <div>
          <Label className="block mb-1 text-sm font-medium">Select Snack</Label>
          <Select value={snackId} onValueChange={setSnackId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="-- Select Snack --" />
            </SelectTrigger>
            <SelectContent>
              {snacks.map((s) => (
                <SelectItem key={s.id} value={String(s.id)}>
                  {s.name} — ₹{s.price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.snackId && (
            <p className="text-red-500 text-sm mt-1">{errors.snackId}</p>
          )}
        </div>
      )}

      <div>
        <Label className="block mb-1 text-sm font-medium">Quantity (1–5)</Label>
        <Input
          type="number"
          min="1"
          max="5"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border rounded p-2 w-full"
        />
        {errors.quantity && (
          <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
        )}
      </div>

      {selectedSnack && (
        <p className="text-center text-lg font-semibold">Total: ₹{total}</p>
      )}

      <Button
        type="submit"
        className="w-full py-2 bg-black text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Placing Order..." : "Confirm Order"}
      </Button>
    </form>
  );
}
