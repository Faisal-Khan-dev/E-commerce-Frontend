// components/contact/contact-faq-map.tsx
import { ChevronRight } from "lucide-react";

export function ContactFaqMap() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Side: Clean Minimalist Structural Map Widget Card */}
        <div className="lg:col-span-7 relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-200/40 shadow-sm group">
          {/* Using custom monochrome structured line layout placeholder image to represent clean map layout lines */}
          <div
            className="absolute inset-0 bg-cover bg-center filter invert opacity-25 brightness-110 contrast-120 transition-transform duration-700 group-hover:scale-[1.01]"
            style={{
              backgroundImage: `url('/inquy-pic.png')`,
            }}
          />
          <div className="absolute inset-0 bg-radial-gradient from-black/10 to-black/60" />

          {/* Overlay Floating Location Pin Badge */}
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-xs rounded-xl p-4 border border-zinc-200 max-w-xs shadow-md text-left">
            <h4 className="text-xs font-bold tracking-wider text-zinc-900 uppercase mb-0.5">
              Find us in Bel Air
            </h4>
            <p className="text-[11px] text-zinc-500 font-light">
              Open daily: 10:00 AM — 6:00 PM
            </p>
          </div>
        </div>

        {/* Right Side: Common Inquiries Accordion Text List */}
        <div className="lg:col-span-5 text-left space-y-6">
          <h3 className="text-lg font-serif tracking-wide text-zinc-900">
            Common Inquiries
          </h3>

          <div className="space-y-5">
            {/* FAQ Block 1 */}
            <div className="space-y-1">
              <h4 className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">
                Do you ship internationally?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
                Yes, we provide expedited secure global shipping options to over
                40 countries worldwide.
              </p>
            </div>

            {/* FAQ Block 2 */}
            <div className="space-y-1 border-t border-zinc-200/60 pt-4">
              <h4 className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">
                Are products lab tested?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
                Every single production batch undergoes rigorous 3rd party
                testing protocols for total purity confirmation and bio-potency
                scores.
              </p>
            </div>

            {/* Link Routing Anchor Trigger */}
            <div className="pt-2 border-t border-zinc-200/60">
              <button className="text-[10px] font-bold tracking-widest uppercase text-zinc-800 hover:text-zinc-500 flex items-center gap-1 group transition-colors">
                <span>View All FAQs</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
