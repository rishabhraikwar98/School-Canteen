"use client";
import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import Link from "next/link";
import StudentListItem from "@/components/StudentListItem";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Students() {
  const { students, fetchStudents } = useStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchStudents().finally(() => {setLoading(false)});
  }, []);

  if (loading) return <div className="p-4 text-2xl text-center my-8">Loading...</div>;
  if (students?.length === 0 && !loading) return <div className="p-4 text-2xl text-center my-8">No students found.</div>;
  return (
    <>
    { students.length?<div className="max-w-5xl mx-auto p-4 space-y-4">
      <Button asChild className="my-4">
      <Link href="/students/create">
        Add New Student
      </Link>
      </Button>
      {students.map((s) => (
        <StudentListItem key={s.id} student={s} />
      ))}
    </div>:""}
    </>
  );
}
