"use client"

import { createContext, useContext } from "react"
import esTranslations from "@/locales/es.json"
import enTranslations from "@/locales/en.json"

export const languages = [
  { code: "es", name: "Espa\u00f1ol", label: "ES" },
  { code: "en", name: "English", label: "EN" },
]

export const translations = {
  es: esTranslations,
  en: enTranslations,
}

export type TranslationKey = keyof typeof esTranslations

export type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
  t: (key: TranslationKey | string) => string
}

export const LanguageContext = createContext<LanguageContextType>({
  language: "es",
  setLanguage: () => {},
  t: () => "",
})

export const useLanguage = () => useContext(LanguageContext)

