"use client"

import { useState, useRef, useEffect } from "react"
import { Search, MapPin, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { searchCity } from "@/lib/geocoding"
import type { GeocodingResult } from "@/lib/types"
import { useLanguage } from "@/lib/languageContext"

interface SearchCityProps {
  onCitySelect: (city: GeocodingResult) => void
}

export default function SearchCity({ onCitySelect }: SearchCityProps) {
  const { t } = useLanguage()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<GeocodingResult[]>([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setLoading(true)
        try {
          const cities = await searchCity(query)
          setResults(cities)
          setIsOpen(cities.length > 0)
        } catch {
          setResults([])
        } finally {
          setLoading(false)
        }
      } else {
        setResults([])
        setIsOpen(false)
      }
    }, 300)

    return () => clearTimeout(timeout)
  }, [query])

  const handleSelect = (city: GeocodingResult) => {
    onCitySelect(city)
    setQuery("")
    setResults([])
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="w-full h-11 pl-10 pr-10 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-border shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-xl border border-border shadow-lg overflow-hidden z-50"
          >
            <div className="p-1.5">
              {results.length === 0 ? (
                <div className="px-4 py-3 text-sm text-muted-foreground">{t("noResults")}</div>
              ) : (
                results.map((city, i) => (
                  <motion.button
                    key={`${city.latitude}-${city.longitude}-${i}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleSelect(city)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/5 text-left transition-colors"
                  >
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{city.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {city.admin1}{city.admin1 && city.country ? ", " : ""}{city.country}
                      </p>
                    </div>
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
