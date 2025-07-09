'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export function GalleryViewer({ images, title }: { images: string[]; title: string }) {
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
      <div className="mt-4 grid grid-cols-3 gap-2">
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
              className="rounded-lg object-cover"
            />
            {i === 2 && images.length > 3 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 font-medium text-white">
                +{images.length - 3}
              </div>
            )}
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button onClick={() => setIsOpen(false)} className="absolute right-4 top-4 text-white">
            <X className="h-8 w-8" />
          </button>

          <div className="relative w-full max-w-4xl">
            <Image
              src={images[currentIndex]}
              alt={`${title} gallery image ${currentIndex}`}
              width={1200}
              height={800}
              className="h-auto max-h-[80vh] w-full object-contain"
            />

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
