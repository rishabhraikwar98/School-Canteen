"use client";
import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import OrderDialog from "@/components/OrderDialog";

export default function SnacksPage() {
  const { snacks, students, fetchSnacks, fetchStudents, selectSnack } = useStore();

  useEffect(() => {
    fetchSnacks();
    fetchStudents();
  }, []);

  if (!snacks.length) return <div className="p-4">Loading snacks...</div>;

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
              onOpen={() => selectSnack(snack)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
