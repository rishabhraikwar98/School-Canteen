"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useStore } from "@/store/useStore";

export default function CreateStudentForm() {
  const { createStudent } = useStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [message, setMessage] = useState(null);

  const submit = async (data) => {
    try {
      const created = await createStudent(data.name);
      reset();
      setMessage(`Added: ${created.name} • ${created.referralCode}`);
    } catch {
      setMessage("❌ Failed to create student");
    } finally {
      setTimeout(() => setMessage(null), 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-3">
      <input
        {...register("name", { required: "Name is required" })}
        className="border p-2 w-full rounded"
        placeholder="Student Name"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

      <button type="submit" disabled={isSubmitting} className="bg-black text-white p-2 rounded w-full">
        {isSubmitting ? "Creating..." : "Create Student"}
      </button>

      {message && <div className="mt-2 text-sm text-gray-700">{message}</div>}
    </form>
  );
}
