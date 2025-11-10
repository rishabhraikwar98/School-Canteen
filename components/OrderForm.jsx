"use client";
import { useMemo } from "react";
import { useStore } from "@/store/useStore";
import { useForm } from "react-hook-form";
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

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      studentId: presetStudent ? String(presetStudent.id) : "",
      snackId: presetSnack ? String(presetSnack.id) : "",
      quantity: 1,
    },
  });

  const studentId = watch("studentId");
  const snackId = watch("snackId");
  const quantity = watch("quantity");

  const selectedSnack = useMemo(() => {
    if (presetSnack) return presetSnack;
    return snacks.find((s) => String(s.id) === snackId);
  }, [snackId, presetSnack, snacks]);

  const total = selectedSnack ? selectedSnack.price * quantity : 0;

  const onSubmit = async (data) => {
    await placeOrder({
      studentId: presetStudent?.id || data.studentId,
      snackId: presetSnack?.id || data.snackId,
      quantity: Number(data.quantity),
      price: selectedSnack.price,
    });

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      {!presetStudent && (
        <div>
          <Label className="block mb-1 text-sm font-medium">Select Student</Label>
          <Select
            value={studentId}
            onValueChange={(v) => setValue("studentId", v)}
          >
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
            <p className="text-red-500 text-sm mt-1">{errors.studentId.message}</p>
          )}
        </div>
      )}

      {!presetSnack && (
        <div>
          <Label className="block mb-1 text-sm font-medium">Select Snack</Label>
          <Select
            value={snackId}
            onValueChange={(v) => setValue("snackId", v)}
          >
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
            <p className="text-red-500 text-sm mt-1">{errors.snackId.message}</p>
          )}
        </div>
      )}

      <div>
        <Label className="block mb-1 text-sm font-medium">Quantity (1–5)</Label>
        <Input
          type="number"
          min="1"
          max="5"
          {...register("quantity", {
            required: "Quantity is required.",
            min: { value: 1, message: "Minimum quantity is 1." },
            max: { value: 5, message: "Maximum quantity is 5." },
          })}
          className="border rounded p-2 w-full"
        />
        {errors.quantity && (
          <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
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
