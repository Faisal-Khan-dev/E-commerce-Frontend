
import Image from "next/image";

export function AboutUsHero() {
  return (
    <section className="relative w-full aspect-[16/8] md:aspect-[21/9] min-h-[400px] flex items-center justify-center overflow-hidden">
      <Image
        src="/about-us-hero-img.png"
        alt="Majestic high-altitude mountain peak ranges at golden hour sunset"
        fill
        priority
        sizes="100vw"
        className="object-cover brightness-[0.75] contrast-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#fcf9f6]/30" />
      <div className="relative z-10 text-center space-y-3 px-4">
        <span className="text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase text-white/90 drop-shadow-xs">
          The Essence of Origin
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-white drop-shadow-md max-w-3xl mx-auto text-balance">
          Our Heritage, Your Health
        </h1>
      </div>
    </section>
  );
}