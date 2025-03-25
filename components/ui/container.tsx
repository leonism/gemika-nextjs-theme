import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface ContainerProps {
  children: ReactNode
  className?: string
  fullWidth?: boolean
}

export function Container({
  children,
  className,
  fullWidth = false
}: ContainerProps) {
  return (
    <div
      className={cn(
        fullWidth ? "w-full" : "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  )
}
