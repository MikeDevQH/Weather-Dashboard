"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function DynamicBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {theme === "dark" ? <DarkBackground /> : <LightBackground />}
    </div>
  )
}

function LightBackground() {
  return (
    <div className="absolute inset-0 bg-linear-to-b from-sky-100 via-blue-50 to-white">
      <div className="absolute top-[10%] right-[15%] w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-cyan-300/15 rounded-full blur-[80px]" />
      <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-indigo-300/10 rounded-full blur-[60px]" />
    </div>
  )
}

function DarkBackground() {
  return (
    <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute top-[10%] right-[15%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-cyan-600/8 rounded-full blur-[80px]" />
      <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-indigo-600/6 rounded-full blur-[60px]" />
    </div>
  )
}
