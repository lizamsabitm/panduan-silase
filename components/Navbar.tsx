"use client";

import { useState } from "react";

const menuItems = [
  { label: "Beranda", href: "#beranda" },
  { label: "Panduan", href: "#panduan" },
  { label: "Kalkulator", href: "#kalkulator" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [menuTerbuka, setMenuTerbuka] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-hijau-100 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo / Nama */}
        <a href="#beranda" className="text-hijau-700 font-bold text-lg">
          🌿 PanduanSilase
        </a>

        {/* Menu desktop (layar besar) */}
        <ul className="hidden md:flex gap-6">
          {menuItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-teks-sekunder hover:text-hijau-600 font-medium text-base transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Tombol hamburger (layar HP) */}
        <button
          onClick={() => setMenuTerbuka(!menuTerbuka)}
          className="md:hidden p-2 rounded-lg text-hijau-700 hover:bg-hijau-50 transition-colors"
          aria-label="Buka menu"
        >
          {menuTerbuka ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Menu dropdown HP */}
      {menuTerbuka && (
        <div className="md:hidden bg-white border-t border-hijau-100 px-4 py-2">
          <ul className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuTerbuka(false)}
                  className="block py-3 px-2 text-teks-sekunder hover:text-hijau-600 hover:bg-hijau-50 rounded-lg font-medium text-lg transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}