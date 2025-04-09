"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Sun, Moon } from "lucide-react"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Ensure we only render after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Render a neutral state during SSR
    return (
      <div
        className={cn(
          "inline-flex items-center justify-center relative",
          className
        )}
      >
        <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        <span className="sr-only">Toggle theme</span>
      </div>
    )
  }

  return (
    <div
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn(
        "inline-flex items-center justify-center relative cursor-pointer",
        className
      )}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setTheme(theme === "light" ? "dark" : "light")
        }
      }}
    >
      <Sun
        className={`h-5 w-5 transition-all duration-300 text-gray-600 dark:text-gray-400 ${
          theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 text-gray-600 dark:text-gray-400 ${
          theme === 'light' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </div>
  )
}
