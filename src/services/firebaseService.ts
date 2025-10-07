import { db } from "../firebaseConfig";
import { ref, set, onValue, remove, update } from "firebase/database";
import type { Turf, Booking } from "../utils/types";

/* TURF APIs */
export function subscribeTurfs(callback: (turfs: Turf[]) => void) {
  const r = ref(db, "turfs");
  return onValue(r, (snap) => {
    const val = snap.val();
    if (!val) return callback([]);
    const arr: Turf[] = Object.keys(val).map((k) => ({ id: k, ...val[k] }));
    callback(arr);
  });
}

export function addTurf(turf: Omit<Turf, "id">) {
  const id = Date.now().toString();
  return set(ref(db, `turfs/${id}`), { ...turf });
}

export function deleteTurf(id: string) {
  return remove(ref(db, `turfs/${id}`));
}

/* BOOKINGS APIs */
export function subscribeBookings(callback: (bookings: Booking[]) => void) {
  const r = ref(db, "bookings");
  return onValue(r, (snap) => {
    const val = snap.val();
    if (!val) return callback([]);
    const arr: Booking[] = Object.keys(val).map((k) => ({ id: k, ...val[k] }));
    callback(arr);
  });
}

export function addBooking(
  b: Omit<Booking, "id" | "createdAt"> & { status?: Booking["status"] }
) {
  const id = Date.now().toString();

  // Exclude status from b to avoid overwriting
  const { status, ...rest } = b;

  const payload: Booking = {
    id,
    createdAt: new Date().toISOString(),
    ...rest,
    status: status ?? (b.method === "mock" ? "paid" : "pending"),
  };

  return set(ref(db, `bookings/${id}`), payload);
}

export function updateBookingStatus(id: string, status: Booking["status"]) {
  return update(ref(db, `bookings/${id}`), { status });
}
