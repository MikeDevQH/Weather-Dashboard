import type { GeocodingResult } from "./types"

const NOMINATIM_BASE = "https://nominatim.openstreetmap.org"

export async function searchCity(query: string): Promise<GeocodingResult[]> {
  if (!query.trim()) return []

  const res = await fetch(
    `${NOMINATIM_BASE}/search?format=json&q=${encodeURIComponent(query)}` +
      `&limit=5&accept-language=es,en&addressdetails=1`,
    {
      headers: {
        "User-Agent": "WeatherDashboard/1.0",
      },
    }
  )

  if (!res.ok) {
    throw new Error(`Geocoding error: ${res.status}`)
  }

  const data = await res.json()

  return data.map((item: any, index: number) => ({
    id: index,
    name: item.display_name.split(",")[0],
    latitude: parseFloat(item.lat),
    longitude: parseFloat(item.lon),
    country: item.address?.country,
    country_code: item.address?.country_code?.toUpperCase(),
    admin1: item.address?.state || item.address?.region,
  }))
}

export async function reverseGeocode(lat: number, lon: number): Promise<{ city: string; country: string }> {
  const res = await fetch(
    `${NOMINATIM_BASE}/reverse?format=json&lat=${lat}&lon=${lon}` +
      `&accept-language=es,en&addressdetails=1`,
    {
      headers: {
        "User-Agent": "WeatherDashboard/1.0",
      },
    }
  )

  if (!res.ok) {
    return { city: "", country: "" }
  }

  const data = await res.json()
  const address = data.address || {}

  return {
    city: address.city || address.town || address.village || address.county || "Ubicaci\u00f3n actual",
    country: address.country || "",
  }
}
