// components/contact/contact-hero.tsx
import Image from "next/image";

export function ContactHero() {
  return (
    <section className="relative w-full aspect-[16/6] md:aspect-[21/6] min-h-[280px] flex items-center justify-center overflow-hidden border-b border-zinc-200/40">
      <Image
        src="/contact-hero-pic.png" // High-fidelity clean translucent apothecary glass backdrops
        alt="Translucent organic laboratory glass tincture vials on warm neutral minimalist background"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-20 filter contrast-[0.95] scale-102"
      />
      {/* Soft gradient ambient blend */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fcf9f6]/10 via-[#fcf9f6]/40 to-[#fcf9f6]" />

      <div className="relative z-10 text-center space-y-2 px-4 max-w-2xl mx-auto">
        <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-zinc-400 block">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-zinc-900">
          We&apos;re Here to Help
        </h1>
        <p className="text-zinc-500 font-light text-xs sm:text-sm leading-relaxed max-w-lg mx-auto text-balance pt-1">
          Whether you&apos;re curious about our sourcing, need guidance on our
          products, or simply wish to share your wellness journey, we are at
          your service.
        </p>
      </div>
    </section>
  );
}
