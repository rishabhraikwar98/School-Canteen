"use client";
import {  useState } from "react";
import OrderForm from "./OrderForm";
import {useStore} from "@/store/useStore";
import { Button } from "./ui/button";

export default function OrderDialog({ presetStudent, presetSnack }) {
  const { students, snacks } = useStore();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-4 py-2 rounded sm:w-auto"
      >
        Order
      </Button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{presetSnack?presetSnack.name:"Order Snack"}</h2>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <OrderForm
              students={students}
              snacks={snacks}
              presetStudent={presetStudent}
              presetSnack={presetSnack}
              onSuccess={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
