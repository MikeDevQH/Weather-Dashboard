import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import { LanguageProvider } from "@/components/language-provider"
import DynamicBackground from "@/components/dynamic-background"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Weather Dashboard - Pronóstico Preciso en Tiempo Real",
  description: "Consulta el clima actual, pronóstico por horas y días, calidad del aire y mapa meteorológico interactivo.",
  keywords: ["clima", "pronóstico", "temperatura", "mapa del tiempo", "calidad del aire"],
  openGraph: {
    title: "Weather Dashboard",
    description: "Pronóstico meteorológico preciso en tiempo real",
    type: "website",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <DynamicBackground />
            <Header />
            <main className="min-h-screen relative">{children}</main>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

