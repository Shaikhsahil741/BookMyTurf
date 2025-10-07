// src/utils/types.ts
export type Turf = {
    id: string;
    name: string;
    location: string;
    price: number;
    slots: number;
    imageData?: string; // base64 or url
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
    method: "mock" | "upi";
    // For UPI: qr placeholder or txn id
    upiTxnId?: string;
    upiQr?: string;
    status: "paid" | "pending" | "cancelled";
    createdAt: string;
  };
  