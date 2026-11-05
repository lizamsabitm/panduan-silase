import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import TombolKembaliKeAtas from "@/components/TombolKembaliKeAtas";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "PanduanSilase",
  description: "Panduan lengkap pembuatan pakan silase untuk ternak ruminansia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${geist.variable} font-sans bg-background text-teks-utama`}>
        <Navbar />
        {children}
        <TombolKembaliKeAtas />
      </body>
    </html>
  );
}