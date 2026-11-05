import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-hijau-900 text-white py-10">
      <div className="max-w-4xl mx-auto px-4 text-center">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Leaf className="w-6 h-6 text-hijau-300" />
          <span className="text-2xl font-bold">PanduanSilase</span>
        </div>
        <p className="text-hijau-200 text-base mb-6 max-w-md mx-auto leading-relaxed">
          Panduan lengkap pembuatan pakan silase untuk ternak ruminansia —
          praktis, mudah dipahami, dan bisa dicetak.
        </p>

        {/* Link navigasi */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { label: "Beranda", href: "#beranda" },
            { label: "Pengenalan", href: "#pengenalan" },
            { label: "Panduan", href: "#panduan" },
            { label: "Kalkulator", href: "#kalkulator" },
            { label: "Tips", href: "#tips" },
            { label: "FAQ", href: "#faq" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-hijau-200 hover:text-white text-base transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="border-t border-hijau-700 pt-6">
          <p className="text-hijau-400 text-sm">
            © 2025 PanduanSilase · Dibuat untuk membantu peternak Indonesia
          </p>
        </div>

      </div>
    </footer>
  );
}