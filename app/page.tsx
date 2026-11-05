import HeroBeranda from "@/components/HeroBeranda";
import SeksiPengenalan from "@/components/SeksiPengenalan";
import SeksiPanduan from "@/components/SeksiPanduan";
import SeksiTips from "@/components/SeksiTips";
import SeksiFAQ from "@/components/SeksiFAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroBeranda />
      <SeksiPengenalan />
      <SeksiPanduan />
      <SeksiTips />
      <SeksiFAQ />
      <Footer />
    </main>
  );
}