import { useState } from "react";
import { addBooking } from "../services/firebaseService";
import type { Turf } from "../utils/types";

type Props = {
  open: boolean;
  turf: Turf | null;
  onClose: () => void;
  onBooked?: (customerPhone: string, bookingTime: string) => void; // NEW
};

export default function BookingModal({ open, turf, onClose, onBooked }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [method, setMethod] = useState<"mock" | "upi" | "razorpay">("mock");
  const [txnId, setTxnId] = useState("");

  if (!open || !turf) return null;

  // ✅ WhatsApp sender (free redirect)
  const sendWhatsApp = (phone: string, msg: string) => {
    const formattedPhone = phone.replace(/\D/g, "");
    const encodedMsg = encodeURIComponent(msg);
    window.open(`https://wa.me/${formattedPhone}?text=${encodedMsg}`, "_blank");
  };

  // ✅ Main submit
  const submit = async () => {
    if (!name || !phone || !date || !time)
      return alert("Please fill all fields.");

    const amount = turf.price;

    try {
      // If Razorpay selected
      if (method === "razorpay") {
        const options = {
          key: "rzp_test_RQf52Jiv85m7hw", // Test key
          amount: amount * 100, // paise
          currency: "INR",
          name: "BookMyTurf",
          description: `Booking for ${turf.name}`,
          image: "/logo.png",
          handler: async (response: any) => {
            await addBooking({
              turfId: turf.id,
              turfName: turf.name,
              name,
              phone,
              date,
              time,
              amount,
              method,
              razorpay_payment_id: response.razorpay_payment_id,
              status: "confirmed",
            } as any);

            const msg = `Hey ${name}! 🎉 Your booking for *${turf.name}* on *${date}* at *${time}* is confirmed! ✅\nPayment ID: ${response.razorpay_payment_id}\nAmount: ₹${amount}\n\nThank you for choosing *BookMyTurf*!`;
            sendWhatsApp(phone, msg);
            alert("Payment successful! Redirecting to WhatsApp...");
            // NEW: Calling with phone and time
            onBooked?.(phone, `${date} ${time}`);
            onClose();
          },
          prefill: { name, contact: phone },
          theme: { color: "#22c55e" },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
        return;
      }

      // 🔹 For mock / UPI
      await addBooking({
        turfId: turf.id,
        turfName: turf.name,
        name,
        phone,
        date,
        time,
        amount,
        method,
        ...(method === "upi" ? { upiTxnId: txnId } : {}),
      } as any);

      const message =
        method === "upi"
          ? `Hello ${name}, your booking for *${turf.name}* on *${date}* at *${time}* has been recorded as *pending payment verification*. Please wait for admin confirmation.`
          : `Hey ${name}! 🎉 Your booking for *${turf.name}* on *${date}* at *${time}* is *confirmed!* ✅ Amount: ₹${amount}. Thank you for choosing *BookMyTurf*!`;

      sendWhatsApp(phone, message);

      alert(
        method === "upi"
          ? "Booking recorded as PENDING. Redirecting to WhatsApp..."
          : "Booking confirmed! Redirecting to WhatsApp..."
      );

      // reset form
      setName("");
      setPhone("");
      setDate("");
      setTime("");
      setTxnId("");
      // NEW: Calling with phone and time
      onBooked?.(phone, `${date} ${time}`);
      onClose();
    } catch (err: any) {
      alert("Error: " + err?.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-lg p-6 z-10">
        <h3 className="text-xl font-bold mb-3">Book Turf: {turf.name}</h3>

        <div className="grid gap-2">
          <input
            className="p-2 border rounded"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="p-2 border rounded"
            placeholder="Phone number (with country code, e.g. 91xxxxxxxxxx)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <div className="flex gap-2">
            <input
              type="date"
              className="p-2 border rounded w-1/2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="time"
              className="p-2 border rounded w-1/2"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          {/* Payment selection */}
          <div className="flex gap-2 items-center mt-2">
            <label className="mr-2">Payment:</label>
            <select
              className="p-2 border rounded"
              value={method}
              onChange={(e) => setMethod(e.target.value as any)}
            >
              <option value="mock">Mock Payment (Instant)</option>
              <option value="upi">UPI (Manual Verify)</option>
              <option value="razorpay">Razorpay (Online Payment)</option>
            </select>
          </div>

          {/* UPI Option */}
          {method === "upi" && (
            <>
              <div className="flex flex-col items-center mb-2">
                <h4 className="text-sm font-semibold mb-1">
                  Scan & Pay via UPI
                </h4>
                <img
                  src="/myUPIQRCode.png"
                  alt="UPI QR Code"
                  className="w-32 h-32 rounded border p-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Scan this QR code using any UPI app.
                </p>
              </div>
              <input
                className="p-2 border rounded"
                placeholder="Enter UPI Transaction ID"
                value={txnId}
                onChange={(e) => setTxnId(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Admin will verify your UPI payment manually.
              </p>
            </>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <button className="px-4 py-2 rounded border" onClick={onClose}>
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded bg-green-600 text-white"
              onClick={submit}
            >
              Pay & Book (₹{turf.price})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
