import Image from 'next/image';

export function BrandsSection() {
  return (
    <section className="py-10 sm:py-12 md:py-16">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h3 className="mb-8 text-center text-sm text-gray-500 sm:text-base">
          Trusted by leading brands
        </h3>
        <div className="grid grid-cols-3 items-center justify-items-center gap-6 md:grid-cols-6 md:gap-8">
          {/* Increased size for mobile */}
          {[].map((brand, index) => (
            <div
              key={index}
              className="flex h-12 w-20 items-center justify-center opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-14 sm:w-24 md:h-16 md:w-28"
            >
              <Image
                src={brand}
                alt="Brand logo"
                width={120}
                height={60}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
