"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

export default function AngulMap() {
  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">District Heatmap</h2>
          <p className="text-gray-500 mt-2">
            Bubble size shows volume. Click a hotspot for details.
          </p>
        </div>

        <MapContainer
          center={[20.8444, 85.1511]}
          zoom={11}
          style={{ height: "600px", width: "100%" }}
          className="rounded-2xl z-0"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[20.8444, 85.1511]}>
            <Popup>
              <div>
                <h3 className="font-bold">Angul</h3>
                <p>620 Active Candidates</p>
                <p>110 Open Jobs</p>
              </div>
            </Popup>
          </Marker>

          <Marker position={[20.9500, 85.2333]}>
            <Popup>
              <div>
                <h3 className="font-bold">Talcher</h3>
                <p>420 Active Candidates</p>
                <p>80 Open Jobs</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}