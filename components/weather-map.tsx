"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import "leaflet/dist/leaflet.css"

const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false })

const LAYERS = [
  { id: "temp", name: "Temperatura", url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" },
]

export default function WeatherMap() {
  const [activeLayer] = useState("temp")
  const layer = LAYERS.find((l) => l.id === activeLayer) || LAYERS[0]

  return (
    <div className="rounded-2xl border border-border overflow-hidden shadow-sm bg-card">
      <div className="relative w-full h-[400px] md:h-[500px]">
        <MapContainer
          style={{ height: "100%", width: "100%" }}
          center={[20, -100]}
          zoom={4}
          zoomControl={false}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={layer.url}
          />
        </MapContainer>
      </div>
    </div>
  )
}
