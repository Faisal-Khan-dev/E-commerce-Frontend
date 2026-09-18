import Image from "next/image";

export function ContactHero() {
  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-screen flex items-center justify-center bg-zinc-950 overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="/contact-hero-bg.jpg"
          alt="Artisanal organic dry fruits, pure golden honey and cold-pressed essential oils"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-75 brightness-[0.8] contrast-[1.05] pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/40 to-zinc-950/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4 px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-[#FBDDCA]/90 block mb-2">
          Get In Touch
        </span>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-serif text-zinc-100 tracking-tight leading-tight max-w-3xl mx-auto text-balance">
          We&apos;re Here to Help
        </h1>
        <p className="text-zinc-300 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-2xl mx-auto text-balance pt-2">
          Whether you&apos;re curious about our sourcing, need guidance on our products, or simply wish to share your wellness journey, we are always at your service.
        </p>
      </div>
    </section>
  );
}
