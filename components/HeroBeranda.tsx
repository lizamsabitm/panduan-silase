import { Leaf, ChevronDown } from "lucide-react";

export default function HeroBeranda() {
  return (
    <section
      id="beranda"
      className="min-h-screen bg-gradient-to-b from-hijau-50 to-white flex items-center pt-16"
    >
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-hijau-100 text-hijau-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
          <Leaf className="w-4 h-4" />
          Panduan Lengkap & Praktis
        </div>

        {/* Judul */}
        <h1 className="text-4xl md:text-5xl font-bold text-hijau-900 leading-tight mb-6">
          Panduan Pembuatan<br />
          <span className="text-hijau-500">Pakan Silase</span>
        </h1>

        {/* Deskripsi */}
        <p className="text-lg md:text-xl text-teks-sekunder max-w-2xl mx-auto mb-10 leading-relaxed">
          Pelajari cara membuat pakan silase berkualitas untuk ternak ruminansia —
          sapi, kambing, domba, dan kerbau — dengan bahan yang mudah didapat dan
          langkah yang mudah diikuti.
        </p>

        {/* Tombol */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#panduan"
            className="bg-hijau-600 hover:bg-hijau-700 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors shadow-md"
          >
            Mulai Membuat Silase
          </a>
          <a
            href="#pengenalan"
            className="bg-white hover:bg-hijau-50 text-hijau-700 font-semibold text-lg px-8 py-4 rounded-xl border-2 border-hijau-300 transition-colors"
          >
            Pelajari Dulu
          </a>
        </div>

        {/* Statistik */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-hijau-100">
            <div className="text-2xl font-bold text-hijau-600">4</div>
            <div className="text-sm text-teks-ringan mt-1">Bahan Baku Pilihan</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-hijau-100">
            <div className="text-2xl font-bold text-hijau-600">11</div>
            <div className="text-sm text-teks-ringan mt-1">Langkah Mudah</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-hijau-100">
            <div className="text-2xl font-bold text-hijau-600">7 bln</div>
            <div className="text-sm text-teks-ringan mt-1">Tahan Disimpan</div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex justify-center text-hijau-400">
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </div>

      </div>
    </section>
  );
}