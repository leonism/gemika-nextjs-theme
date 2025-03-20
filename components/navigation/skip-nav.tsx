"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function SkipNav() {
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab" && e.shiftKey) {
        setIsFocused(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none",
        isFocused ? "focus:block" : "",
      )}
      onBlur={() => setIsFocused(false)}
    >
      Skip to content
    </a>
  )
}

