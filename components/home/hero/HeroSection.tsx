import { HeroAvatar } from '@/components/home/hero/HeroAvatar'
import { HeroHeadings } from '@/components/home/hero/HeroHeadings'
import { HeroDescription } from '@/components/home/hero/HeroDescription'
import { HeroActions } from '@/components/home/hero/HeroActions'

export function HeroSection() {
  return (
    <section className="relative my-10 overflow-hidden">
      <div className="relative z-10 container mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <HeroAvatar
          src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
          alt="Gemika Haziq Nugroho"
        />
        <HeroHeadings name="Gemika Haziq Nugroho" title="UX Strategist & Mobile Developer" />
        <HeroDescription>
          Crafting exceptional digital experiences through thoughtful design and cutting-edge
          development.
        </HeroDescription>
        <HeroActions />
      </div>
    </section>
  )
}
