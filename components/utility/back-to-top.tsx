"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface BackToTopProps {
  threshold?: number
  className?: string
  smooth?: boolean
}

export function BackToTop({ threshold = 300, className, smooth = true }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold])

  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    } else {
      window.scrollTo(0, 0)
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("fixed bottom-6 right-6 rounded-full shadow-md bg-white dark:bg-gray-800 z-50", className)}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  )
}

