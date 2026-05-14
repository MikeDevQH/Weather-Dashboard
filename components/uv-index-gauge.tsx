"use client"

import { useLanguage } from "@/lib/languageContext"

interface UVIndexGaugeProps {
  uvIndex: number
}

export default function UVIndexGauge({ uvIndex }: UVIndexGaugeProps) {
  const { t } = useLanguage()

  const getLevel = (uv: number) => {
    if (uv <= 2) return { label: t("low"), color: "#22c55e", width: "15%" }
    if (uv <= 5) return { label: t("moderateLevel"), color: "#eab308", width: "40%" }
    if (uv <= 7) return { label: t("high"), color: "#f97316", width: "65%" }
    if (uv <= 10) return { label: t("veryHigh"), color: "#ef4444", width: "85%" }
    return { label: t("extreme"), color: "#a855f7", width: "100%" }
  }

  const level = getLevel(uvIndex)

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-bold">{Math.round(uvIndex)}</span>
        <span className="text-sm font-medium" style={{ color: level.color }}>
          {level.label}
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: level.width, backgroundColor: level.color }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>0</span>
        <span>2</span>
        <span>5</span>
        <span>7</span>
        <span>10</span>
        <span>11+</span>
      </div>
    </div>
  )
}
