'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

import { cn } from '@/lib/utils'

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
      <div className={cn('relative inline-flex items-center justify-center', className)}>
        <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        <span className="sr-only">Toggle theme</span>
      </div>
    )
  }

  return (
    <div
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={cn('relative inline-flex cursor-pointer items-center justify-center', className)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setTheme(theme === 'light' ? 'dark' : 'light')
        }
      }}
    >
      <Sun
        className={`h-5 w-5 text-gray-600 transition-all duration-300 dark:text-gray-400 ${
          theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 text-gray-600 transition-all duration-300 dark:text-gray-400 ${
          theme === 'light' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </div>
  )
}
