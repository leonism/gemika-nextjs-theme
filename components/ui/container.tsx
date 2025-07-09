import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface ContainerProps {
  children: ReactNode
  className?: string
  fullWidth?: boolean
}

export function Container({ children, className, fullWidth = false }: ContainerProps) {
  return <div className={cn(fullWidth ? 'w-full' : 'sm:px-6 lg:px-8', className)}>{children}</div>
}
