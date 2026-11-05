import { Package, Leaf, Heart, Coins, CheckCircle } from "lucide-react";

const daftarTanaman = {
  "Hijauan Rumput": [
    { nama: "Rumput Gajah", rekomendasi: true },
    { nama: "Rumput Raja", rekomendasi: true },
    { nama: "Rumput Odot", rekomendasi: true },
    { nama: "Rumput Lapangan", rekomendasi: false },
    { nama: "Alang-alang", rekomendasi: false },
  ],
  "Tanaman Legum": [
    { nama: "Indigofera", rekomendasi: false },
    { nama: "Gamal", rekomendasi: false },
    { nama: "Turi", rekomendasi: false },
    { nama: "Kaliandra", rekomendasi: false },
    { nama: "Daun Dadap", rekomendasi: false },
    { nama: "Daun Akasia", rekomendasi: false },
    { nama: "Sengon Putih", rekomendasi: false },
  ],
  "Limbah Tanaman Pangan": [
    { nama: "Jerami (Tebon) Jagung", rekomendasi: true },
    { nama: "Tongkol Jagung", rekomendasi: false },
    { nama: "Klobot Jagung", rekomendasi: false },
    { nama: "Jerami Padi Kering", rekomendasi: false },
    { nama: "Jerami Kedelai", rekomendasi: false },
    { nama: "Jerami Kacang Tanah", rekomendasi: false },
    { nama: "Daun Ubi Jalar", rekomendasi: false },
    { nama: "Daun Ubi Kayu", rekomendasi: false },
  ],
  "Tanaman Lainnya": [
    { nama: "Kangkung", rekomendasi: false },
    { nama: "Batang Pisang", rekomendasi: false },
    { nama: "Bonggol Pisang", rekomendasi: false },
    { nama: "Daun Pisang", rekomendasi: false },
    { nama: "Daun Kopi", rekomendasi: false },
    { nama: "Kulit Biji Kopi", rekomendasi: false },
    { nama: "Daun Jati Kering", rekomendasi: false },
    { nama: "Daun Berru", rekomendasi: false },
  ],
};

const manfaat = [
  {
    icon: Package,
    judul: "Stok Pakan Tahan Lama",
    deskripsi: "Silase bisa disimpan hingga 4–7 bulan, cocok untuk stok pakan di musim kemarau.",
  },
  {
    icon: Leaf,
    judul: "Nutrisi Terjaga",
    deskripsi: "Kandungan nutrisi hijauan lebih terjaga dibanding pakan kering yang dijemur.",
  },
  {
    icon: Heart,
    judul: "Disukai Ternak",
    deskripsi: "Aroma asam segar seperti tape meningkatkan nafsu makan ternak.",
  },
  {
    icon: Coins,
    judul: "Hemat Biaya",
    deskripsi: "Memanfaatkan hijauan yang melimpah di musim hujan untuk stok saat paceklik.",
  },
];

const jenisTermak = [
  { nama: "Sapi Potong & Perah", icon: "/icons/sapi.svg" },
  { nama: "Kambing", icon: "/icons/kambing.svg" },
  { nama: "Domba", icon: "/icons/domba.svg" },
  { nama: "Kerbau", icon: "/icons/kerbau.svg" },
];

export default function SeksiPengenalan() {
  return (
    <section id="pengenalan" className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-hijau-100 text-hijau-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Mengenal Silase
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-hijau-900 mb-4">
            Apa itu Pakan Silase?
          </h2>
          <p className="text-lg text-teks-sekunder max-w-2xl mx-auto leading-relaxed">
            Silase adalah pakan ternak yang dibuat dari hijauan segar yang
            difermentasi secara anaerob (tanpa oksigen) di dalam wadah tertutup
            rapat. Proses fermentasi mengubah gula alami tanaman menjadi asam
            laktat — pengawet alami yang menjaga kualitas pakan hingga berbulan-bulan.
          </p>
        </div>

        {/* Manfaat */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-hijau-800 mb-6 text-center">
            Manfaat Membuat Silase
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {manfaat.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.judul}
                  className="bg-hijau-50 rounded-2xl p-5 flex gap-4 items-start"
                >
                  <div className="bg-hijau-100 text-hijau-600 p-2.5 rounded-xl shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-hijau-800 text-lg mb-1">
                      {item.judul}
                    </div>
                    <div className="text-teks-sekunder text-base leading-relaxed">
                      {item.deskripsi}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Jenis ternak */}
<div className="mb-16">
  <h3 className="text-2xl font-bold text-hijau-800 mb-6 text-center">
    Cocok untuk Ternak Apa Saja?
  </h3>
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
  {jenisTermak.map((item) => (
    <div
      key={item.nama}
      className="bg-white border-2 border-hijau-100 rounded-2xl p-4 text-center shadow-sm hover:border-hijau-300 transition-colors"
    >
      <div className="w-24 h-24 mx-auto mb-3 bg-hijau-50 rounded-xl flex items-center justify-center p-4">
        <img
          src={item.icon}
          alt={item.nama}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="font-semibold text-hijau-800 text-base leading-tight">
        {item.nama}
      </div>
    </div>
  ))}
</div>
</div>

        {/* Daftar tanaman */}
        <div>
          <h3 className="text-2xl font-bold text-hijau-800 mb-2 text-center">
            Tanaman yang Bisa Digunakan
          </h3>
          <p className="text-teks-sekunder text-center mb-8 text-base">
            Silase bisa dibuat dari banyak jenis tanaman. Panduan ini fokus pada
            4 bahan yang paling direkomendasikan{" "}
            <span className="inline-flex items-center gap-1 bg-hijau-100 text-hijau-700 text-sm font-semibold px-2 py-0.5 rounded-full">
              <CheckCircle className="w-3.5 h-3.5" /> Rekomendasi
            </span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(daftarTanaman).map(([kategori, tanaman]) => (
              <div
                key={kategori}
                className="bg-surface rounded-2xl p-5 border border-hijau-100"
              >
                <h4 className="font-bold text-hijau-700 text-base mb-3 pb-2 border-b border-hijau-100">
                  {kategori}
                </h4>
                <ul className="flex flex-col gap-2">
                  {tanaman.map((t) => (
                    <li
                      key={t.nama}
                      className="flex items-center gap-2 text-base"
                    >
                      {t.rekomendasi ? (
                        <CheckCircle className="w-4 h-4 text-hijau-500 shrink-0" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-hijau-200 shrink-0 ml-1" />
                      )}
                      <span className={t.rekomendasi ? "font-semibold text-hijau-800" : "text-teks-sekunder"}>
                        {t.nama}
                      </span>
                      {t.rekomendasi && (
                        <span className="ml-auto text-xs bg-hijau-100 text-hijau-700 font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                          Rekomendasi
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}