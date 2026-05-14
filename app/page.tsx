"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { MapPin, Loader2, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

import WeatherCard from "@/components/weather-card"
import ForecastChart from "@/components/forecast-chart"
import DailyForecast from "@/components/daily-forecast"
import AirQualityCard from "@/components/air-quality-card"
import SearchCity from "@/components/search-city"
import WeatherMap from "@/components/weather-map"

import { getWeatherData } from "@/lib/openmeteo"
import { reverseGeocode } from "@/lib/geocoding"
import { useLanguage } from "@/lib/languageContext"
import type { WeatherData, GeocodingResult } from "@/lib/types"

export default function Home() {
  const { t } = useLanguage()
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null)
  const initialized = useRef(false)

  const fetchWeather = useCallback(async (lat: number, lon: number) => {
    setLoading(true)
    setError(null)
    try {
      const [data, geo] = await Promise.all([
        getWeatherData(lat, lon),
        reverseGeocode(lat, lon),
      ])
      data.cityName = geo.city
      data.countryName = geo.country
      setWeather(data)
      setLocation({ lat, lon })
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }, [])

  const handleCitySelect = useCallback(
    (city: GeocodingResult) => {
      fetchWeather(city.latitude, city.longitude)
    },
    [fetchWeather]
  )

  const handleUseLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError(t("locationPermissionDenied"))
      setLoading(false)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
      () => {
        setError(t("locationPermissionDenied"))
        setLoading(false)
      }
    )
  }, [fetchWeather, t])

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    handleUseLocation()
  }, [handleUseLocation])

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-12 md:px-6 md:pt-28 md:pb-16">
      <div className="mb-8 space-y-4">
        <SearchCity onCitySelect={handleCitySelect} />

        <div className="flex justify-center">
          <button
            onClick={handleUseLocation}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <MapPin className="h-3.5 w-3.5" />
            {t("useLocation")}
          </button>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center mb-8"
        >
          <p className="text-destructive mb-3">{error}</p>
          <button
            onClick={() => location && fetchWeather(location.lat, location.lon)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            {t("retry")}
          </button>
        </motion.div>
      )}

      {loading && !weather && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-muted-foreground text-sm">{t("loading")}</p>
        </div>
      )}

      {weather && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Main Weather Card */}
          <WeatherCard
            weather={weather.current}
            cityName={weather.cityName || "Ubicaci\u00f3n actual"}
            countryName={weather.countryName || ""}
          />

          {/* Forecast Charts */}
          <ForecastChart hourly={weather.hourly} />

          {/* Bento Grid: Daily + Air Quality + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DailyForecast daily={weather.daily} />

            <div className="space-y-6">
              {weather.airQuality && <AirQualityCard airQuality={weather.airQuality} />}
              <WeatherMap />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
