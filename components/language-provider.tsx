"use client"

import { type ReactNode, useState, useCallback } from "react"
import { LanguageContext, translations, type TranslationKey } from "@/lib/languageContext"

function getNestedTranslation(obj: unknown, path: string): string {
  const result = path.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part]
    }
    return undefined
  }, obj)
  return typeof result === 'string' ? result : path
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState("es")

  const t = useCallback((key: TranslationKey | string) => {
    const currentTranslations = translations[language as keyof typeof translations]
    return getNestedTranslation(currentTranslations, key)
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
