"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import faqData from "@/data/faq.json";

type FAQ = {
  pertanyaan: string;
  jawaban: string;
};

export default function SeksiFAQ() {
  const [terbuka, setTerbuka] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-surface py-16">
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-hijau-100 text-hijau-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-hijau-900 mb-4">
            Pertanyaan yang Sering Ditanyakan
          </h2>
          <p className="text-lg text-teks-sekunder max-w-2xl mx-auto leading-relaxed">
            Temukan jawaban atas pertanyaan umum seputar pembuatan dan
            penggunaan pakan silase.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {(faqData as FAQ[]).map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-hijau-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setTerbuka(terbuka === index ? null : index)}
                className="w-full text-left px-5 py-5 flex items-center justify-between gap-4"
              >
                <span className="font-semibold text-hijau-800 text-lg leading-snug">
                  {item.pertanyaan}
                </span>
                <div className="bg-hijau-50 rounded-lg p-1 shrink-0">
                  {terbuka === index
                    ? <Minus className="w-5 h-5 text-hijau-600" />
                    : <Plus className="w-5 h-5 text-hijau-600" />
                  }
                </div>
              </button>

              {terbuka === index && (
                <div className="px-5 pb-5">
                  <div className="border-t border-hijau-50 pt-4">
                    <div className="text-teks-sekunder text-base leading-relaxed flex flex-col gap-1">
  {item.jawaban.split('\n').map((baris, i) => (
    <span key={i}>{baris}</span>
  ))}
</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}