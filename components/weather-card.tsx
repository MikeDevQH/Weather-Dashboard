"use client"

import { motion } from "framer-motion"
import {
  Thermometer,
  Droplets,
  Wind,
  Eye,
  Gauge,
  Sun,
  Sunrise,
  Sunset,
  Navigation,
} from "lucide-react"
import type { CurrentWeather } from "@/lib/types"
import { getWeatherDescription, getWeatherDescriptionEn } from "@/lib/openmeteo"
import { useLanguage } from "@/lib/languageContext"
import UVIndexGauge from "./uv-index-gauge"

interface WeatherCardProps {
  weather: CurrentWeather
  cityName: string
  countryName: string
}

export default function WeatherCard({ weather, cityName, countryName }: WeatherCardProps) {
  const { language, t } = useLanguage()

  const description =
    language === "es"
      ? getWeatherDescription(weather.weatherCode)
      : getWeatherDescriptionEn(weather.weatherCode)

  const getWindDirection = (deg: number) => {
    const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
    return dirs[Math.round(deg / 45) % 8]
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl bg-linear-to-br from-sky-400/90 via-blue-500/80 to-indigo-600/90 text-white p-6 md:p-8 shadow-xl"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4 blur-2xl" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-medium opacity-90">{cityName}</h2>
            <p className="text-sm opacity-70">{countryName}</p>
            <p className="text-sm opacity-60 mt-1 capitalize">{description}</p>
          </div>
          <div className="text-right">
            <span className="text-6xl md:text-7xl font-bold tracking-tighter">
              {Math.round(weather.temperature)}
              <span className="text-3xl align-top">°</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatItem icon={<Thermometer className="h-4 w-4" />} label={t("feelsLike")} value={`${Math.round(weather.feelsLike)}°`} />
          <StatItem icon={<Droplets className="h-4 w-4" />} label={t("humidity")} value={`${weather.humidity}%`} />
          <StatItem icon={<Wind className="h-4 w-4" />} label={t("wind")} value={`${Math.round(weather.windSpeed)} km/h`} />
          <StatItem icon={<Eye className="h-4 w-4" />} label={t("visibility")} value={`${(weather.visibility / 1000).toFixed(1)} km`} />
          <StatItem icon={<Gauge className="h-4 w-4" />} label={t("pressure")} value={`${Math.round(weather.pressure)} hPa`} />
          <StatItem icon={<Navigation className="h-4 w-4" style={{ transform: `rotate(${weather.windDirection}deg)` }} />} label={t("windDirection")} value={getWindDirection(weather.windDirection)} />
          <StatItem icon={<Sunrise className="h-4 w-4" />} label={t("sunrise")} value="--:--" />
          <StatItem icon={<Sunset className="h-4 w-4" />} label={t("sunset")} value="--:--" />
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Sun className="h-4 w-4" />
            <span className="text-sm font-medium">{t("uvIndex")}</span>
          </div>
          <UVIndexGauge uvIndex={weather.uvIndex} />
        </div>
      </div>
    </motion.div>
  )
}

function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3">
      <div className="opacity-70">{icon}</div>
      <div>
        <p className="text-xs opacity-60">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  )
}
