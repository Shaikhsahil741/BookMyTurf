// src/pages/AdminPage.tsx
import React, { useEffect, useState } from "react";
import {
  subscribeTurfs,
  addTurf,
  deleteTurf,
  subscribeBookings,
  updateBookingStatus,
} from "../services/firebaseService";
import type { Turf, Booking } from "../utils/types";
import QRCode from "react-qr-code";

export default function AdminPage() {
  const [turfs, setTurfs] = useState<Turf[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // form
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [slots, setSlots] = useState<number | "">("");
  const [image, setImage] = useState<string>("");

  // QR code state
  const [qrTurf, setQrTurf] = useState<Turf | null>(null);

  useEffect(() => {
    const off1 = subscribeTurfs(setTurfs);
    const off2 = subscribeBookings(setBookings);
    return () => {
      off1();
      off2();
    };
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(f);
  };

  const onAdd = async () => {
    if (!name || !location || !price || !slots) return alert("fill all");
    await addTurf({
      name,
      location,
      price: Number(price),
      slots: Number(slots),
      imageData: image,
    });
    setName("");
    setLocation("");
    setPrice("");
    setSlots("");
    setImage("");
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete turf?")) return;
    await deleteTurf(id);
  };

  const bookingsFor = (turfId: string) =>
    bookings.filter((b) => b.turfId === turfId);

  // Base URL for QR codes (update to your hosted app)
  const baseUrl = "https://yourdomain.com/customer";

  return (
    <div className="relative font-['Roboto'] min-h-screen">
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/turf-bg.jpg')" }}
      ></div>
      <div className="fixed inset-0 bg-white/20 z-10"></div>

      <nav className="fixed top-0 left-0 w-full z-30 p-4 flex justify-between items-center bg-white/30 backdrop-blur-md">
        <a href="/" className="text-xl font-bold text-green-800 mx-auto">
          BookMyTurf - Admin
        </a>
      </nav>

      <div className="relative z-20 pt-24 p-6">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Admin Panel
        </h1>

        {/* Add Turf Form */}
        <div className="bg-white/90 p-4 rounded-lg shadow mb-6">
          <h2 className="font-semibold mb-3">Add Turf</h2>
          <div className="grid md:grid-cols-5 gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border rounded"
              placeholder="Name"
            />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-2 border rounded"
              placeholder="Location"
            />
            <input
              value={price as any}
              onChange={(e) =>
                setPrice(e.target.value ? Number(e.target.value) : "")
              }
              type="number"
              className="p-2 border rounded"
              placeholder="Price"
            />
            <input
              value={slots as any}
              onChange={(e) =>
                setSlots(e.target.value ? Number(e.target.value) : "")
              }
              type="number"
              className="p-2 border rounded"
              placeholder="Slots"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex justify-end mt-3">
            <button
              onClick={onAdd}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Add Turf
            </button>
          </div>
        </div>

        {/* Turfs List */}
        <h3 className="text-lg text-white mb-3">Turfs</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {turfs.map((t) => (
            <div key={t.id} className="bg-white/90 p-3 rounded-lg shadow">
              {t.imageData ? (
                <img
                  src={t.imageData}
                  alt={t.name}
                  className="w-full h-36 object-cover rounded mb-2"
                />
              ) : (
                <div className="h-36 bg-green-100 rounded mb-2 flex items-center justify-center text-green-600">
                  No image
                </div>
              )}
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm text-gray-600">{t.location}</div>
              <div className="mt-1">₹ {t.price} / slot</div>
              <div className="text-sm text-gray-600">
                Slots: {t.slots} | Booked:{" "}
                {bookingsFor(t.id).filter((b) => b.status === "paid").length} |
                Pending:{" "}
                {bookingsFor(t.id).filter((b) => b.status === "pending").length}
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                <button
                  onClick={() => onDelete(t.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => setQrTurf(t)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Generate QR
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bookings List */}
        <h3 className="text-lg text-white mb-3">Bookings (latest first)</h3>
        <div className="space-y-3">
          {[...bookings].reverse().map((b) => (
            <div
              key={b.id}
              className="bg-white/90 p-3 rounded-lg shadow flex justify-between items-start"
            >
              <div>
                <div className="font-semibold">
                  {b.turfName} — {b.name}
                </div>
                <div className="text-sm text-gray-600">
                  {b.date} {b.time} • ₹{b.amount} • {b.method.toUpperCase()}
                </div>
                <div className="text-sm text-gray-600">Phone: {b.phone}</div>
                {b.upiTxnId && (
                  <div className="text-sm text-gray-600">
                    UPI Txn: {b.upiTxnId}
                  </div>
                )}
                <div className="text-xs text-gray-500">
                  Created: {new Date(b.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="flex flex-col gap-2 items-end">
                <div
                  className={`px-3 py-1 rounded text-sm ${
                    b.status === "paid"
                      ? "bg-green-100 text-green-800"
                      : b.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {b.status.toUpperCase()}
                </div>
                {b.status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateBookingStatus(b.id, "paid")}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Mark Paid
                    </button>
                    <button
                      onClick={() => updateBookingStatus(b.id, "cancelled")}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QR Code Modal */}
      {qrTurf && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setQrTurf(null)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-3">
              QR Code for {qrTurf.name}
            </h3>
            <QRCode
              value={`${baseUrl}?turfname=${encodeURIComponent(qrTurf.name)}`}
              size={200}
            />
            <p className="text-sm mt-2">
              Scan this QR to go directly to the booking page for this turf.
            </p>
            <button
              onClick={() => setQrTurf(null)}
              className="mt-3 px-4 py-2 bg-green-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
