'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

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

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
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
      className={cn(
        'fixed bottom-6 right-6 z-50 rounded-full bg-white shadow-md dark:bg-gray-800',
        className
      )}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  )
}
