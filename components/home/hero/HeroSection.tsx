import Image from 'next/image'
import Link from 'next/link'
// Remove unused import

import { HeroBrands } from '@/components/home/hero/HeroBrands'

const BRANDS = ['Apple', 'Adobe', 'Google', 'Microsoft', 'Samsung', 'Spotify', 'Amazon', 'Netflix']

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="container relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        {/* Profile Image - Increased size for mobile */}
        <div className="mb-6 flex justify-center sm:mb-8 md:mb-10">
          <div className="group relative h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl sm:h-36 sm:w-36 md:h-36 md:w-36 lg:h-40 lg:w-40">
            <Image
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
              alt="Gemika Haziq Nugroho"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority
            />
          </div>
        </div>

        {/* Headings */}
        <div className="mb-6 space-y-3 sm:mb-8 sm:space-y-4 md:mb-10 md:space-y-5">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            <span className="bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
              Gemika Haziq Nugroho
            </span>
          </h1>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            UX Strategist & Mobile Developer
          </h2>
        </div>

        {/* Description */}
        <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-gray-500 sm:mb-10 sm:max-w-2xl sm:text-lg md:mb-12 md:max-w-3xl md:text-xl lg:text-2xl">
          Crafting exceptional digital experiences through thoughtful design and cutting-edge
          development.
        </p>

        {/* Buttons */}
        <div className="mb-10 flex flex-wrap justify-center gap-3 sm:mb-12 sm:gap-4 md:mb-16 md:gap-5">
          <Link
            href="/projects"
            className="group relative overflow-hidden rounded-full px-5 py-2 font-medium sm:px-6 sm:py-2.5 md:px-8 md:py-3"
          >
            <span className="absolute inset-0 h-full w-full translate-x-0 -skew-x-12 transform bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 ease-out group-hover:translate-x-12 group-hover:skew-x-12"></span>
            <span className="absolute inset-0 h-full w-full -translate-x-12 -skew-x-12 transform bg-gradient-to-r from-indigo-700 to-purple-700 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:skew-x-12"></span>
            <span className="relative text-sm font-medium text-white sm:text-base md:text-lg">
              View My Work
            </span>
          </Link>
          <Link
            href="/contact"
            className="group relative overflow-hidden rounded-full border-2 border-gray-900 px-5 py-2 text-sm font-medium text-gray-900 transition-all duration-300 hover:bg-gray-100 hover:shadow-lg sm:px-6 sm:py-2.5 sm:text-base md:px-8 md:py-3 md:text-lg"
          >
            <span className="absolute inset-0 bg-gray-100 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></span>
            Get In Touch
          </Link>
        </div>

        {/* Brand Logos (Extracted to HeroBrands.tsx) */}
        <HeroBrands brands={BRANDS} />
      </div>
    </section>
  )
}
