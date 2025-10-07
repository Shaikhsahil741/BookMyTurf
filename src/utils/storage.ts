// src/utils/storage.ts
export const LS_TURFS = "bmf_turfs_v1";
export const LS_BOOKINGS = "bmf_bookings_v1";

export type Turf = {
  id: string;
  name: string;
  location: string;
  price: number;
  slots: number;
  imageData?: string; // base64 data URL
};

export type Booking = {
  id: string;
  turfId: string;
  turfName: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  amount: number;
  method: "mock" | "upi" | "razorpay";
  status: "paid" | "pending" | "cancelled";
  createdAt: string;
};

export function loadTurfs(): Turf[] {
  try {
    const raw = localStorage.getItem(LS_TURFS);
    if (!raw) return [];
    return JSON.parse(raw) as Turf[];
  } catch {
    return [];
  }
}
export function saveTurfs(turfs: Turf[]) {
  localStorage.setItem(LS_TURFS, JSON.stringify(turfs));
}
export function loadBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(LS_BOOKINGS);
    if (!raw) return [];
    return JSON.parse(raw) as Booking[];
  } catch {
    return [];
  }
}
export function saveBookings(b: Booking[]) {
  localStorage.setItem(LS_BOOKINGS, JSON.stringify(b));
}
