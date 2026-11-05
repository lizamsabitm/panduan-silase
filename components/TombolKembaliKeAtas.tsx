"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function TombolKembaliKeAtas() {
  const [terlihat, setTerlihat] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setTerlihat(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const kembaliKeAtas = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!terlihat) return null;

  return (
    <button
      onClick={kembaliKeAtas}
      className="fixed bottom-6 right-6 z-50 bg-hijau-600 hover:bg-hijau-700 text-white p-3 rounded-full shadow-lg transition-all"
      aria-label="Kembali ke atas"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
}