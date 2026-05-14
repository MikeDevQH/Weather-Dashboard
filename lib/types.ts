export interface CurrentWeather {
  time: string
  temperature: number
  feelsLike: number
  humidity: number
  precipitation: number
  weatherCode: number
  windSpeed: number
  windDirection: number
  pressure: number
  visibility: number
  uvIndex: number
  isDay: boolean
}

export interface HourlyForecast {
  time: string[]
  temperature: number[]
  feelsLike: number[]
  humidity: number[]
  precipitationProbability: number[]
  precipitation: number[]
  weatherCode: number[]
  windSpeed: number[]
  windDirection: number[]
  pressure: number[]
  visibility: number[]
  uvIndex: number[]
  isDay: number[]
}

export interface DailyForecast {
  time: string[]
  weatherCode: number[]
  temperatureMax: number[]
  temperatureMin: number[]
  sunrise: string[]
  sunset: string[]
  precipitationSum: number[]
  precipitationProbabilityMax: number[]
  windSpeedMax: number[]
  uvIndexMax: number[]
}

export interface AirQuality {
  time: string
  pm10: number
  pm2_5: number
  carbonMonoxide: number
  nitrogenDioxide: number
  sulphurDioxide: number
  ozone: number
  europeanAqi: number
  usAqi: number
}

export interface WeatherData {
  current: CurrentWeather
  hourly: HourlyForecast
  daily: DailyForecast
  airQuality?: AirQuality
  cityName: string
  countryName: string
  timezone: string
}

export interface GeocodingResult {
  id: number
  name: string
  latitude: number
  longitude: number
  elevation?: number
  feature_code?: string
  country_code?: string
  country?: string
  admin1?: string
  admin2?: string
  admin3?: string
  admin4?: string
}

export interface WeatherCondition {
  code: number
  description: string
  icon: string
}

export const WMO_WEATHER_CODES: Record<number, { description: string; icon: string }> = {
  0: { description: "Clear sky", icon: "sun" },
  1: { description: "Mainly clear", icon: "sun-dim" },
  2: { description: "Partly cloudy", icon: "cloud-sun" },
  3: { description: "Overcast", icon: "cloud" },
  45: { description: "Fog", icon: "cloud-fog" },
  48: { description: "Depositing rime fog", icon: "cloud-fog" },
  51: { description: "Light drizzle", icon: "cloud-drizzle" },
  53: { description: "Moderate drizzle", icon: "cloud-drizzle" },
  55: { description: "Dense drizzle", icon: "cloud-drizzle" },
  56: { description: "Light freezing drizzle", icon: "cloud-hail" },
  57: { description: "Dense freezing drizzle", icon: "cloud-hail" },
  61: { description: "Slight rain", icon: "cloud-rain" },
  63: { description: "Moderate rain", icon: "cloud-rain" },
  65: { description: "Heavy rain", icon: "cloud-rain" },
  66: { description: "Light freezing rain", icon: "cloud-hail" },
  67: { description: "Heavy freezing rain", icon: "cloud-hail" },
  71: { description: "Slight snow fall", icon: "cloud-snow" },
  73: { description: "Moderate snow fall", icon: "cloud-snow" },
  75: { description: "Heavy snow fall", icon: "cloud-snow" },
  77: { description: "Snow grains", icon: "cloud-snow" },
  80: { description: "Slight rain showers", icon: "cloud-rain-wind" },
  81: { description: "Moderate rain showers", icon: "cloud-rain-wind" },
  82: { description: "Violent rain showers", icon: "cloud-lightning" },
  85: { description: "Slight snow showers", icon: "cloud-snow" },
  86: { description: "Heavy snow showers", icon: "cloud-snow" },
  95: { description: "Thunderstorm", icon: "cloud-lightning" },
  96: { description: "Thunderstorm with slight hail", icon: "cloud-lightning" },
  99: { description: "Thunderstorm with heavy hail", icon: "cloud-lightning" },
}
