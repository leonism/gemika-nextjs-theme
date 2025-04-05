import Image from "next/image"

interface HeroBrandsProps {
  brands: string[]
}

export function HeroBrands({ brands }: HeroBrandsProps) {
  return (
    <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
      {brands.map((brand, index) => (
        <div key={index} className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 transition-all duration-300 hover:scale-110 group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          </div>
          <Image
            src={`https://logo.clearbit.com/${brand.toLowerCase()}.com`}
            alt={brand}
            fill
            className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500 rounded-full p-1 group-hover:p-0"
          />
        </div>
      ))}
    </div>
  )
}
