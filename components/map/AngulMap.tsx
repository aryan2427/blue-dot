"use client";

import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Must be imported after leaflet/dist/leaflet.css
import L from "leaflet";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const hotspots = [
  { id: 1, name: "Angul",      position: [20.8444, 85.1511] as [number, number], candidates: 620, jobs: 110 },
  { id: 2, name: "Talcher",    position: [20.9500, 85.2333] as [number, number], candidates: 420, jobs: 80  },
  { id: 3, name: "Athamallik", position: [20.6175, 84.8673] as [number, number], candidates: 180, jobs: 28  },
  { id: 4, name: "Banarpal",   position: [20.9833, 85.0833] as [number, number], candidates: 140, jobs: 35  },
  { id: 5, name: "Pallahara",  position: [21.1167, 85.1500] as [number, number], candidates: 120, jobs: 22  },
  { id: 6, name: "Kaniha",     position: [20.9000, 85.1667] as [number, number], candidates: 96,  jobs: 44  },
];

type Filter = "All" | "Candidates" | "Jobs";

export default function AngulMap() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);

  const filtered = hotspots.filter((s) => {
    if (activeFilter === "Candidates") return s.candidates > 0;
    if (activeFilter === "Jobs") return s.jobs > 0;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">

        {/* Header */}
        <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">District Heatmap</h2>
            <p className="text-gray-500 mt-1 text-sm">
              Click a marker for details.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
            {(["All", "Candidates", "Jobs"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeFilter === f
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="rounded-2xl overflow-hidden border border-gray-100">
          <MapContainer
            center={[20.8444, 85.1511]}
            zoom={10}
            style={{ height: "480px", width: "100%" }}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />

            {filtered.map((spot) => (
              <Marker
                key={spot.id}
                position={spot.position}
                eventHandlers={{ click: () => setSelectedSpot(spot.id) }}
              >
                <Popup>
                  <div style={{ minWidth: 140 }}>
                    <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
                      {spot.name}
                    </p>
                    <p style={{ fontSize: 13, color: "#555", marginBottom: 2 }}>
                      👤 {spot.candidates} candidates
                    </p>
                    <p style={{ fontSize: 13, color: "#555" }}>
                      💼 {spot.jobs} open jobs
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 mt-4">
          {hotspots.map((spot) => (
            <div
              key={spot.id}
              className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm cursor-pointer transition-all ${
                selectedSpot === spot.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
              }`}
              onClick={() =>
                setSelectedSpot(selectedSpot === spot.id ? null : spot.id)
              }
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
              <span className="font-medium text-gray-800">{spot.name}</span>
              <span className="text-gray-400">{spot.candidates + spot.jobs}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}