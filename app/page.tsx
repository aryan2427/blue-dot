import Hero from "@/components/Landing/Hero";
import Navbar from "@/components/Landing/Navbar";
import StatsCards from "@/components/Landing/StatsCards";
import MapWrapper from "@/components/map/MapWrapper";
import AIChatPopup from "@/components/AIChatPopup";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <StatsCards />
      <MapWrapper />

      {/* AI Popup */}
      <AIChatPopup />
    </div>
  );
}