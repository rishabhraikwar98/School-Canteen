"use client";
import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import Link from "next/link";
import StudentListItem from "@/components/StudentListItem";
import { Button } from "@/components/ui/button";

export default function Students() {
  const { students, fetchStudents } = useStore();
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <Link href="/students/create" className="underline text-blue-600">
      <Button className="my-4">
        Add New Student
      </Button>
      </Link>
      {students.map((s) => (
        <StudentListItem key={s.id} student={s} />
      ))}
    </div>
  );
}
