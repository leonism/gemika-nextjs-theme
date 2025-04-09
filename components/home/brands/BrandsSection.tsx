// Update the brand logo sizes in the BrandsSection component
// ... existing imports ...

export function BrandsSection() {
  return (
    <section className="py-10 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h3 className="text-center text-gray-500 mb-8 text-sm sm:text-base">Trusted by leading brands</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 items-center justify-items-center">
          {/* Increased size for mobile */}
          {brands.map((brand, index) => (
            <div key={index} className="w-20 h-12 sm:w-24 sm:h-14 md:w-28 md:h-16 flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={120}
                height={60}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
