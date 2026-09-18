// components/contact/contact-faq-map.tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function ContactFaqMap() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Side: Map Widget Card with Location Badge */}
        <div className="lg:col-span-7 relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-200/40 shadow-sm group">
          <div
            className="absolute inset-0 bg-cover bg-center filter invert opacity-25 brightness-110 contrast-120 transition-transform duration-700 group-hover:scale-[1.01]"
            style={{
              backgroundImage: `url('/inquy-pic.png')`,
            }}
          />
          <div className="absolute inset-0 bg-radial-gradient from-black/10 to-black/60" />

          {/* Overlay Floating Location Pin Badge */}
          <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-xl p-4 border border-zinc-200/80 max-w-xs shadow-lg text-left">
            <h4 className="text-xs font-bold tracking-wider text-zinc-900 uppercase mb-0.5">
              Find us in Karachi
            </h4>
            <p className="text-xs text-zinc-700 font-medium">
              Qayyumabad, Korangi Road, Karachi
            </p>
            <p className="text-[10px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Open 24 hours
            </p>
          </div>
        </div>

        {/* Right Side: Common Inquiries Accordion Text List */}
        <div className="lg:col-span-5 text-left space-y-6">
          <h3 className="text-xl font-serif tracking-wide text-zinc-900">
            Common Inquiries
          </h3>

          <div className="space-y-5">
            {/* FAQ Block 1 */}
            <div className="space-y-1">
              <h4 className="text-[11px] font-bold tracking-widest uppercase text-zinc-800">
                Are products lab tested?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed line-clamp-2">
                Yes, every batch undergoes clinical lab testing to ensure 100% purity, zero additives, and maximum natural bio-potency.
              </p>
            </div>

            {/* FAQ Block 2 */}
            <div className="space-y-1 border-t border-zinc-200/60 pt-4">
              <h4 className="text-[11px] font-bold tracking-widest uppercase text-zinc-800">
                Do you ship all over the country?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed line-clamp-2">
                Yes, we deliver safely across Karachi, Lahore, Islamabad, and all cities nationwide with fast door-step shipping.
              </p>
            </div>

            {/* FAQ Block 3 */}
            <div className="space-y-1 border-t border-zinc-200/60 pt-4">
              <h4 className="text-[11px] font-bold tracking-widest uppercase text-zinc-800">
                Do you extract oil on your own?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed line-clamp-2">
                Yes, all essential oils are 100% cold-pressed and extracted in-house to retain pure unrefined botanical nutrients.
              </p>
            </div>

            {/* Link Routing Anchor Trigger to Terms & Policy */}
            <div className="pt-3 border-t border-zinc-200/60">
              <Link
                href="/terms-and-policies"
                data-no-ripple="true"
                className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-[#312117] hover:text-[#312117] bg-transparent group relative py-0.5"
              >
                <span className="relative">
                  View All FAQs
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#312117] transition-all duration-300 ease-out group-hover:w-full" />
                </span>
                <ChevronRight className="w-4 h-4 text-[#312117] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
