// components/Testimonials.tsx
"use client";

import { useState, useEffect } from "react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The quality of the Shilajeet is unparalleled. I've tried many sources, but Healthy Basket offers a level of potency and clarity that is truly exceptional.",
    author: "DR. HAMZA TARAR",
    role: "WELLNESS PRACTITIONER, ISLAMABAD",
  },
  {
    quote:
      "Their walnuts are structurally perfect and taste remarkably fresh. The clinical attention to processing and handling really sets them apart.",
    author: "CHEF BILAL TARIQ",
    role: "CULINARY EXPERT, LAHORE",
  },
  {
    quote:
      "The cold-pressed sweet almond oil has completely elevated our daily wellness routines. Absolute structural purity you can feel instantly.",
    author: "SYEDA AYESHA REHMAN",
    role: "HOLISTIC HEALTH COACH, KARACHI",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        setIsFading(false);
      }, 300);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const handleSelect = (idx: number) => {
    if (idx === activeIndex) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveIndex(idx);
      setIsFading(false);
    }, 300);
  };

  return (
    <section className="w-full bg-[#fcf9f6] py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Decorative Quotes Icon */}
        <span className="font-serif text-7xl sm:text-8xl text-zinc-300 leading-none select-none mb-4 block">
          &ldquo;
        </span>

        {/* Dynamic Testimonial Display Wrapper with Smooth 2-Second Transition */}
        <div className="min-h-[160px] sm:min-h-[120px] flex items-center justify-center mb-8">
          <p
            className={`text-xl sm:text-2xl lg:text-3xl font-serif text-zinc-900 italic tracking-wide leading-relaxed max-w-3xl text-balance transition-all duration-300 transform ${isFading
                ? "opacity-0 translate-y-2 scale-98"
                : "opacity-100 translate-y-0 scale-100"
              }`}
          >
            &ldquo;{TESTIMONIALS[activeIndex].quote}&rdquo;
          </p>
        </div>

        {/* Author / Designation attribution */}
        <span
          className={`text-xs font-semibold tracking-[0.2em] uppercase text-zinc-500 block mb-10 transition-all duration-300 ${isFading ? "opacity-0" : "opacity-100"
            }`}
        >
          — {TESTIMONIALS[activeIndex].author}, {TESTIMONIALS[activeIndex].role}
        </span>

        {/* Slidable Pagination Dash Indicators */}
        <div className="flex items-center gap-3">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`h-1 transition-all duration-300 ease-out rounded-full cursor-pointer ${idx === activeIndex
                  ? "w-10 bg-[#312117]"
                  : "w-4 bg-zinc-300 hover:bg-zinc-400"
                }`}
              aria-label={`Go to testimonial slider slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
