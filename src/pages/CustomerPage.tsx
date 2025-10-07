// src/pages/CustomerPage.tsx
import React, { useEffect, useState } from "react";
import { subscribeTurfs } from "../services/firebaseService";
import type { Turf } from "../utils/types";
import BookingModal from "../components/BookingModal";
import { useSearchParams } from "react-router-dom";

export default function CustomerPage() {
  const [turfs, setTurfs] = useState<Turf[]>([]);
  const [filteredTurfs, setFilteredTurfs] = useState<Turf[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Turf | null>(null);
  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const off = subscribeTurfs((data) => {
      setTurfs(data);
      setFilteredTurfs(data);
    });
    return () => off();
  }, []);

  // Auto-fill search if QR has turfname
  useEffect(() => {
    const turfNameFromQR = searchParams.get("turfname") || "";
    if (turfNameFromQR) {
      setSearchName(turfNameFromQR);
    }
  }, [searchParams]);

  // Filter turfs whenever search changes
  useEffect(() => {
    const lowerName = searchName.toLowerCase();
    const lowerLocation = searchLocation.toLowerCase();
    const filtered = turfs.filter(
      (t) =>
        t.name.toLowerCase().includes(lowerName) &&
        t.location.toLowerCase().includes(lowerLocation)
    );
    setFilteredTurfs(filtered);

    // If only one turf matches, auto-select it and open booking modal
    if (filtered.length === 1) {
      setSelected(filtered[0]);
      setOpen(true);
    }
  }, [searchName, searchLocation, turfs]);

  // ✅ WhatsApp notification function
  const sendWhatsApp = (number: string, turfName: string, time: string) => {
    const msg = `Hi! 👋 Your booking for *${turfName}* at ${time} has been successfully confirmed on *BookMyTurf* ✅.%0AWe’re excited to see you play! ⚽🏏🎉`;
    const url = `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="relative font-['Roboto'] min-h-screen">
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/turf-bg.jpg')" }}
      ></div>
      <div className="fixed inset-0 bg-white/20 z-10"></div>

      <nav className="fixed top-0 left-0 w-full z-30 p-4 flex justify-between items-center bg-white/30 backdrop-blur-md">
        <div className="text-xl font-bold text-green-800">BookMyTurf</div>
        <div>
          <a href="/" className="px-3 py-1 text-white font-semibold">
            Home
          </a>
          <a href="/admin" className="px-3 py-1 text-white font-semibold">
            Admin
          </a>
        </div>
      </nav>

      <div className="relative z-20 pt-24 p-6">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Explore Turfs
        </h1>

        {/* Search Boxes */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="p-2 rounded border w-full sm:w-1/3"
          />
          <input
            type="text"
            placeholder="Search by location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="p-2 rounded border w-full sm:w-1/3"
          />
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredTurfs.map((t) => (
            <div key={t.id} className="bg-white/90 rounded-xl shadow p-4">
              {t.imageData ? (
                <img
                  src={t.imageData}
                  alt={t.name}
                  className="w-full h-40 object-cover rounded mb-3 cursor-pointer"
                  onClick={() => setPreviewImage(t.imageData || null)}
                />
              ) : (
                <div className="h-40 bg-green-100 rounded mb-3 flex items-center justify-center">
                  No image
                </div>
              )}
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm text-gray-600">{t.location}</div>
              <div className="mt-2 font-semibold">₹{t.price} / slot</div>
              <div className="mt-3">
                <button
                  onClick={() => {
                    setSelected(t);
                    setOpen(true);
                  }}
                  className="w-full bg-green-600 text-white py-2 rounded"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BookingModal
        open={open}
        turf={selected}
        onClose={() => setOpen(false)}
        onBooked={(customerPhone: string, bookingTime: string) => {
          setOpen(false);
          if (selected && customerPhone) {
            sendWhatsApp(customerPhone, selected.name, bookingTime);
          }
        }}
      />

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Preview"
            className="max-h-full max-w-full rounded"
          />
        </div>
      )}
    </div>
  );
}
