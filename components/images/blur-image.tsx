"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface BlurImageProps extends Omit<ImageProps, "src" | "onLoadingComplete"> {
  src: string
  alt: string
  className?: string
  placeholderColor?: string
}

export function BlurImage({ src, alt, className, placeholderColor = "#e5e7eb", ...props }: BlurImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [imgSrc, setImgSrc] = useState(src)

  // Reset loading state when src changes
  useEffect(() => {
    setIsLoading(true)
    setImgSrc(src)
  }, [src])

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && <div className="absolute inset-0 animate-pulse" style={{ backgroundColor: placeholderColor }} />}

      <Image
        {...props}
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        className={cn("transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100")}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          // Set to placeholder on error
          setImgSrc(
            "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
          )
        }}
      />
    </div>
  )
}

