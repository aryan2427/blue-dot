"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Leaflet's default marker icons break in Next.js without this fix
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

// ─── Hotspot Data ─────────────────────────────────────────────────────────────

const MARKERS = [
  {
    position: [20.8444, 85.1511] as [number, number],
    name: "Angul",
    candidates: 620,
    jobs: 110,
  },
  {
    position: [20.95, 85.2333] as [number, number],
    name: "Talcher",
    candidates: 420,
    jobs: 80,
  },
  {
    position: [20.7833, 84.9167] as [number, number],
    name: "Banarpal",
    candidates: 180,
    jobs: 34,
  },
  {
    position: [20.6167, 84.9] as [number, number],
    name: "Athamallik",
    candidates: 95,
    jobs: 18,
  },
  {
    position: [21.05, 85.1] as [number, number],
    name: "Nalco Township",
    candidates: 310,
    jobs: 72,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function LeafletMap() {
  return (
    <MapContainer
      center={[20.8444, 85.1511]}
      zoom={10}
      style={{ height: "520px", width: "100%" }}
      className="rounded-2xl z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {MARKERS.map((m) => (
        <Marker key={m.name} position={m.position}>
          <Popup>
            <div className="text-sm">
              <p className="font-bold text-gray-900 mb-1">{m.name}</p>
              <p className="text-gray-600">{m.candidates} Active Candidates</p>
              <p className="text-gray-600">{m.jobs} Open Jobs</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
