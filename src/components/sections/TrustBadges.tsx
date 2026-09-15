// components/story/story-trust-badges.tsx
export function StoryTrustBadges() {
  const BADGES = [
    "Certified Earth-Friendly",
    "Rigorous Purity Checks",
    "Supporting Local Harvesters",
  ];

  return (
    <section className="w-full bg-[#f5efe9]/30 py-12 border-b border-zinc-200/40">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 items-center justify-center divide-y sm:divide-y-0 sm:divide-x divide-zinc-200">
          {BADGES.map((text, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center gap-2 pt-4 sm:pt-0 first:pt-0"
            >
              {/* Abstract structural circular line seal wrapper icon outline */}
              <div className="w-10 h-10 rounded-full border border-zinc-300 flex items-center justify-center text-[9px] font-serif font-bold text-zinc-400 select-none bg-white/40">
                100%
              </div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-600 text-center px-4">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
