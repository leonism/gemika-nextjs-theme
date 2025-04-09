import Image from "next/image";

interface HeroBrandsProps {
  brands: string[];
}

export function HeroBrands({ brands }: HeroBrandsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
      {brands.map((brand, index) => (
        <div
          key={index}
          className="group relative h-8 w-8 transition-all duration-300 hover:scale-110 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <Image
            src={`https://logo.clearbit.com/${brand.toLowerCase()}.com`}
            alt={brand}
            fill
            className="rounded-full object-contain p-1 grayscale transition-all duration-500 group-hover:p-0 group-hover:grayscale-0"
          />
        </div>
      ))}
    </div>
  );
}
