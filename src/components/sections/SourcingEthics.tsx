"use client";

// components/sections/SourcingEthics.tsx
import Image from "next/image";
import { Droplets, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";

export function SourcingEthics() {
  const OFFERS = [
    {
      title: "Fresh Hand-Picked Dry Fruits",
      subtitle: "Taza & Premium Quality",
      description:
        "Taza aur aala tareen quality ke dry fruits jo seedha high-altitude orchards se harvest kiye jaate hain. Hum khud baghair kisi chemical ya artificial processing ke inki hand-picking aur sorting karte hain.",
      badge: "100% Fresh Harvest",
      icon: <Sparkles className="w-6 h-6 text-[#fbddc7]" />,
      image: "/dry-fruits.jpg",
    },
    {
      title: "100% In-House Extracted Oils",
      subtitle: "Own Pure Cold Extraction",
      description:
        "Tamam oils hum apni khud ki cold-pressing machines par kam temperature par extract karte hain. Zero heat damage, zero chemical solvents — 100% pure aur qudrati khushboo se bharpoor.",
      badge: "Own Extraction",
      icon: <Droplets className="w-6 h-6 text-[#fbddc7]" />,
      image: "/olive web.jfif",
    },
    {
      title: "Direct Wild Honey Extraction",
      subtitle: "Honey Bee Harvested By Us",
      description:
        "Pahadi ilaqon se qudrati honey bee hives (makhion ke chatte) se hum khud shahad nikalte hain. Bina kisi adulteration ya sugar syrup ke 100% raw, unfiltered aur natural honey.",
      badge: "Direct Bee Harvest",
      icon: <ShieldCheck className="w-6 h-6 text-[#fbddc7]" />,
      image: "/wild-honey.jpg",
    },
    {
      title: "Pure Mountain Shilajeet",
      subtitle: "Grade-A+ Raw Mineral Resin",
      description:
        "High-altitude mountain rocks se khud collect karke traditional natural sun-purification process se tayyar ki gayi 100% authentic aur mineral-dense Shilajeet.",
      badge: "Authentic Himalayan",
      icon: <CheckCircle2 className="w-6 h-6 text-[#fbddc7]" />,
      image: "/pure-shilajeet.jpg",
    },
  ];

  return (
    <section
      id="sourcing-ethics"
      className="w-full bg-[#fdfbf9] py-20 lg:py-28 border-t border-[#eae3db] relative overflow-hidden scroll-mt-12"
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#fbddc7]/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#312117] text-[#fbddc7] text-[11px] font-semibold tracking-[0.25em] uppercase shadow-xs">
            100% Own Sourcing & Extraction
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-zinc-900 font-medium">
            Our Sourcing Ethics & In-House Process
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base font-light leading-relaxed">
            Hum tamam dry fruits, cold-pressed oils, wild honey, aur Shilajeet khud tayyar aur extract karte hain. Har cheez 100% pure, taza aur qudrati hoti hai — zero middleman, zero compromise.
          </p>
        </div>

        {/* 4 Core Offerings Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {OFFERS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e5dcd3] shadow-md hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start overflow-hidden relative"
            >
              {/* Image Preview Box */}
              <div className="relative w-full sm:w-36 aspect-square rounded-xl overflow-hidden shrink-0 bg-zinc-100 border border-zinc-200/80 shadow-xs">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 150px"
                  className="object-cover"
                />
              </div>

              {/* Copy Box */}
              <div className="flex-1 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#a8744b] bg-[#f7efe8] px-2.5 py-0.5 rounded-full border border-[#ebdcd0]">
                    {item.badge}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#312117] flex items-center justify-center shadow-xs">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-xl font-serif text-zinc-900 font-medium pt-1">
                  {item.title}
                </h3>
                <span className="block text-xs font-semibold text-[#8c6547] uppercase tracking-wider">
                  {item.subtitle}
                </span>

                <p className="text-zinc-600 text-xs sm:text-sm font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
