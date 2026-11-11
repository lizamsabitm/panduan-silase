"use client";

import { useState } from "react";
import { Wrench, ClipboardList, CheckCircle, XCircle, Home, Beef, Printer } from "lucide-react";
import bahanBakuData from "@/data/bahanBaku.json";
import langkahData from "@/data/langkahPembuatan.json";
import Kalkulator from "@/components/Kalkulator";

type BahanBaku = {
  id: string;
  nama: string;
  bk: number;
  pk: number;
  sk: number;
  tdn: number;
};

type Langkah = {
  langkah: number;
  judul: string;
  deskripsi: string;
  adaKalkulator?: boolean;
};

const alatAlat = [
  { nama: "Timbangan", fungsi: "Mengukur bahan-bahan dengan akurat" },
  { nama: "Alat Pencacah / Gunting", fungsi: "Memotong bahan baku menjadi ukuran 2–5 cm" },
  { nama: "Wadah Fermentasi", fungsi: "Drum, gentong, atau plastik silase yang bisa ditutup rapat kedap udara. Jika menggunakan plastik, pastikan berkode 2 (HDPE), 4 (LDPE), atau 5 (PP) yang tertera di dasar wadah. Jangan gunakan wadah bekas cat atau bahan kimia. Pastikan wadah bersih dan kering sebelum digunakan" },
  { nama: "Terpal", fungsi: "Alas untuk mencampur semua bahan. Pastikan terpal bersih dan kering sebelum digunakan" },
  { nama: "Sekop", fungsi: "Untuk mencampur dan mengambil campuran pakan (opsional)" },
  { nama: "Vakum", fungsi: "Memastikan tidak ada udara masuk jika menggunakan plastik silase (opsional)" },
  { nama: "Alat Pengukur pH Tanah", fungsi: "Mengukur pH pakan setelah fermentasi selesai (ideal: 4–5)" },
];

const indikatorBerhasil = [
  "Warna masih mirip dengan aslinya, tidak berubah drastis",
  "Beraroma asam segar seperti tape, tidak berbau busuk",
  "Tidak berjamur",
  "Tingkat keasaman (pH) 4–5",
  "Tekstur agak lembab, tidak kering dan tidak terlalu basah",
  "Tidak ada genangan cairan di wadah",
];

const indikatorGagal = [
  "Warna berubah drastis menjadi cokelat tua atau hitam gosong",
  "Mengeluarkan bau busuk tajam seperti telur busuk atau kotoran",
  "Berjamur luas",
  "Tekstur lembek, berlendir, menggumpal, dan lengket",
];

const aturanPenggunaan = [
  "Setelah 21 hari, silase dapat dibuka dan langsung diberikan ke ternak",
  "Silase yang sudah dibuka harus dihabiskan dalam satu hari",
  "Jangan buka silase jika tidak akan langsung diberikan ke ternak",
  "Jangan berikan silase yang sudah berjamur, berbau busuk, atau berubah warna hitam/cokelat tua",
  "Pastikan selalu tersedia air minum bersih yang cukup karena silase bersifat asam",
];

const aturanPenyimpanan = [
  "Proses fermentasi berlangsung selama 21 hari — jangan dibuka sebelum waktunya",
  "Simpan di tempat teduh dan kering",
  "Letakkan wadah di atas alas (misalnya papan kayu), jangan langsung di tanah",
  "Jauhkan dari hujan, genangan air, dan sinar matahari langsung",
  "Jauhkan dari hewan pengganggu seperti tikus dan ayam",
  "Silase tertutup rapat bisa disimpan hingga 4–7 bulan",
];

export default function SeksiPanduan() {
  const [bahanDipilih, setBahanDipilih] = useState<BahanBaku | null>(null);

  const getDeskripsi = (teks: string) => {
    if (!bahanDipilih) return teks;
    return teks.replace(/\{bahanBaku\}/g, bahanDipilih.nama);
  };

  return (
    <section id="panduan" className="bg-surface py-16">
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-hijau-100 text-hijau-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Panduan Pembuatan
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-hijau-900 mb-4">
            Cara Membuat Pakan Silase
          </h2>
          <p className="text-lg text-teks-sekunder max-w-2xl mx-auto leading-relaxed">
            Ikuti langkah-langkah berikut dengan teliti untuk menghasilkan
            silase berkualitas baik.
          </p>
        </div>

        {/* Pilih bahan baku */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-hijau-100 mb-8">
          <h3 className="text-xl font-bold text-hijau-800 mb-2">
            Langkah Awal: Pilih Bahan Baku Utama
          </h3>
          <p className="text-teks-sekunder mb-5 text-base">
            Pilih salah satu bahan baku yang akan kamu gunakan. Panduan langkah
            akan menyesuaikan dengan pilihan kamu.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(bahanBakuData as BahanBaku[]).map((bahan) => (
              <button
                key={bahan.id}
                onClick={() => setBahanDipilih(bahan)}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  bahanDipilih?.id === bahan.id
                    ? "border-hijau-500 bg-hijau-50"
                    : "border-hijau-100 bg-white hover:border-hijau-300 hover:bg-hijau-50"
                }`}
              >
                <div className="font-semibold text-hijau-800 text-lg">
                  {bahan.nama}
                </div>
                <div className="text-sm text-teks-ringan mt-1">
                  Protein: {bahan.pk}% · Kecernaan: {bahan.tdn}%
                </div>
              </button>
            ))}
          </div>

          {/* Tabel uji lab */}
          {bahanDipilih && (
            <div className="mt-6">
              <h4 className="font-bold text-hijau-700 mb-3 text-base">
                Hasil Uji Lab — {bahanDipilih.nama}
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-base border-collapse">
                  <thead>
                    <tr className="bg-hijau-100 text-hijau-800">
                      <th className="text-left p-3 rounded-tl-xl font-semibold">Kandungan</th>
                      <th className="text-left p-3 font-semibold">Keterangan</th>
                      <th className="text-right p-3 rounded-tr-xl font-semibold">Nilai (% BK)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-hijau-50">
                      <td className="p-3 font-medium text-teks-utama">BK</td>
                      <td className="p-3 text-teks-sekunder">Bahan Kering</td>
                      <td className="p-3 text-right font-semibold text-hijau-700">{bahanDipilih.bk}%</td>
                    </tr>
                    <tr className="border-b border-hijau-50 bg-hijau-50/30">
                      <td className="p-3 font-medium text-teks-utama">PK</td>
                      <td className="p-3 text-teks-sekunder">Protein Kasar</td>
                      <td className="p-3 text-right font-semibold text-hijau-700">{bahanDipilih.pk}%</td>
                    </tr>
                    <tr className="border-b border-hijau-50">
                      <td className="p-3 font-medium text-teks-utama">SK</td>
                      <td className="p-3 text-teks-sekunder">Serat Kasar</td>
                      <td className="p-3 text-right font-semibold text-hijau-700">{bahanDipilih.sk}%</td>
                    </tr>
                    <tr className="bg-hijau-50/30">
                      <td className="p-3 font-medium text-teks-utama">TDN</td>
                      <td className="p-3 text-teks-sekunder">Total Digestible Nutrients (Kecernaan)</td>
                      <td className="p-3 text-right font-semibold text-hijau-700">{bahanDipilih.tdn}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* Hanya muncul saat cetak */}
            {bahanDipilih && (
            <div className="hidden print:block mt-4 p-3 border border-gray-300 rounded-lg">
             <p className="font-bold text-hijau-800 text-base">
              Bahan Baku yang Digunakan: {bahanDipilih.nama}
              </p>
              </div>
              )}
        </div>

        {/* Alat */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-hijau-100 mb-8">
          <h3 className="text-xl font-bold text-hijau-800 mb-5 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-hijau-600" />
            Alat yang Dibutuhkan
          </h3>
          <div className="flex flex-col gap-3">
            {alatAlat.map((alat) => (
              <div key={alat.nama} className="flex gap-3 items-start p-3 rounded-xl bg-hijau-50">
                <CheckCircle className="w-5 h-5 text-hijau-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-hijau-800 text-base">{alat.nama}</span>
                  <span className="text-teks-sekunder text-base"> — {alat.fungsi}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Langkah */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-hijau-800 mb-5 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-hijau-600" />
            Langkah-Langkah Pembuatan
          </h3>

          {!bahanDipilih && (
            <div className="bg-tanah-100 border border-tanah-200 rounded-2xl p-5 text-center text-teks-sekunder text-base mb-5">
              Pilih bahan baku terlebih dahulu di atas untuk melihat panduan langkah-langkahnya.
            </div>
          )}

          <div className="flex flex-col gap-4">
            {(langkahData as Langkah[]).map((item) => (
              <div
                key={item.langkah}
                className={`bg-white rounded-2xl p-5 shadow-sm border transition-all ${
                  bahanDipilih ? "border-hijau-100" : "border-hijau-50 opacity-50"
                }`}
              >
                <div className="flex gap-4 items-start">
                  <div className="bg-hijau-600 text-white font-bold text-lg w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                    {item.langkah}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-hijau-800 text-lg mb-2">{item.judul}</h4>
                    <p className="text-teks-sekunder text-base leading-relaxed">
                      {getDeskripsi(item.deskripsi)}
                    </p>
                    {item.adaKalkulator && bahanDipilih && (
                      <div className="mt-4">
                        <Kalkulator namaBahan={bahanDipilih.nama} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cek hasil */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-hijau-100 mb-8">
          <h3 className="text-xl font-bold text-hijau-800 mb-5">
            Cara Mengecek Hasil Fermentasi
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <h4 className="font-bold text-green-700 mb-3">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm inline-flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Silase Berhasil
                </span>
              </h4>
              <ul className="flex flex-col gap-2">
                {indikatorBerhasil.map((item) => (
                  <li key={item} className="flex gap-2 items-start text-base text-teks-sekunder">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-red-700 mb-3">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm inline-flex items-center gap-1">
                  <XCircle className="w-4 h-4" /> Silase Gagal
                </span>
              </h4>
              <ul className="flex flex-col gap-2">
                {indikatorGagal.map((item) => (
                  <li key={item} className="flex gap-2 items-start text-base text-teks-sekunder">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Penyimpanan */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-hijau-100 mb-8">
          <h3 className="text-xl font-bold text-hijau-800 mb-5 flex items-center gap-2">
            <Home className="w-5 h-5 text-hijau-600" />
            Cara Penyimpanan
          </h3>
          <ul className="flex flex-col gap-3">
            {aturanPenyimpanan.map((item) => (
              <li key={item} className="flex gap-3 items-start text-base">
                <div className="w-1.5 h-1.5 rounded-full bg-hijau-400 shrink-0 mt-2.5" />
                <span className="text-teks-sekunder leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pemberian */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-hijau-100 mb-8">
          <h3 className="text-xl font-bold text-hijau-800 mb-5 flex items-center gap-2">
            <Beef className="w-5 h-5 text-hijau-600" />
            Cara Pemberian ke Ternak
          </h3>
          <ul className="flex flex-col gap-3">
            {aturanPenggunaan.map((item) => (
              <li key={item} className="flex gap-3 items-start text-base">
                <div className="w-1.5 h-1.5 rounded-full bg-hijau-400 shrink-0 mt-2.5" />
                <span className="text-teks-sekunder leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cetak */}
        <div className="tombol-cetak text-center">
          <button
            onClick={() => window.print()}
            className="bg-hijau-600 hover:bg-hijau-700 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors shadow-md inline-flex items-center gap-2"
          >
            <Printer className="w-5 h-5" />
            Cetak Panduan Ini
          </button>
          <p className="text-teks-ringan text-sm mt-3">
            Simpan sebagai PDF atau cetak langsung untuk dibawa ke kandang
          </p>
        </div>

      </div>
    </section>
  );
}