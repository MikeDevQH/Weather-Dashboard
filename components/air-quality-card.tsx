"use client"

import { Wind } from "lucide-react"
import type { AirQuality } from "@/lib/types"
import { useLanguage } from "@/lib/languageContext"

interface AirQualityCardProps {
  airQuality: AirQuality
}

export default function AirQualityCard({ airQuality }: AirQualityCardProps) {
  const { t } = useLanguage()
  const aqi = airQuality.usAqi ?? airQuality.europeanAqi ?? 0

  const getLevel = (value: number) => {
    if (value <= 50) return { label: t("good"), color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" }
    if (value <= 100) return { label: t("moderate"), color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" }
    if (value <= 150) return { label: t("unhealthySensitive"), color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" }
    if (value <= 200) return { label: t("unhealthy"), color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" }
    if (value <= 300) return { label: t("veryUnhealthy"), color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" }
    return { label: t("hazardous"), color: "text-rose-600", bg: "bg-rose-600/10", border: "border-rose-600/20" }
  }

  const level = getLevel(aqi)

  return (
    <div className={`rounded-2xl border ${level.border} ${level.bg} p-5 backdrop-blur-sm`}>
      <div className="flex items-center gap-2 mb-3">
        <Wind className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-sm font-semibold">{t("airQuality")}</h3>
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-3xl font-bold">{aqi}</span>
        <span className={`text-sm font-medium ${level.color}`}>{level.label}</span>
      </div>
      <p className="text-xs text-muted-foreground mb-4">US AQI</p>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex justify-between">
          <span className="text-muted-foreground">PM2.5</span>
          <span className="font-medium">{Math.round(airQuality.pm2_5)} µg/m³</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">PM10</span>
          <span className="font-medium">{Math.round(airQuality.pm10)} µg/m³</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">NO₂</span>
          <span className="font-medium">{Math.round(airQuality.nitrogenDioxide)} µg/m³</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">O₃</span>
          <span className="font-medium">{Math.round(airQuality.ozone)} µg/m³</span>
        </div>
      </div>
    </div>
  )
}
