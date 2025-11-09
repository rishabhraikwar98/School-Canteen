import { create } from "zustand";
import axios from "axios";

const API  = process.env.NEXT_PUBLIC_API_URL;

export const useStore = create((set, get) => ({
  snacks: [],
  students: [],
  orders: [],
  selectedSnack: null,
  selectedStudent: null,
  selectSnack: (snack) => set({ selectedSnack: snack }),
  selectStudent: (student) => set({ selectedStudent: student }),
  resetSnack: () => set({ selectedSnack: null }),
  resetStudent: () => set({ selectedStudent: null }),

  fetchSnacks: async () => {
    const { data } = await axios.get(`${API}/snacks`);
    set({ snacks: data });
  },

  fetchStudents: async () => {
    const { data } = await axios.get(`${API}/students`);
    set({ students: data });
  },
  fetchOrders: async () => {
    const { data } = await axios.get(`${API}/orders`);
    set({ orders: data });
  },

  createStudent: async (name) => {
  const referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  const newStudent = { name, referralCode, totalSpent: 0 };

  const { data } = await axios.post(`${API}/students`, newStudent);
  await get().fetchStudents();
  return data;
},

  placeOrder: async ({ studentId, snackId, quantity, price }) => {
    await axios.post(`${API}/orders`, { studentId, snackId, quantity, totalSpent: price * quantity });

    const student = get().students.find(s => s.id === studentId);
    await axios.patch(`${API}/students/${studentId}`, {
      totalSpent: student.totalSpent + price * quantity
    });

    const snack = get().snacks.find(s => s.id === snackId);
    await axios.patch(`${API}/snacks/${snackId}`, {
      ordersCount: snack.ordersCount + quantity
    });

    get().fetchSnacks();
    get().fetchStudents();
    get().fetchOrders();
  }
}));
