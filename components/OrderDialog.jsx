"use client";
import { useState } from "react";
import OrderForm from "./OrderForm";
import { useStore } from "@/store/useStore";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export default function OrderDialog({ presetStudent, presetSnack, onSuccess }) {
  const { students, snacks } = useStore();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="sm:w-auto hover:bg-gray-800"
        >
          Order
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95%] max-w-md p-4 sm:p-6 rounded-lg">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="text-lg font-semibold">
              {presetSnack ? presetSnack.name : "Place Order"}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="mt-2">
          <OrderForm
            students={students}
            snacks={snacks}
            presetStudent={presetStudent}
            presetSnack={presetSnack}
            onSuccess={
              () =>{
                if (onSuccess){
                  onSuccess()
                }
                setOpen(false)
              }
            }
          />
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="ghost" className="mr-2">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
