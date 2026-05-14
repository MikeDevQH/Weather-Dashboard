"use client"

import { useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import { motion } from "framer-motion"
import type { HourlyForecast } from "@/lib/types"
import { useLanguage } from "@/lib/languageContext"
import { format } from "date-fns"
import { es, enUS } from "date-fns/locale"

interface ForecastChartProps {
  hourly: HourlyForecast
}

export default function ForecastChart({ hourly }: ForecastChartProps) {
  const { language, t } = useLanguage()
  const [mode, setMode] = useState<"temp" | "rain">("temp")
  const locale = language === "es" ? es : enUS

  const next24h = hourly.time.slice(0, 25)
  const data = next24h.map((time, i) => ({
    time: format(new Date(time), "HH:mm", { locale }),
    temp: hourly.temperature[i],
    feelsLike: hourly.feelsLike[i],
    rain: hourly.precipitation[i],
    rainProb: hourly.precipitationProbability[i],
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-5 md:p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold">{t("hourlyForecast")}</h3>
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => setMode("temp")}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              mode === "temp" ? "bg-white dark:bg-slate-800 shadow-sm" : "text-muted-foreground"
            }`}
          >
            Temp
          </button>
          <button
            onClick={() => setMode("rain")}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              mode === "rain" ? "bg-white dark:bg-slate-800 shadow-sm" : "text-muted-foreground"
            }`}
          >
            {t("precipitation")}
          </button>
        </div>
      </div>

      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {mode === "temp" ? (
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="feelsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.08} vertical={false} />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 11 }}
                stroke="currentColor"
                opacity={0.4}
                tickMargin={8}
                interval={3}
              />
              <YAxis tick={{ fontSize: 11 }} stroke="currentColor" opacity={0.4} unit="°" />
              <Tooltip
                contentStyle={{
                  background: "rgba(0,0,0,0.8)",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "13px",
                  color: "#fff",
                }}
                formatter={(value: number, name: string) => [`${value}°`, name === "temp" ? "Temp" : "Feels Like"]}
              />
              <Area
                type="monotone"
                dataKey="feelsLike"
                stroke="#f59e0b"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                fill="url(#feelsGrad)"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="temp"
                stroke="#0ea5e9"
                strokeWidth={2}
                fill="url(#tempGrad)"
                dot={{ r: 2, fill: "#0ea5e9" }}
                activeDot={{ r: 4 }}
              />
            </AreaChart>
          ) : (
            <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.08} vertical={false} />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 11 }}
                stroke="currentColor"
                opacity={0.4}
                tickMargin={8}
                interval={3}
              />
              <YAxis tick={{ fontSize: 11 }} stroke="currentColor" opacity={0.4} unit="mm" />
              <Tooltip
                contentStyle={{
                  background: "rgba(0,0,0,0.8)",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "13px",
                  color: "#fff",
                }}
                formatter={(value: number, name: string) => [
                  `${value}${name === "rain" ? "mm" : "%"}`,
                  name === "rain" ? t("precipitation") : t("precipitationProbability"),
                ]}
              />
              <Bar dataKey="rainProb" fill="#94a3b8" opacity={0.3} radius={[2, 2, 0, 0]} barSize={6} />
              <Bar dataKey="rain" fill="#0ea5e9" radius={[2, 2, 0, 0]} barSize={6} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
