import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { HeroBrands } from "@/components/home/hero/HeroBrands"

const BRANDS = ["Apple", "Adobe", "Google", "Microsoft", "Samsung", "Spotify", "Amazon", "Netflix"]

export function HeroSection() {
  return (
    <section className="relative bg-gray-50 py-8 sm:py-12 md:py-24 lg:py-28 xl:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center relative z-10">

        {/* Profile Image */}
        <div className="flex justify-center mb-6 sm:mb-8 md:mb-10">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden shadow-xl border-4 border-white transition-all duration-500 hover:scale-105 hover:shadow-2xl group">
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
        <div className="space-y-3 sm:space-y-4 md:space-y-5 mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Gemika Haziq Nugroho
            </span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold">
            <span className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 bg-clip-text text-transparent">
              UX Strategist & Mobile Developer
            </span>
          </h2>
        </div>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-500 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed">
          Crafting exceptional digital experiences through thoughtful design and cutting-edge development.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 mb-10 sm:mb-12 md:mb-16">
          <Link href="/projects" className="relative px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 overflow-hidden font-medium rounded-full group">
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:translate-x-12 group-hover:skew-x-12">
            </span>
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform -translate-x-12 -skew-x-12 bg-gradient-to-r from-indigo-700 to-purple-700 group-hover:translate-x-0 group-hover:skew-x-12">
            </span>
            <span className="relative text-white font-medium text-sm sm:text-base md:text-lg">
              View My Work
            </span>
          </Link>
          <Link href="/contact" className="px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 border-2 border-gray-900 text-gray-900 rounded-full font-medium transition-all duration-300 hover:bg-gray-100 hover:shadow-lg relative overflow-hidden group text-sm sm:text-base md:text-lg">
            <span className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
            </span>
            Get In Touch
          </Link>
        </div>

        {/* Brand Logos (Extracted to HeroBrands.tsx) */}
        <HeroBrands brands={BRANDS} />
      </div>
    </section>
  )
}
