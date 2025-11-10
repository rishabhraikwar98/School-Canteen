"use client";
import React, { useEffect,useState } from "react";
import { useStore } from "@/store/useStore";
import OrderDialog from "@/components/OrderDialog";

export default function StudentDetail({ params }) {
  const { id } = React.use(params);
  const [loading, setLoading] = useState(true);

  const { snacks, orders, fetchSnacks, fetchOrders,fetchStudentById,selectedStudent } =
    useStore();

  useEffect(() => {
    fetchStudentById(id).finally(() => {setLoading(false)});
    fetchSnacks();
    fetchOrders();
  }, []);

  const studentOrders = orders.filter((o) => o.studentId === id);

  const getSnack = (snackId) =>
    snacks.find((s) => s.id === snackId)?.name || "Unknown";

  if (!selectedStudent&&loading) return <div className="p-4 text-2xl text-center my-8">Loading...</div>;
  if (!selectedStudent&&!loading) return <div className="p-4 text-2xl text-center my-8">Student not found.</div>;


  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="border rounded p-4 space-y-2">
        <h1 className="text-xl font-semibold">{selectedStudent.name}</h1>
        <p className="text-sm">Referral Code: {selectedStudent.referralCode}</p>
        <OrderDialog presetStudent={selectedStudent} onSuccess={()=>{fetchStudentById(id)}} />
      </div>

      <h2 className="text-lg font-medium">Order History</h2>

      {studentOrders.length === 0 && <p>No orders yet.</p>}
      <div className="space-y-4">
        <div className="divide-y rounded border overflow-hidden">
          {studentOrders.map((order, index) => (
            <div
              key={order.id}
              className={`grid grid-cols-1 sm:grid-cols-3 gap-2 p-4 
            ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              <p className="font-semibold">{getSnack(order.snackId)}</p>

              <p className="text-sm sm:text-center border-t sm:border-t-0 sm:border-l sm:border-r sm:border-gray-200 sm:px-4 sm:py-0 pt-2 sm:pt-0">
                Quantity: <span className="font-medium">{order.quantity}</span>
              </p>

              <p className="font-semibold sm:text-right">₹{order.totalSpent}</p>
            </div>
          ))}
        </div>
        <div className="border rounded p-4 bg-gray-100 flex justify-between text-sm font-medium">
          <span>Total Orders: {studentOrders.length}</span>
          <span>Total Spent: ₹{selectedStudent.totalSpent}</span>
        </div>
      </div>
    </div>
  );
}
