import Image from 'next/image'

interface HeroAvatarProps {
  src: string
  alt: string
}

export function HeroAvatar({ src, alt }: HeroAvatarProps) {
  return (
    <div className="mb-6 flex justify-center sm:mb-8 md:mb-10">
      <div className="group relative h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl sm:h-36 sm:w-36 md:h-36 md:w-36 lg:h-40 lg:w-40">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority
        />
      </div>
    </div>
  )
}
