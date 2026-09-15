// components/NewsletterBanner.tsx
"use client";

// Explicitly importing FormEvent fixes the deprecation/linting warning
import { type FormEvent, useState } from "react";

// Deployed Google Apps Script Web App URL
const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxZ5gYxs9h3FwdBICTNlCi2E8RgwtqPVEOuBpmk2bEeKERLQG9eiUH6BFV2Zw0PaDwp/exec";

export default function NewsletterBanner() {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      await fetch(WEB_APP_URL, {
        method: "POST",
        mode: "no-cors", // Required to bypass CORS parameters with Apps Script redirects
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // Because mode is 'no-cors', if the pipeline completes without throwing, it was successful.
      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Subscription pipeline error:", error);
      setStatus("error");
    }
  };

  return (
    <section className="w-full bg-[#f3ece7] py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Core Card Outer Layer */}
        <div className="w-full bg-[#36251c] text-white rounded-xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 sm:gap-12 shadow-xl border border-[#2b1d16]">
          {/* Left Text Segment */}
          <div className="max-w-xl">
            <h3 className="text-3xl sm:text-4xl font-serif text-zinc-100 mb-4 tracking-wide">
              Join Our Community
            </h3>
            <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
              Receive exclusive access to new harvests, heritage recipes, and
              seasonal sourcing stories.
            </p>
          </div>

          {/* Right Input Form Segment */}
          <div className="w-full lg:max-w-md">
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-stretch gap-3 w-full"
            >
              <div className="relative flex-grow">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  disabled={status === "success" || status === "loading"}
                  className="w-full px-5 py-3.5 bg-white/10 text-zinc-100 placeholder-zinc-500 rounded-md text-sm border border-white/10 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all duration-300 disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="px-8 py-3.5 bg-white text-[#36251c] hover:bg-zinc-100 text-xs font-semibold uppercase tracking-widest rounded-md transition-colors duration-300 shadow-md whitespace-nowrap disabled:opacity-70"
              >
                {status === "loading"
                  ? "SUBSCRIBING..."
                  : status === "success"
                    ? "SUBSCRIBED"
                    : "SUBSCRIBE"}
              </button>
            </form>

            {status === "success" && (
              <p className="text-xs text-emerald-400 mt-3 font-medium tracking-wide animate-fade-in">
                Thank you! You have been successfully added to our inner circle
                updates.
              </p>
            )}

            {status === "error" && (
              <p className="text-xs text-rose-400 mt-3 font-medium tracking-wide">
                Something went wrong. Please check your network connection and
                try again.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
