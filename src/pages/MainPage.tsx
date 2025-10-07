import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import football from "/football.jpg";
import cricket from "/cricket.jpg";
import celebration from "/celebration.jpg";

const images = [football, cricket, celebration];

export default function MainPage() {
  const [idx, setIdx] = useState(0);
  const [welcome, setWelcome] = useState(true);

  // Smooth slideshow transition
  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((prev) => (prev + 1) % images.length);
    }, 4500); // smoother speed
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setWelcome(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden font-['Poppins'] text-white">
      {/* Background slideshow */}
      <div className="absolute inset-0 z-0">
        {images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              filter: "brightness(0.75)",
            }}
          />
        ))}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-30 p-4 flex justify-center bg-black/30 backdrop-blur-sm">
        <div className="text-2xl font-bold tracking-widest text-green-400">
          BOOKMYTURF
        </div>
      </nav>

      {/* Welcome Animation */}
      {welcome ? (
        <div className="absolute inset-0 flex items-center justify-center text-center animate-fade-in z-20">
          <div>
            <h1 className="text-6xl font-extrabold text-green-400 drop-shadow-lg">
              Welcome to BOOKMYTURF
            </h1>
            <p className="mt-4 text-xl text-gray-200">
              Your game. Your time. Your turf.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <div className="relative z-20 pt-24 flex flex-col items-center justify-center text-center px-6 animate-slide-up">
            <h1 className="text-6xl font-extrabold text-green-400 drop-shadow-lg">
              BOOKMYTURF
            </h1>
            <p className="mt-3 text-xl text-gray-200 italic">
              Find, book, and play — anytime, anywhere.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link
                to="/customer"
                className="px-6 py-3 bg-green-500 hover:bg-green-600 transition rounded-full"
              >
                Customer
              </Link>
              <Link
                to="/admin"
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 transition rounded-full"
              >
                Admin
              </Link>
            </div>
          </div>

          {/* About Section */}
          <section className="relative z-20 mt-24 bg-black/40 backdrop-blur-sm p-10 md:p-20 rounded-2xl mx-6 md:mx-20 text-center shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-green-400">
              Why Choose BookMyTurf?
            </h2>
            <p className="text-gray-200 max-w-3xl mx-auto leading-relaxed text-lg">
              BookMyTurf is your one-stop platform for all your turf booking
              needs. Whether it’s football, cricket, or just a friendly
              get-together, our system ensures you find the perfect turf with
              real-time availability, instant payment options, and hassle-free
              management. Scan, book, play — it’s that easy.
            </p>
          </section>

          {/* Features Section */}
          <section className="relative z-20 mt-16 grid md:grid-cols-3 gap-8 mx-6 md:mx-20">
            {[
              {
                title: "QR Code Booking",
                desc: "Scan a turf’s QR and instantly open its booking page — no typing, no searching.",
                icon: "📱",
              },
              {
                title: "Instant Payment",
                desc: "Secure UPI and online payments make booking smoother than ever.",
                icon: "💸",
              },
              {
                title: "Real-Time Updates",
                desc: "Get live slot availability and instant booking confirmations.",
                icon: "⚡",
              },
              {
                title: "Easy Management",
                desc: "Admins can add turfs, view bookings, and manage payments effortlessly.",
                icon: "🧾",
              },
              {
                title: "Smart Notifications",
                desc: "Get reminders and updates for your upcoming matches.",
                icon: "🔔",
              },
              {
                title: "Multi-Sport Support",
                desc: "Book for football, cricket, badminton, or custom events easily.",
                icon: "🏏",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition shadow-lg text-center"
              >
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-green-300">
                  {f.title}
                </h3>
                <p className="text-gray-200 text-sm">{f.desc}</p>
              </div>
            ))}
          </section>

          {/* Testimonials */}
          <section className="relative z-20 mt-24 text-center px-8 md:px-20">
            <h2 className="text-3xl font-bold text-green-400 mb-6">
              What Players Say
            </h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              {[
                {
                  name: "Rohit Verma",
                  text: "Super convenient! Scanned the turf QR, booked within 30 seconds. Love the smooth experience!",
                },
                {
                  name: "Ananya Singh",
                  text: "The best part is real-time availability. No more calling and waiting — everything’s online!",
                },
                {
                  name: "Karan Patel",
                  text: "Clean UI, fast payments, and instant confirmation — exactly what players needed.",
                },
              ].map((t, i) => (
                <div
                  key={i}
                  className="bg-white/10 p-6 rounded-2xl shadow-lg w-full md:w-1/3 hover:bg-white/20 transition"
                >
                  <p className="italic text-gray-100 mb-4">“{t.text}”</p>
                  <div className="font-semibold text-green-300">{t.name}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="relative z-20 mt-24 py-6 bg-black/50 backdrop-blur-md text-center text-gray-300 text-sm">
            <p>© {new Date().getFullYear()} BookMyTurf. All rights reserved.</p>
            <p className="text-gray-400 mt-1">
              Developed by <span className="text-green-400">Sahil Shaikh</span>
            </p>
          </footer>
        </>
      )}
    </div>
  );
}
