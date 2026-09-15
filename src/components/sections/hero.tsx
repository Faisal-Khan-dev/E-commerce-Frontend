// components/HeroSection.tsx
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-screen flex items-center bg-zinc-950 overflow-hidden">
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="/hero-section-img.png" // Replace with your actual background image path
          alt="Artisanal selection of premium almonds and walnuts"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60 mix-blend-lighten pointer-events-none"
        />
        {/* Soft radial gradient to create depth and darken edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/40" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 w-full">
        <div className="max-w-2xl text-left">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#FBDDCA]-500/90 block mb-3 sm:mb-4">
            Artisanal Sourcing
          </span>

          <h1 className="text-4xl sm:text-5xl  lg:text-7xl font-bold font-serif text-zinc-100  tracking-wide leading-[1.1] mb-6">
            Purity from the Source
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-xl mb-10 text-balance">
            Experience the uncompromising quality of earth&apos;s finest
            provisions, harvested sustainably and delivered with clinical
            precision to your table.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-[#402e22] text-center text-zinc-100 text-sm font-medium tracking-wide rounded-sm hover:bg-[#523d2e] transition-colors duration-300 shadow-lg"
            >
              SHOP COLLECTION
            </Link>
            <Link
              href="/story"
              className="px-8 py-3.5 border border-zinc-500 text-center text-zinc-100 text-sm font-medium tracking-wide rounded-sm hover:bg-zinc-100/10 hover:border-zinc-300 transition-all duration-300"
            >
              OUR STORY
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
