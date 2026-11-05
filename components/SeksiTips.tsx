import { CheckCircle, AlertTriangle } from "lucide-react";
import tipsData from "@/data/tips.json";

type Troubleshoot = {
  masalah: string;
  penyebab: string;
  solusi: string;
};

type TipsData = {
  tipsBerhasil: string[];
  troubleshoot: Troubleshoot[];
};

const data = tipsData as TipsData;

export default function SeksiTips() {
  return (
    <section id="tips" className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-hijau-100 text-hijau-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Tips & Troubleshoot
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-hijau-900 mb-4">
            Tips & Penyelesaian Masalah
          </h2>
          <p className="text-lg text-teks-sekunder max-w-2xl mx-auto leading-relaxed">
            Ikuti tips berikut agar silase berhasil, dan temukan solusi jika
            ada masalah yang muncul.
          </p>
        </div>

        {/* Tips */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-hijau-800 mb-6 flex items-center gap-2">
            <div className="bg-hijau-100 p-2 rounded-xl">
              <CheckCircle className="w-5 h-5 text-hijau-600" />
            </div>
            Tips Agar Silase Berhasil
          </h3>
          <div className="flex flex-col gap-3">
            {data.tipsBerhasil.map((tips, index) => (
              <div
                key={index}
                className="flex gap-4 items-start bg-hijau-50 rounded-2xl p-5 border border-hijau-100"
              >
                <div className="bg-hijau-600 text-white font-bold text-base w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                  {index + 1}
                </div>
                <p className="text-teks-sekunder text-base leading-relaxed">{tips}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Troubleshoot */}
        <div>
          <h3 className="text-2xl font-bold text-hijau-800 mb-6 flex items-center gap-2">
            <div className="bg-tanah-100 p-2 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-tanah-400" />
            </div>
            Masalah Umum & Solusinya
          </h3>
          <div className="flex flex-col gap-4">
            {data.troubleshoot.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-hijau-100 shadow-sm overflow-hidden"
              >
                <div className="bg-tanah-100 px-5 py-4 border-b border-tanah-200 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-tanah-400 shrink-0" />
                  <h4 className="font-bold text-teks-utama text-lg">{item.masalah}</h4>
                </div>
                <div className="p-5 flex flex-col gap-4">
                  <div>
                    <div className="text-sm font-bold text-teks-ringan uppercase tracking-wide mb-1">
                      Penyebab
                    </div>
                    <p className="text-teks-sekunder text-base leading-relaxed">{item.penyebab}</p>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-hijau-600 uppercase tracking-wide mb-1">
                      Solusi
                    </div>
                    <p className="text-teks-sekunder text-base leading-relaxed">{item.solusi}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}