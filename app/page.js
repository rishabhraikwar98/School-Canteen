"use client";
import { useEffect,useState } from "react";
import { useStore } from "@/store/useStore";
import OrderDialog from "@/components/OrderDialog";

export default function SnacksPage() {
  const { snacks, students, fetchSnacks, fetchStudents } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSnacks().finally(() => setLoading(false));
    fetchStudents();
  }, []);

  if (!snacks.length && loading) return <div className="p-4 text-2xl text-center my-8">Loading snacks...</div>;
  if (!snacks.length && !loading) return <div className="p-4 text-2xl text-center my-8">No snacks available.</div>;
  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold text-center sm:text-left">Snacks</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {snacks.map((snack) => (
          <div key={snack.id} className="border rounded p-4 shadow-sm flex flex-col gap-2">
            <h2 className="text-lg font-medium">{snack.name}</h2>
            <p className="text-gray-700 font-medium">₹{snack.price}</p>
            <p className="text-xs text-gray-500">Ordered {snack.ordersCount} times</p>

            <OrderDialog
              snacks={snacks}
              students={students}
              presetSnack={snack}
              onSuccess={fetchSnacks}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
