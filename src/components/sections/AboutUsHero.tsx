import Image from "next/image";

export function AboutUsHero() {
  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-screen flex items-center justify-center bg-zinc-950 overflow-hidden">
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="/about-us-hero-img.png"
          alt="Majestic high-altitude mountain peak ranges at golden hour sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-75 brightness-[0.85] contrast-[1.05] pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/40 to-zinc-950/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4 px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-[#FBDDCA]/90 block mb-2">
          The Essence of Origin
        </span>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-serif text-zinc-100 tracking-tight leading-tight max-w-3xl mx-auto text-balance">
          Our Heritage, Your Health
        </h1>
        <p className="text-zinc-300 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-2xl mx-auto text-balance pt-2">
          Dedicated to unearthing earth&apos;s purest provisions directly from high-altitude orchards, preserving ancestral traditions and nutritional potency.
        </p>
      </div>
    </section>
  );
}