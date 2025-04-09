"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

interface LazyImageProps extends Omit<ImageProps, "src"> {
  src: string;
  alt: string;
  className?: string;
  threshold?: number;
  placeholderColor?: string;
}

export function LazyImage({
  src,
  alt,
  className,
  threshold = 0.1,
  placeholderColor = "#e5e7eb",
  ...props
}: LazyImageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return (
    <div ref={imgRef} className={cn("relative overflow-hidden", className)}>
      {!isLoaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ backgroundColor: placeholderColor }}
        />
      )}

      {isVisible && (
        <Image
          {...props}
          src={src || "/placeholder.svg"}
          alt={alt}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
          )}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
}
