import Link from "next/link";

export default function StudentListItem({ student }) {
  return (
    <div className="border rounded p-4 flex flex-col sm:flex-row justify-between gap-3">
      <div>
        <p className="font-medium">{student.name} ({student.referralCode})</p>
        <p>Total Spent: ₹{student.totalSpent}</p>
      </div>
      <Link className="text-blue-600 underline" href={`/students/${student.id}`}>View Details</Link>
    </div>
  );
}
