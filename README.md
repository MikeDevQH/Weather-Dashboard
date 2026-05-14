# Weather Dashboard

A modern, interactive weather dashboard built with Next.js, TypeScript, and Tailwind CSS. Delivers accurate real-time weather data using the [Open-Meteo](https://open-meteo.com) API — no API key required.

## Features

- **Current Weather**: Temperature, feels-like, humidity, wind, pressure, visibility, UV index
- **Hourly Forecast**: Interactive charts for temperature and precipitation (24 hours)
- **7-Day Forecast**: Daily min/max temperatures with precipitation probability
- **Air Quality Index**: PM2.5, PM10, NO₂, O₃ with color-coded risk levels
- **City Search**: Search any city worldwide via OpenStreetMap geocoding
- **Interactive Map**: Leaflet-based map for geographic context
- **Dark/Light Mode**: System-aware theme with persistent preference
- **Bilingual**: Full Spanish and English support
- **Responsive**: Optimized for mobile, tablet, and desktop

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5.8 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| Charts | Recharts |
| Maps | Leaflet + React-Leaflet |
| Icons | Lucide React |
| Fonts | Geist (Sans + Mono) |
| Weather Data | Open-Meteo API |
| Geocoding | Nominatim (OpenStreetMap) |

## Quick Start

```bash
# Clone the repository
git clone https://github.com/MikeDevQH/Weather-Dashboard.git
cd Weather-Dashboard

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Why Open-Meteo?

This project uses [Open-Meteo](https://open-meteo.com) instead of OpenWeatherMap because it provides:

- **Higher accuracy**: Data from ECMWF IFS, NOAA GFS, DWD ICON, and other national weather models
- **No API key required**: Free for non-commercial use
- **More parameters**: UV index, air quality, soil moisture, evapotranspiration
- **Faster setup**: No registration or key management needed

## Project Structure

```
app/              # Next.js App Router pages and global styles
components/       # React components (cards, charts, map, search)
lib/              # API clients, types, utilities, i18n context
locales/          # Spanish and English translation files
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add feature"`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

## License

MIT © [MikeDevQH](https://github.com/MikeDevQH)
