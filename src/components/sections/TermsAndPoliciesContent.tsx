"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Lock,
  PhoneCall,
  Clock,
} from "lucide-react";

interface TermsProps {
  initialTab?: "terms" | "privacy" | "shipping" | "returns";
}

export default function TermsAndPoliciesContent({ initialTab = "terms" }: TermsProps) {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  const tabs = [
    { id: "terms", label: "Terms of Service", icon: FileText },
    { id: "privacy", label: "Privacy Policy", icon: ShieldCheck },
    { id: "shipping", label: "Shipping & Delivery", icon: Truck },
    { id: "returns", label: "Returns & Refunds", icon: RotateCcw },
  ];

  return (
    <div className="w-full bg-[#fcf9f6] min-h-screen text-zinc-900 pb-20">
      {/* 1. IMMERSIVE HERO HEADER SECTION WITH BACKGROUND IMAGE */}
      <section className="relative w-full min-h-[440px] sm:min-h-[480px] flex items-center justify-center overflow-hidden py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        {/* Background Image */}
        <Image
          src="/terms-hero-bg.jpg"
          alt="Organic dried fruit orchard harvest at golden hour sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.5] contrast-[1.08] scale-105 transition-transform duration-1000"
        />

        {/* Layered Gradient Overlays matching warm deep mahogany store theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#312117]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,163,115,0.12)_0%,transparent_70%)] pointer-events-none" />

        {/* Hero Central Content */}
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-semibold tracking-[0.25em] uppercase text-[#d4a373] shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#d4a373]" />
            Healthy Basket Governance
          </div>

          {/* Main Hero Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-amber-50 drop-shadow-md max-w-3xl mx-auto leading-tight">
            Terms & Store Policies
          </h1>

          {/* Subtitle */}
          <p className="text-zinc-200 text-xs sm:text-base font-light max-w-2xl mx-auto leading-relaxed drop-shadow-xs">
            Complete guidelines on organic quality standards, nationwide shipping, return guarantees, and secure transaction privacy.
          </p>

          {/* BELOW THE TEXT: PROFESSIONAL MATCHING GLASSMORPHIC TRUST CARDS */}
          <div className="pt-3 max-w-5xl mx-auto space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              {/* Card 1 */}
              <div className="group relative bg-[#2b1c13]/70 backdrop-blur-md border border-[#d4a373]/30 hover:border-[#d4a373] p-4 rounded-xl text-white transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl hover:bg-[#2b1c13]/85 overflow-hidden">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#d4a373]/20 border border-[#d4a373]/40 flex items-center justify-center text-[#d4a373] group-hover:bg-[#d4a373] group-hover:text-[#2b1c13] transition-colors shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-serif font-medium text-sm tracking-wide text-amber-50 group-hover:text-white">
                      100% Organic
                    </h3>
                    <p className="text-[11px] text-zinc-300 font-light leading-snug">
                      Certified lab-tested & pesticide-free harvest.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative bg-[#2b1c13]/70 backdrop-blur-md border border-[#d4a373]/30 hover:border-[#d4a373] p-4 rounded-xl text-white transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl hover:bg-[#2b1c13]/85 overflow-hidden">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#d4a373]/20 border border-[#d4a373]/40 flex items-center justify-center text-[#d4a373] group-hover:bg-[#d4a373] group-hover:text-[#2b1c13] transition-colors shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-serif font-medium text-sm tracking-wide text-amber-50 group-hover:text-white">
                      Express Delivery
                    </h3>
                    <p className="text-[11px] text-zinc-300 font-light leading-snug">
                      Dispatched within 24–48 hours nationwide.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative bg-[#2b1c13]/70 backdrop-blur-md border border-[#d4a373]/30 hover:border-[#d4a373] p-4 rounded-xl text-white transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl hover:bg-[#2b1c13]/85 overflow-hidden">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#d4a373]/20 border border-[#d4a373]/40 flex items-center justify-center text-[#d4a373] group-hover:bg-[#d4a373] group-hover:text-[#2b1c13] transition-colors shrink-0">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-serif font-medium text-sm tracking-wide text-amber-50 group-hover:text-white">
                      7-Day Guarantee
                    </h3>
                    <p className="text-[11px] text-zinc-300 font-light leading-snug">
                      Hassle-free product replacement or refund.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="group relative bg-[#2b1c13]/70 backdrop-blur-md border border-[#d4a373]/30 hover:border-[#d4a373] p-4 rounded-xl text-white transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl hover:bg-[#2b1c13]/85 overflow-hidden">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#d4a373]/20 border border-[#d4a373]/40 flex items-center justify-center text-[#d4a373] group-hover:bg-[#d4a373] group-hover:text-[#2b1c13] transition-colors shrink-0">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-serif font-medium text-sm tracking-wide text-amber-50 group-hover:text-white">
                      Secure Audit
                    </h3>
                    <p className="text-[11px] text-zinc-300 font-light leading-snug">
                      Encrypted transaction verification pipeline.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 text-[11px] text-zinc-300 font-mono pt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#d4a373]" /> Last Updated: September 2026
              </span>
              <span>•</span>
              <span>Official Store Policy v2.4</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STICKY NAVIGATION TABS STRIP - ALIGNED TO START / LEFT */}
      <div className="sticky top-0 z-30 bg-[#fcf9f6]/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start py-3.5 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2.5 sm:gap-3">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${isActive
                        ? "bg-[#312117] text-white border border-[#312117] shadow-sm font-semibold scale-102"
                        : "bg-white text-zinc-700 border border-stone-200/90 shadow-2xs hover:text-[#312117] hover:border-[#312117] hover:shadow-xs"
                      }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#d4a373]" : "text-stone-400"}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN CONTENT CONTAINER - CLEAN SINGLE COLUMN CONTAINER */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">

        {/* TAB 1: TERMS OF SERVICE */}
        {activeTab === "terms" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-2xs space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-stone-200">
                <div className="p-2.5 bg-[#f5efe9] text-[#312117] rounded-xl">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl text-zinc-900">Terms of Service & Store Rules</h2>
                  <p className="text-xs text-zinc-400 font-light">Rules governing website access, order placements, and customer agreements.</p>
                </div>
              </div>

              <div className="space-y-6 text-xs sm:text-sm text-zinc-600 leading-relaxed font-light">
                <div className="space-y-2">
                  <h3 className="font-serif font-semibold text-zinc-900 text-sm text-amber-950">Agreement & Acceptance</h3>
                  <p>
                    By accessing or placing an order on Healthy Basket, you explicitly agree to comply with our operating terms and store policies. These guidelines ensure an authentic, safe, and transparent shopping experience for all our valued customers.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif font-semibold text-zinc-900 text-sm text-amber-950">Account Responsibility & Order Placement</h3>
                  <ul className="space-y-2 pl-1">
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4a373] font-bold mt-0.5">•</span>
                      <span>You are responsible for maintaining the confidentiality of your account credentials and login details.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4a373] font-bold mt-0.5">•</span>
                      <span>Orders placed under your account are presumed to be placed with your authorization.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4a373] font-bold mt-0.5">•</span>
                      <span>Please ensure delivery address and contact information are accurate to avoid shipment delays.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif font-semibold text-zinc-900 text-sm text-amber-950">Product Quality & Organic Standards</h3>
                  <ul className="space-y-2 pl-1">
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4a373] font-bold mt-0.5">•</span>
                      <span>All Healthy Basket provisions—including premium dry fruits, cold-pressed dry fruit oils, 100% pure bee honey, and authentic Himalayan Shilajeet—are completely natural, unadulterated, and free from synthetic chemicals or artificial preservatives.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4a373] font-bold mt-0.5">•</span>
                      <span>Because dry fruits, natural bee honey, cold-pressed oils, and Shilajeet are pure organic products, minor seasonal variations in aroma, color shade, density, or natural crystallization are true hallmarks of unbleached authenticity.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4a373] font-bold mt-0.5">•</span>
                      <span>Prices are stated in Pakistani Rupees (PKR) and may be updated periodically based on seasonal harvest yields and raw supply availability.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif font-semibold text-zinc-900 text-sm text-amber-950">Recommended Freshness & Storage Care</h3>
                  <ul className="space-y-2 pl-1">
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4a373] font-bold mt-0.5">•</span>
                      <span><strong>Dry Fruits & Nuts:</strong> Store raw nuts (walnuts, almonds, pine nuts) and dried fruits (dates, figs, apricots) in airtight containers inside a cool, dry refrigerator (4°C – 8°C) away from ambient humidity.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4a373] font-bold mt-0.5">•</span>
                      <span><strong>Cold-Pressed Dry Fruit Oils:</strong> Keep pure Almond oil, Walnut oil, and organic nut oils tightly sealed in amber glass bottles in a dark, cool pantry away from direct heat or sunlight.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4a373] font-bold mt-0.5">•</span>
                      <span><strong>Pure Bee Honey:</strong> Store raw bee honey at room temperature in a dry location. Natural crystallization of unheated raw honey is completely normal and can be softened by placing the jar in warm water.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4a373] font-bold mt-0.5">•</span>
                      <span><strong>Himalayan Shilajeet Resin:</strong> Keep purified Shilajeet containers tightly capped in a dry room temperature setting to preserve its natural mineral resin consistency.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRIVACY POLICY */}
        {activeTab === "privacy" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-2xs space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-stone-200">
                <div className="p-2.5 bg-[#f5efe9] text-[#312117] rounded-xl">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl text-zinc-900">Privacy & Personal Data Protection</h2>
                  <p className="text-xs text-zinc-400 font-light">How we collect, protect, and handle customer information securely.</p>
                </div>
              </div>

              <div className="space-y-6 text-xs sm:text-sm text-zinc-600 leading-relaxed font-light">
                <div className="space-y-2">
                  <h3 className="font-serif font-semibold text-zinc-900 text-sm text-amber-950">Information Collection & Purpose</h3>
                  <p>
                    We collect essential personal information required strictly to fulfill your orders. This includes your name, shipping address, active contact phone number, email address, and transaction proof receipts.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif font-semibold text-zinc-900 text-sm text-amber-950">Zero Third-Party Data Sharing Commitment</h3>
                  <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-xs text-emerald-900 flex items-start gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>
                      <strong>Strict Data Guarantee:</strong> We never sell, rent, lease, or share your personal details or contact numbers with third-party advertisers or marketing aggregators under any circumstances.
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif font-semibold text-zinc-900 text-sm text-amber-950">Payment Verification Security</h3>
                  <ul className="space-y-2 pl-1">
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4a373] font-bold mt-0.5">•</span>
                      <span>Payment screenshots uploaded for bank transfer or mobile wallet verification are stored securely in encrypted storage pipelines.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4a373] font-bold mt-0.5">•</span>
                      <span>Payment receipts are inspected exclusively by authorized accounts personnel for transaction confirmation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4a373] font-bold mt-0.5">•</span>
                      <span>Delivery details are shared strictly with accredited courier services to complete physical delivery to your doorstep.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SHIPPING & DELIVERY */}
        {activeTab === "shipping" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-2xs space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-stone-200">
                <div className="p-2.5 bg-[#f5efe9] text-[#312117] rounded-xl">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl text-zinc-900">Nationwide Shipping & Delivery Guidelines</h2>
                  <p className="text-xs text-zinc-400 font-light">Fast dispatch times, shipping rates, and packaging standards.</p>
                </div>
              </div>

              <div className="space-y-6 text-xs sm:text-sm text-zinc-600 leading-relaxed font-light">
                <div className="space-y-2">
                  <h3 className="font-serif font-semibold text-zinc-900 text-sm text-amber-950">Express Order Dispatch</h3>
                  <p>
                    All orders are processed and dispatched within 24 to 48 business hours following order placement. Products are sealed in food-grade, air-tight pouches to ensure maximum organic freshness during delivery.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif font-semibold text-zinc-900 text-sm text-amber-950">Regional Timelines & Rates</h3>
                  <div className="overflow-x-auto rounded-xl border border-stone-200">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#f5efe9] text-zinc-900 border-b border-stone-200">
                          <th className="p-3 font-semibold">Destination Region</th>
                          <th className="p-3 font-semibold">Estimated Delivery Time</th>
                          <th className="p-3 font-semibold">Shipping Fee</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200 bg-white">
                        <tr>
                          <td className="p-3 font-medium text-zinc-800">Major Cities (Lahore, Karachi, Islamabad, etc.)</td>
                          <td className="p-3">2 – 3 Business Days</td>
                          <td className="p-3 text-emerald-700 font-semibold">Rs. 250 (Free over Rs. 3,500)</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-zinc-800">Other Cities & Towns</td>
                          <td className="p-3">3 – 5 Business Days</td>
                          <td className="p-3 text-emerald-700 font-semibold">Rs. 250</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-zinc-800">Remote & Rural Areas</td>
                          <td className="p-3">5 – 7 Business Days</td>
                          <td className="p-3 text-emerald-700 font-semibold">Rs. 300</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif font-semibold text-zinc-900 text-sm text-amber-950">Delivery Package Inspection</h3>
                  <ul className="space-y-2 pl-1">
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4a373] font-bold mt-0.5">•</span>
                      <span>Please inspect outer packaging integrity prior to accepting delivery from courier personnel.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4a373] font-bold mt-0.5">•</span>
                      <span>If outer box seals appear broken or opened, refuse acceptance and inform our support team immediately.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: RETURNS & REFUNDS */}
        {activeTab === "returns" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-2xs space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-stone-200">
                <div className="p-2.5 bg-[#f5efe9] text-[#312117] rounded-xl">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl text-zinc-900">7-Day Return & Replacement Policy</h2>
                  <p className="text-xs text-zinc-400 font-light">Simple criteria for product replacements, quality claims, and refunds.</p>
                </div>
              </div>

              <div className="space-y-6 text-xs sm:text-sm text-zinc-600 leading-relaxed font-light">
                <div className="space-y-2">
                  <h3 className="font-serif font-semibold text-zinc-900 text-sm text-amber-950">7-Day Replacement Guarantee</h3>
                  <p>
                    Customer satisfaction is our highest priority. You may request a free replacement or full refund within <strong>7 days of receiving your order</strong> under the following conditions:
                  </p>
                  <ul className="space-y-2 pl-1 pt-1">
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4a373] font-bold mt-0.5">•</span>
                      <span>You received incorrect product items or mismatched weight sizes.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4a373] font-bold mt-0.5">•</span>
                      <span>Product packaging seals were damaged or compromised during transit.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4a373] font-bold mt-0.5">•</span>
                      <span>Quality defects verified upon unboxing (photo or video proof requested).</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif font-semibold text-zinc-900 text-sm text-amber-950">Refund Settlement Timelines</h3>
                  <ul className="space-y-2 pl-1">
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4a373] font-bold mt-0.5">•</span>
                      <span>Once a returned parcel is inspected at our center, approved refunds are processed within 3–5 working days.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4a373] font-bold mt-0.5">•</span>
                      <span>Refunds are transferred directly to your designated Bank Account, EasyPaisa, or JazzCash account.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STILL HAVE QUESTIONS BANNER */}
        <div className="bg-[#312117] text-white p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="font-serif text-lg sm:text-xl text-amber-50">Still Have Questions About Our Terms?</h3>
            <p className="text-xs text-zinc-300 font-light max-w-md leading-relaxed">
              Our customer care team is available to assist you with order verification, policy clarifications, or bulk corporate inquiries.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact-us"
              data-hover-bg="#d4a373"
              data-hover-text="#24150d"
              className="px-6 py-3 bg-white text-[#312117] hover:bg-[#d4a373] hover:text-[#24150d] text-xs font-semibold uppercase tracking-wider rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Support</span>
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
