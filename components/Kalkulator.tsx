"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";

type Props = {
  namaBahan: string;
  onHasilBerubah?: (berat: number, dedak: number, molases: number) => void;
};

export default function Kalkulator({ namaBahan, onHasilBerubah }: Props) {
  const [beratHijauan, setBeratHijauan] = useState<string>("");

  const berat = parseFloat(beratHijauan);
  const dedak = isNaN(berat) ? null : parseFloat((berat * 0.1).toFixed(2));
  const molases = isNaN(berat) ? null : parseFloat((berat * 0.01).toFixed(2));
  const handleInput = (nilai: string) => {
  setBeratHijauan(nilai);
  const b = parseFloat(nilai);
  if (!isNaN(b) && b > 0 && onHasilBerubah) {
    onHasilBerubah(b, parseFloat((b * 0.1).toFixed(2)), parseFloat((b * 0.01).toFixed(2)));
    }
  };

  return (
    <div id="kalkulator" className="bg-hijau-50 rounded-2xl p-5 border border-hijau-200">

      {/* Header — disembunyikan saat cetak */}
      <h4 className="font-bold text-hijau-800 text-lg mb-1 flex items-center gap-2 print:hidden">
        <Calculator className="w-5 h-5 text-hijau-600" />
        Kalkulator Takaran
      </h4>
      <p className="text-teks-sekunder text-sm mb-4 print:hidden">
        Masukkan berat <strong>{namaBahan}</strong> yang sudah ditimbang untuk
        menghitung takaran dedak dan molases yang dibutuhkan.
      </p>

      {/* Input — disembunyikan saat cetak */}
      <div className="mb-4 print:hidden">
        <label className="block text-base font-semibold text-hijau-800 mb-2">
          Berat {namaBahan} (kg)
        </label>
        <input
          type="number"
          min="0"
          value={beratHijauan}
          onChange={(e) => handleInput(e.target.value)}
          placeholder="Contoh: 100"
          className="w-full border-2 border-hijau-200 rounded-xl px-4 py-3 text-lg text-teks-utama focus:outline-none focus:border-hijau-500 bg-white"
        />
      </div>

      {/* Hasil kalkulasi — tampil di layar dan cetak */}
      {dedak !== null && molases !== null && berat > 0 && (
        <>
          {/* Tampilan layar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 print:hidden">
            <div className="bg-white rounded-xl p-4 border border-hijau-200 text-center">
              <div className="text-sm text-teks-ringan mb-1">Dedak yang dibutuhkan</div>
              <div className="text-3xl font-bold text-hijau-600">{dedak} kg</div>
              <div className="text-xs text-teks-ringan mt-1">10% dari berat hijauan</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-hijau-200 text-center">
              <div className="text-sm text-teks-ringan mb-1">Molases yang dibutuhkan</div>
              <div className="text-3xl font-bold text-hijau-600">{molases} kg</div>
              <div className="text-xs text-teks-ringan mt-1">1% dari berat hijauan</div>
            </div>
          </div>

          <p className="text-xs text-teks-ringan mt-3 text-center print:hidden">
            Untuk {berat} kg {namaBahan} → {dedak} kg dedak + {molases} kg molases
          </p>

          {/* Tampilan cetak — ringkas dan bersih */}
          <div className="hidden print:block border border-gray-300 rounded p-3 bg-white">
            <p className="font-bold text-hijau-800 text-sm mb-2">
              Hasil Kalkulator Takaran — {namaBahan}
            </p>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2 border border-gray-300 bg-gray-50">Bahan</th>
                  <th className="text-left p-2 border border-gray-300 bg-gray-50">Takaran</th>
                  <th className="text-left p-2 border border-gray-300 bg-gray-50">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-gray-300 font-medium">Hijauan ({namaBahan})</td>
                  <td className="p-2 border border-gray-300 font-bold">{berat} kg</td>
                  <td className="p-2 border border-gray-300 text-gray-600">Bahan baku utama</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-300 font-medium">Dedak</td>
                  <td className="p-2 border border-gray-300 font-bold text-green-700">{dedak} kg</td>
                  <td className="p-2 border border-gray-300 text-gray-600">10% dari berat hijauan</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-300 font-medium">Molases</td>
                  <td className="p-2 border border-gray-300 font-bold text-green-700">{molases} kg</td>
                  <td className="p-2 border border-gray-300 text-gray-600">1% dari berat hijauan</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Jika kalkulator belum diisi, tampilkan placeholder di cetak */}
      {(dedak === null || berat <= 0) && (
        <div className="hidden print:block border border-gray-300 rounded p-3 bg-white">
          <p className="font-bold text-hijau-800 text-sm mb-2">
            Hasil Kalkulator Takaran — {namaBahan}
          </p>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-2 border border-gray-300 bg-gray-50">Bahan</th>
                <th className="text-left p-2 border border-gray-300 bg-gray-50">Takaran</th>
                <th className="text-left p-2 border border-gray-300 bg-gray-50">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-gray-300 font-medium">Hijauan ({namaBahan})</td>
                <td className="p-2 border border-gray-300 text-gray-400">___ kg</td>
                <td className="p-2 border border-gray-300 text-gray-600">Bahan baku utama</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300 font-medium">Dedak</td>
                <td className="p-2 border border-gray-300 text-gray-400">___ kg</td>
                <td className="p-2 border border-gray-300 text-gray-600">10% dari berat hijauan</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300 font-medium">Molases</td>
                <td className="p-2 border border-gray-300 text-gray-400">___ kg</td>
                <td className="p-2 border border-gray-300 text-gray-600">1% dari berat hijauan</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-gray-400 mt-2">
            * Isi kalkulator sebelum mencetak untuk mendapatkan takaran yang sesuai
          </p>
        </div>
      )}

    </div>
  );
}