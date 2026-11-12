"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import { Download } from "lucide-react";

type BahanBaku = {
  id: string;
  nama: string;
  bk: number;
  pk: number;
  sk: number;
  tdn: number;
};

type Props = {
  bahanDipilih: BahanBaku | null;
  beratHijauan: number | null;
  dedak: number | null;
  molases: number | null;
  langkahData: { langkah: number; judul: string; deskripsi: string }[];
};

export default function UnduhPDF({
  bahanDipilih,
  beratHijauan,
  dedak,
  molases,
  langkahData,
}: Props) {
  const [loading, setLoading] = useState(false);

  const alatAlat = [
    { nama: "Timbangan", fungsi: "Mengukur bahan-bahan dengan akurat" },
    { nama: "Alat Pencacah / Gunting", fungsi: "Memotong bahan baku menjadi ukuran 2-5 cm" },
    { nama: "Wadah Fermentasi", fungsi: "Drum, gentong, atau plastik silase yang bisa ditutup rapat kedap udara. Jika menggunakan plastik, pastikan berkode 2 (HDPE), 4 (LDPE), atau 5 (PP). Jangan gunakan wadah bekas cat atau bahan kimia." },
    { nama: "Terpal", fungsi: "Alas untuk mencampur semua bahan" },
    { nama: "Sekop", fungsi: "Untuk mencampur dan mengambil campuran pakan (opsional)" },
    { nama: "Vakum", fungsi: "Memastikan tidak ada udara masuk jika menggunakan plastik silase (opsional)" },
    { nama: "Alat Pengukur pH Tanah", fungsi: "Mengukur pH pakan setelah fermentasi selesai (ideal: 4-5)" },
  ];

  const indikatorBerhasil = [
    "Warna masih mirip dengan aslinya, tidak berubah drastis",
    "Beraroma asam segar seperti tape, tidak berbau busuk",
    "Tidak berjamur",
    "Tingkat keasaman (pH) 4-5",
    "Tekstur agak lembab, tidak kering dan tidak terlalu basah",
    "Tidak ada genangan cairan di wadah",
  ];

  const indikatorGagal = [
    "Warna berubah drastis menjadi cokelat tua atau hitam gosong",
    "Mengeluarkan bau busuk tajam seperti telur busuk atau kotoran",
    "Berjamur luas",
    "Tekstur lembek, berlendir, menggumpal, dan lengket",
  ];

  const aturanPenyimpanan = [
    "Proses fermentasi berlangsung selama 21 hari - jangan dibuka sebelum waktunya",
    "Simpan di tempat teduh dan kering",
    "Letakkan wadah di atas alas (misalnya papan kayu), jangan langsung ditanah",
    "Jauhkan dari hujan, genangan air, dan sinar matahari langsung",
    "Jauhkan dari hewan pengganggu seperti tikus dan ayam",
    "Silase tertutup rapat bisa disimpan hingga 4-7 bulan",
  ];

  const aturanPenggunaan = [
    "Setelah 21 hari, silase dapat dibuka dan langsung diberikan ke ternak",
    "Silase yang sudah dibuka harus dihabiskan dalam satu hari",
    "Jangan buka silase jika tidak akan langsung diberikan ke ternak",
    "Jangan berikan silase yang sudah berjamur, berbau busuk, atau berubah warna hitam/cokelat tua",
    "Pastikan selalu tersedia air minum bersih yang cukup karena silase bersifat asam",
  ];

  const handleUnduh = async () => {
    if (!bahanDipilih) {
      alert("Pilih bahan baku terlebih dahulu sebelum mengunduh panduan.");
      return;
    }
    if (!beratHijauan || beratHijauan <= 0) {
      alert("Isi kalkulator dengan berat hijauan terlebih dahulu sebelum mengunduh panduan.");
      return;
    }

    setLoading(true);

    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const marginKiri = 20;
    const marginKanan = 20;
    const lebarHalaman = 210;
    const lebarKonten = lebarHalaman - marginKiri - marginKanan;
    const tinggiHalaman = 297;
    const batasHalaman = tinggiHalaman - 25;
    let y = 25;
    let halamanSekarang = 1;

    const tanggal = new Date().toLocaleDateString("id-ID", {
      day: "numeric", month: "long", year: "numeric",
    });

    const kolomTakaran = [
      ["Bahan", "Takaran", "Keterangan"],
      [bahanDipilih.nama, `${beratHijauan} kg`, "Bahan baku utama"],
      ["Dedak", `${dedak} kg`, "10% dari berat hijauan"],
      ["Molases", `${molases} kg`, "1% dari berat hijauan"],
    ];
    const lebarKolomTakaran = [70, 40, 60];

    // =====================
    // FUNGSI UTILITAS
    // =====================
    const tambahHeader = () => {
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100);
      doc.text("PanduanSilase", marginKiri, 10);
      doc.text(tanggal, lebarHalaman - marginKanan, 10, { align: "right" });
      doc.setDrawColor(180);
      doc.line(marginKiri, 13, lebarHalaman - marginKanan, 13);
    };

    const tambahFooter = (halamanKe: number, totalHalaman: number) => {
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100);
      doc.setDrawColor(180);
      doc.line(marginKiri, tinggiHalaman - 12, lebarHalaman - marginKanan, tinggiHalaman - 12);
      doc.text("PanduanSilase", marginKiri, tinggiHalaman - 7);
      doc.text(
        `Halaman ${halamanKe} dari ${totalHalaman}`,
        lebarHalaman - marginKanan,
        tinggiHalaman - 7,
        { align: "right" }
      );
    };

    const halamanBaru = () => {
      doc.addPage();
      halamanSekarang++;
      y = 25;
      tambahHeader();
    };

    const cekHalaman = (tinggiDibutuhkan: number) => {
      if (y + tinggiDibutuhkan > batasHalaman) {
        halamanBaru();
      }
    };

    const garisPemisah = () => {
      doc.setDrawColor(180);
      doc.line(marginKiri, y, lebarHalaman - marginKanan, y);
      y += 6;
    };

    const tulisJudul = (teks: string, ukuran: number = 13) => {
      cekHalaman(12);
      doc.setFontSize(ukuran);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0);
      doc.text(teks, marginKiri, y);
      y += 7;
    };

    const tulisTeks = (teks: string, indent: number = 0, ukuran: number = 10, tebal: boolean = false) => {
      doc.setFontSize(ukuran);
      doc.setFont("helvetica", tebal ? "bold" : "normal");
      doc.setTextColor(tebal ? 0 : 60);
      const baris = doc.splitTextToSize(teks, lebarKonten - indent);
      cekHalaman(baris.length * 4.5 + 3);
      doc.text(baris, marginKiri + indent, y);
      y += baris.length * 4.5 + 3;
    };

    const tabelBaris = (
      baris: string[],
      lebarKolom: number[],
      isHeader: boolean,
      yPos: number
    ) => {
      doc.setFont("helvetica", isHeader ? "bold" : "normal");
      doc.setFontSize(10);
      doc.setFillColor(isHeader ? 230 : 255, isHeader ? 230 : 255, isHeader ? 230 : 255);
      doc.setDrawColor(180);
      doc.rect(marginKiri, yPos, lebarKonten, 7, isHeader ? "FD" : "S");
      doc.setTextColor(0);
      let x = marginKiri + 2;
      baris.forEach((sel, j) => {
        const wrapped = doc.splitTextToSize(sel, lebarKolom[j] - 3);
        doc.text(wrapped[0], x, yPos + 5);
        x += lebarKolom[j];
      });
    };

    // =====================
    // HALAMAN 1 — COVER
    // =====================
    tambahHeader();

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text("Panduan Pembuatan Pakan Silase", lebarHalaman / 2, y, { align: "center" });
    y += 8;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80);
    doc.text(
      "Panduan lengkap pembuatan pakan fermentasi untuk ternak ruminansia",
      lebarHalaman / 2, y, { align: "center" }
    );
    y += 10;

    garisPemisah();

    // Info bahan baku
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text("Bahan Baku yang Digunakan", marginKiri, y);
    y += 6;

    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.text(bahanDipilih.nama, marginKiri, y);
    y += 10;

    // Tabel uji lab
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text("Hasil Uji Laboratorium", marginKiri, y);
    y += 5;

    const kolomUjiLab = [
      ["Kandungan", "Keterangan", "Nilai (% BK)"],
      ["BK", "Bahan Kering", `${bahanDipilih.bk}%`],
      ["PK", "Protein Kasar", `${bahanDipilih.pk}%`],
      ["SK", "Serat Kasar", `${bahanDipilih.sk}%`],
      ["TDN", "Total Digestible Nutrients (Kecernaan)", `${bahanDipilih.tdn}%`],
    ];
    const lebarKolomUjiLab = [25, 110, 40];

    kolomUjiLab.forEach((baris, i) => {
      tabelBaris(baris, lebarKolomUjiLab, i === 0, y);
      y += 7;
    });

    y += 8;
    garisPemisah();

    // Tabel takaran
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text("Hasil Kalkulator Takaran", marginKiri, y);
    y += 5;

    kolomTakaran.forEach((baris, i) => {
      tabelBaris(baris, lebarKolomTakaran, i === 0, y);
      y += 7;
    });

    y += 8;

    // =====================
    // ALAT
    // =====================
    cekHalaman(20);
    garisPemisah();
    tulisJudul("Alat yang Dibutuhkan");

    alatAlat.forEach((alat) => {
      cekHalaman(16);
      tulisTeks(alat.nama, 3, 10, true);
      y -= 2;
      tulisTeks(alat.fungsi, 3, 9, false);
    });

    // =====================
    // LANGKAH PEMBUATAN
    // =====================
    cekHalaman(20);
    garisPemisah();
    tulisJudul("Langkah-Langkah Pembuatan");

    langkahData.forEach((item) => {
      cekHalaman(20);

      // Langkah 5 — tampilkan judul + tabel takaran
      if (item.judul === "Hitung takaran molases dan dedak") {
        cekHalaman(50);

        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0);
        doc.text(`${item.langkah}. ${item.judul}`, marginKiri, y);
        y += 5;

        const deskripsi = item.deskripsi.replace(/\{bahanBaku\}/g, bahanDipilih.nama);
        tulisTeks(deskripsi, 3, 9);

        // Tabel takaran
        doc.setFontSize(9);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(80);
        doc.text("Takaran berdasarkan hasil kalkulator:", marginKiri + 3, y);
        y += 5;

        kolomTakaran.forEach((baris, i) => {
        tabelBaris(baris, lebarKolomTakaran, i === 0, y);
        y += 7;
        });

        y += 10;
        return;
      }

      // Langkah lainnya
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0);
      doc.text(`${item.langkah}. ${item.judul}`, marginKiri, y);
      y += 5;

      const deskripsi = item.deskripsi.replace(/\{bahanBaku\}/g, bahanDipilih.nama);
      tulisTeks(deskripsi, 3, 9);
    });

    // =====================
    // CEK HASIL
    // =====================
    cekHalaman(20);
    garisPemisah();
    tulisJudul("Cara Mengecek Hasil Fermentasi");

    const lebarKolomCek = (lebarKonten / 2) - 3;

    cekHalaman(40);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text("Silase Berhasil", marginKiri, y);
    doc.text("Silase Gagal", marginKiri + lebarKonten / 2 + 3, y);
    y += 5;

    const maxBaris = Math.max(indikatorBerhasil.length, indikatorGagal.length);
    for (let i = 0; i < maxBaris; i++) {
      cekHalaman(10);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(0);

      let tinggiMaks = 5;

      if (indikatorBerhasil[i]) {
        const baris = doc.splitTextToSize(`- ${indikatorBerhasil[i]}`, lebarKolomCek);
        doc.text(baris, marginKiri, y);
        tinggiMaks = Math.max(tinggiMaks, baris.length * 4.5);
      }
      if (indikatorGagal[i]) {
        const baris = doc.splitTextToSize(`- ${indikatorGagal[i]}`, lebarKolomCek);
        doc.text(baris, marginKiri + lebarKonten / 2 + 3, y);
        tinggiMaks = Math.max(tinggiMaks, baris.length * 4.5);
      }
      y += tinggiMaks + 2;
    }

    // =====================
    // PENYIMPANAN
    // =====================
    y += 3;
    cekHalaman(20);
    garisPemisah();
    tulisJudul("Cara Penyimpanan");

    aturanPenyimpanan.forEach((item) => {
      cekHalaman(8);
      tulisTeks(`- ${item}`, 3, 10);
    });

    // =====================
    // PEMBERIAN KE TERNAK
    // =====================
    y += 3;
    cekHalaman(20);
    garisPemisah();
    tulisJudul("Cara Pemberian ke Ternak");

    aturanPenggunaan.forEach((item) => {
      cekHalaman(8);
      tulisTeks(`- ${item}`, 3, 10);
    });

    // =====================
    // FOOTER SEMUA HALAMAN
    // =====================
    const totalHalaman = doc.getNumberOfPages();
    for (let i = 1; i <= totalHalaman; i++) {
      doc.setPage(i);
      tambahFooter(i, totalHalaman);
    }

    const namaBahan = bahanDipilih.nama.toLowerCase().replace(/ /g, "-").replace(/[()]/g, "");
    doc.save(`panduan-silase-${namaBahan}.pdf`);
    setLoading(false);
  };

  return (
    <button
      onClick={handleUnduh}
      disabled={loading}
      className="bg-hijau-600 hover:bg-hijau-700 disabled:bg-hijau-300 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors shadow-md inline-flex items-center gap-2"
    >
      <Download className="w-5 h-5" />
      {loading ? "Menyiapkan PDF..." : "Unduh Panduan (PDF)"}
    </button>
  );
}