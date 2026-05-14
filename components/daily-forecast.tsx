"use client"

import { motion } from "framer-motion"
import { format } from "date-fns"
import { es, enUS } from "date-fns/locale"
import { Droplets, Wind } from "lucide-react"
import type { DailyForecast } from "@/lib/types"
import { getWeatherDescription, getWeatherDescriptionEn } from "@/lib/openmeteo"
import { useLanguage } from "@/lib/languageContext"

interface DailyForecastProps {
  daily: DailyForecast
}

export default function DailyForecast({ daily }: DailyForecastProps) {
  const { language, t } = useLanguage()
  const locale = language === "es" ? es : enUS

  const days = daily.time.slice(0, 7).map((time, i) => {
    const date = new Date(time)
    const isToday = i === 0
    return {
      date: isToday ? t("today") : format(date, "EEE", { locale }),
      fullDate: format(date, "dd MMM", { locale }),
      max: Math.round(daily.temperatureMax[i]),
      min: Math.round(daily.temperatureMin[i]),
      code: daily.weatherCode[i],
      rainProb: daily.precipitationProbabilityMax[i],
      wind: Math.round(daily.windSpeedMax[i]),
    }
  })

  const maxTemp = Math.max(...days.map((d) => d.max))
  const minTemp = Math.min(...days.map((d) => d.min))
  const tempRange = maxTemp - minTemp || 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-5 md:p-6 shadow-sm"
    >
      <h3 className="text-base font-semibold mb-4">{t("dailyForecast")}</h3>

      <div className="space-y-3">
        {days.map((day, i) => {
          const desc =
            language === "es"
              ? getWeatherDescription(day.code)
              : getWeatherDescriptionEn(day.code)

          const barWidth = ((day.max - day.min) / tempRange) * 100
          const barOffset = ((day.min - minTemp) / tempRange) * 100

          return (
            <motion.div
              key={day.fullDate}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 py-2"
            >
              <div className="w-14 shrink-0">
                <p className="text-sm font-medium">{day.date}</p>
                <p className="text-[10px] text-muted-foreground">{day.fullDate}</p>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground truncate mb-1">{desc}</p>
                <div className="h-1.5 rounded-full bg-muted relative overflow-hidden">
                  <div
                    className="absolute h-full rounded-full bg-linear-to-r from-blue-400 to-orange-400"
                    style={{
                      left: `${barOffset}%`,
                      width: `${Math.max(barWidth, 8)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="w-16 text-right shrink-0">
                <span className="text-sm font-semibold">{day.max}°</span>
                <span className="text-xs text-muted-foreground ml-1">{day.min}°</span>
              </div>

              <div className="w-16 shrink-0 flex items-center justify-end gap-2 text-xs text-muted-foreground">
                {day.rainProb > 0 && (
                  <span className="flex items-center gap-0.5">
                    <Droplets className="h-3 w-3" />
                    {Math.round(day.rainProb)}%
                  </span>
                )}
                <span className="flex items-center gap-0.5">
                  <Wind className="h-3 w-3" />
                  {day.wind}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
