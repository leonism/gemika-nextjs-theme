"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export function GalleryViewer({ images, title }: { images: string[], title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {images.slice(0, 3).map((img, i) => (
          <div
            key={i}
            onClick={() => {
              setCurrentIndex(i)
              setIsOpen(true)
            }}
            className="relative aspect-square cursor-pointer"
          >
            <Image
              src={img}
              alt={`${title} gallery image ${i}`}
              fill
              className="object-cover rounded-lg"
            />
            {i === 2 && images.length > 3 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium">
                +{images.length - 3}
              </div>
            )}
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative w-full max-w-4xl">
            <Image
              src={images[currentIndex]}
              alt={`${title} gallery image ${currentIndex}`}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[80vh] object-contain"
            />

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
