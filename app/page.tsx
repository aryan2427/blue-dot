"use client";

import { useState } from "react";

import Hero from "@/components/Landing/Hero";
import Navbar from "@/components/Landing/Navbar";
import StatsCards from "@/components/Landing/StatsCards";
import MapWrapper from "@/components/map/MapWrapper";

import ChatSidebar from "@/components/ChatSidebar";

export default function Home() {

  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* MAIN WEBSITE */}
      <div
        className={`
          transition-all duration-300 ease-in-out
          overflow-y-auto
          ${isChatOpen ? "w-[calc(100%-400px)]" : "w-full"}
        `}
      >

        {/* PASS PROP HERE */}
        <Navbar setIsChatOpen={setIsChatOpen} />

        <Hero />

        <StatsCards />

        <MapWrapper />

      </div>

      {/* CHAT SIDEBAR */}
      <ChatSidebar
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

    </div>
  );
}