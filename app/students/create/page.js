"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export default function CreateStudent() {
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
      setMessage(`Added: ${created.name} (${created.referralCode})`);
    } catch {
      setMessage("Failed to create student");
    } finally {
      setTimeout(() => setMessage(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create New Student
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Add a new student to the canteen system
          </p>
        </div>
        
        <form onSubmit={handleSubmit(submit)} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Student Name
              </Label>
              <Input
                {...register("name", { required: "Name is required" })}
                placeholder="Student Name"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 hover:bg-gray-800"
            >
              {isSubmitting ? "Creating..." : "Create Student"}
            </Button>
          </div>

          {message && (
            <div className="rounded-md bg-green-50 p-4">
                <div className="ml-3">
                  <p className="text-xl font-medium text-green-800">{message}</p>
                </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
