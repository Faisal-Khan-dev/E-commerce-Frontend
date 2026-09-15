// components/story/story-sourcing.tsx
import Image from "next/image";

export function StorySourcing() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side Copy */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif tracking-tight text-zinc-900">
            Purity from the Source
          </h2>
          <div className="space-y-4 text-zinc-600 font-light text-sm sm:text-base leading-relaxed text-pretty">
            <p>
              At Aureum Apothecary, we believe that true wellness is a dialogue
              between the earth and the body. Our journey began in the remote,
              high-altitude regions where nature remains untamed by modern
              haste.
            </p>
            <p>
              We don't just source ingredients; we forge relationships with the
              land and its guardians. Every piece of shilajeet and every
              hand-selected dry fruit comes with it the story of its origin — a
              story of patience, mineral-rich soil, and artisanal care.
            </p>
          </div>
          <div className="pt-2">
            <button className="text-[11px] font-bold tracking-widest uppercase border border-zinc-900 px-6 py-3.5 rounded-sm bg-transparent hover:bg-zinc-900 hover:text-white transition-all duration-300">
              Our Sourcing Ethics
            </button>
          </div>
        </div>

        {/* Right Side Image Composition Matrix with overlapping badge */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
          <div className="relative w-full sm:w-[85%] aspect-square rounded-xl overflow-hidden shadow-md border border-zinc-200/30">
            <Image
              src="/about-us-subhero-img.png"
              alt="Raw amber wellness mineral stone resin resting over raw porous volcanic stone baseline textures"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {/* Overlapping Absolute Badge Component Widget */}
          <div className="absolute -bottom-6 left-4 sm:left-12 bg-[#f5efe9] border border-zinc-200/60 shadow-md rounded-lg p-5 text-center min-w-[120px] animate-fade-in">
            <span className="block text-xl font-serif font-medium text-zinc-900 leading-none mb-1">
              100%
            </span>
            <span className="block text-[9px] font-bold tracking-widest uppercase text-zinc-500">
              Traceable Origin
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
