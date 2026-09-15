// app/(shop)/account/tracking/page.tsx
"use client";

import Image from "next/image";
import { TrackingTimeline } from "@/components/sections/TrackingTimeline";

const MOCK_TRACKING_MILESTONES = [
  { label: "Order Placed", isCompleted: true },
  { label: "Processing", isCompleted: true },
  { label: "Shipped", isCompleted: true },
  { label: "Out for Delivery", isCompleted: false },
  { label: "Delivered", isCompleted: false },
];

export default function CustomerTrackingPage() {
  return (
    <main className="md:col-span-9 lg:col-span-9 space-y-10">
      {/* 1. Milestone Progress Deck Widget */}
      <TrackingTimeline
        orderId="AR-88219"
        status="In Transit"
        estimatedDelivery="Oct 24, 2024"
        milestones={MOCK_TRACKING_MILESTONES}
      />

      {/* 2. Isolated Product Info Breakdown Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-serif text-zinc-900 tracking-wide text-left">
          Tracking Order
        </h3>

        {/* Individual Item Display Variant Card (Max Bound Landscape Layout Grid Context) */}
        <div className="bg-white border border-zinc-200/50 rounded-xl overflow-hidden max-w-xl text-left shadow-2xs">
          <div className="relative aspect-[16/8] w-full bg-[#f6f6f6]">
            <Image
              src="/order-card-pic.png"
              alt="Himalayan Shilajeet Resin Luxury Apothecary Jar Product Focus"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
              priority
            />
            <span className="absolute top-3 right-3 text-[9px] font-semibold tracking-wider uppercase px-2 py-1 bg-white/95 backdrop-blur-xs text-zinc-800 rounded-sm border border-zinc-200/20 shadow-3xs">
              Out For Delivery
            </span>
          </div>

          <div className="p-5 flex justify-between items-baseline gap-4">
            <div className="space-y-0.5">
              <h4 className="font-serif text-lg text-zinc-900 tracking-wide font-normal">
                Himalayan Shilajeet Resin
              </h4>
              <p className="text-[11px] text-zinc-400 font-light">
                Ordered: Sept 12, 2024
              </p>
            </div>
            <span className="font-serif text-lg text-stone-500 font-light shrink-0">
              Rs. 120
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
