"use client";

import dynamic from "next/dynamic";

const AngulMap = dynamic(() => import("@/components/map/AngulMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[480px] flex items-center justify-center text-gray-400 text-sm">
      Loading map…
    </div>
  ),
});

export default function MapWrapper() {
  return <AngulMap />;
}