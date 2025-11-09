"use client";
import OrderDialog from "./OrderDialog";

export default function SnackCard({ snack}) {
  return (
    <div className="border rounded p-4 flex flex-col gap-3 shadow-sm">
      <h2 className="text-lg font-medium">{snack.name}</h2>
      <p className=" text-2xl font-semibold">₹{snack.price}</p>
      <p className="text-sm text-gray-500">{snack.ordersCount} orders</p>

      <OrderDialog presetSnack={snack} />
    </div>
  );
}
