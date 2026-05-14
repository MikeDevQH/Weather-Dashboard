"use client"

import { type ReactNode, useState, useCallback } from "react"
import { LanguageContext, translations, type TranslationKey } from "@/lib/languageContext"

function getNestedTranslation(obj: any, path: string): string {
  const result = path.split('.').reduce((acc, part) => acc?.[part], obj)
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
