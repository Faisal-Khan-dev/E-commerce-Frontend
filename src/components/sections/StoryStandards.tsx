// components/story/story-standards.tsx
import { Compass, Beaker, Archive } from "lucide-react";
import Image from "next/image";

const PILLARS = [
  {
    icon: (
      <Image src="/sourcing-icon.png" alt="Sourcing" width={24} height={24} />
    ),
    title: "Sourcing",
    description:
      "We venture into the most inaccessible terrains to harvest ingredients during their peak potency periods, ensuring zero environmental impact.",
  },
  {
    icon: (
      <Image
        src="/pure-extraction-icon.png"
        alt="Pure Extraction"
        width={24}
        height={24}
      />
    ),
    title: "Pure Extraction",
    description:
      "Using proprietary low-temperature methods, we preserve the bioactive compounds and natural minerals often lost in mass production.",
  },
  {
    icon: (
      <Image
        src="/packaging-icon.png"
        alt="Premium Packaging"
        width={24}
        height={24}
      />
    ),
    title: "Premium Packaging",
    description:
      "Each product is sealed in Miron violet glass or eco-conscious gold-embossed containers to protect its structural integrity and shelf life.",
  },
];

export function StoryStandards() {
  return (
    <section className="w-full bg-[#fdfbf9] border-t border-b border-zinc-200/50 py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-zinc-900">
            The Aureum Standard
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-light tracking-wide">
            A meticulous journey from the wild to your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center space-y-4 max-w-sm mx-auto"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-[#fbddc7] rounded-full shadow-2xs border border-zinc-200/20">
                {pillar.icon}
              </div>
              <h3 className="text-lg font-serif tracking-wide text-zinc-900 pt-1">
                {pillar.title}
              </h3>
              <p className="text-zinc-500 text-xs sm:text-sm font-light leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
