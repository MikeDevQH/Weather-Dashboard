  "use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { languages, useLanguage } from "@/lib/languageContext"
import Logo from "./logo"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <header className="fixed top-0 inset-x-0 h-16 z-50">
        <div className="h-full max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6">
          <Logo size={36} />
        </div>
      </header>
    )
  }

  return (
    <header className="fixed top-0 inset-x-0 h-16 z-50">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2.5">
          <Logo size={36} />
          <span className="text-lg font-bold bg-linear-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            {t("title")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-muted/50 rounded-lg p-0.5">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  language === lang.code
                    ? "bg-white dark:bg-slate-800 shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            aria-label={t("themeToggle")}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-yellow-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

