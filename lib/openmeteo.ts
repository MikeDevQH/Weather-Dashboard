import type { CurrentWeather, HourlyForecast, DailyForecast, AirQuality, WeatherData } from "./types"

const OPEN_METEO_BASE = "https://api.open-meteo.com/v1"
const AIR_QUALITY_BASE = "https://air-quality-api.open-meteo.com/v1"

export async function getWeatherData(lat: number, lon: number, timezone = "auto"): Promise<WeatherData> {
  const [weatherRes, airQualityRes] = await Promise.all([
    fetch(
      `${OPEN_METEO_BASE}/forecast?latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,visibility,uv_index,is_day` +
        `&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,visibility,uv_index,is_day` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max` +
        `&timezone=${timezone}&forecast_days=7&past_days=1`,
      { next: { revalidate: 300 } }
    ),
    fetch(
      `${AIR_QUALITY_BASE}/air-quality?latitude=${lat}&longitude=${lon}` +
        `&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,european_aqi,us_aqi` +
        `&timezone=${timezone}`,
      { next: { revalidate: 300 } }
    ).catch(() => null),
  ])

  if (!weatherRes.ok) {
    throw new Error(`Weather API error: ${weatherRes.status}`)
  }

  const weatherData = await weatherRes.json()
  const airQualityData = airQualityRes?.ok ? await airQualityRes.json() : null

  const current: CurrentWeather = {
    time: weatherData.current.time,
    temperature: weatherData.current.temperature_2m,
    feelsLike: weatherData.current.apparent_temperature,
    humidity: weatherData.current.relative_humidity_2m,
    precipitation: weatherData.current.precipitation,
    weatherCode: weatherData.current.weather_code,
    windSpeed: weatherData.current.wind_speed_10m,
    windDirection: weatherData.current.wind_direction_10m,
    pressure: weatherData.current.surface_pressure,
    visibility: weatherData.current.visibility,
    uvIndex: weatherData.current.uv_index,
    isDay: weatherData.current.is_day === 1,
  }

  const hourly: HourlyForecast = {
    time: weatherData.hourly.time,
    temperature: weatherData.hourly.temperature_2m,
    feelsLike: weatherData.hourly.apparent_temperature,
    humidity: weatherData.hourly.relative_humidity_2m,
    precipitationProbability: weatherData.hourly.precipitation_probability,
    precipitation: weatherData.hourly.precipitation,
    weatherCode: weatherData.hourly.weather_code,
    windSpeed: weatherData.hourly.wind_speed_10m,
    windDirection: weatherData.hourly.wind_direction_10m,
    pressure: weatherData.hourly.surface_pressure,
    visibility: weatherData.hourly.visibility,
    uvIndex: weatherData.hourly.uv_index,
    isDay: weatherData.hourly.is_day,
  }

  const daily: DailyForecast = {
    time: weatherData.daily.time,
    weatherCode: weatherData.daily.weather_code,
    temperatureMax: weatherData.daily.temperature_2m_max,
    temperatureMin: weatherData.daily.temperature_2m_min,
    sunrise: weatherData.daily.sunrise,
    sunset: weatherData.daily.sunset,
    precipitationSum: weatherData.daily.precipitation_sum,
    precipitationProbabilityMax: weatherData.daily.precipitation_probability_max,
    windSpeedMax: weatherData.daily.wind_speed_10m_max,
    uvIndexMax: weatherData.daily.uv_index_max,
  }

  let airQuality: AirQuality | undefined
  if (airQualityData?.current) {
    airQuality = {
      time: airQualityData.current.time,
      pm10: airQualityData.current.pm10,
      pm2_5: airQualityData.current.pm2_5,
      carbonMonoxide: airQualityData.current.carbon_monoxide,
      nitrogenDioxide: airQualityData.current.nitrogen_dioxide,
      sulphurDioxide: airQualityData.current.sulphur_dioxide,
      ozone: airQualityData.current.ozone,
      europeanAqi: airQualityData.current.european_aqi,
      usAqi: airQualityData.current.us_aqi,
    }
  }

  return {
    current,
    hourly,
    daily,
    airQuality,
    cityName: "",
    countryName: "",
    timezone: weatherData.timezone,
  }
}

export function getWeatherDescription(code: number): string {
  const descriptions: Record<number, string> = {
    0: "Cielo despejado",
    1: "Principalmente despejado",
    2: "Parcialmente nublado",
    3: "Nublado",
    45: "Niebla",
    48: "Niebla con escarcha",
    51: "Llovizna ligera",
    53: "Llovizna moderada",
    55: "Llovizna intensa",
    61: "Lluvia ligera",
    63: "Lluvia moderada",
    65: "Lluvia intensa",
    71: "Nevada ligera",
    73: "Nevada moderada",
    75: "Nevada intensa",
    77: "Granos de nieve",
    80: "Chubascos ligeros",
    81: "Chubascos moderados",
    82: "Chubascos violentos",
    95: "Tormenta",
    96: "Tormenta con granizo",
    99: "Tormenta con granizo intenso",
  }
  return descriptions[code] ?? "Desconocido"
}

export function getWeatherDescriptionEn(code: number): string {
  const descriptions: Record<number, string> = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Thunderstorm with heavy hail",
  }
  return descriptions[code] ?? "Unknown"
}
