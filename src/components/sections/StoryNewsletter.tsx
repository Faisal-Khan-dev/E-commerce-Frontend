// components/story/story-newsletter.tsx
"use client";

import { type FormEvent, useState } from "react";

// Deployed Google Apps Script Web App URL
const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxZ5gYxs9h3FwdBICTNlCi2E8RgwtqPVEOuBpmk2bEeKERLQG9eiUH6BFV2Zw0PaDwp/exec";

export function StoryNewsletter() {
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
        mode: "no-cors", // Required to bypass CORS restriction policies with Apps Script
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // Because mode is 'no-cors', if the network call didn't throw, it successfully recorded.
      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Apothecary subscriber pipeline error:", error);
      setStatus("error");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="bg-[#312117] rounded-xl px-6 py-12 sm:p-16 lg:p-20 text-white flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 shadow-lg relative overflow-hidden">
        {/* Subtle geometric structural design circle trace light paths */}
        <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full border border-white/5 opacity-5 pointer-events-none" />

        <div className="space-y-3 max-w-md text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl font-serif tracking-wide">
            Join the Apothecary Circle
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
            Receive exclusive insights into our seasonal harvests and
            limited-edition releases.
          </p>
        </div>

        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-stretch gap-3 w-full"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              disabled={status === "success" || status === "loading"}
              className="flex-grow bg-white/10 border border-white/10 rounded-md px-4 py-3.5 text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="bg-white hover:bg-zinc-100 text-[#312117] text-xs font-semibold tracking-widest uppercase px-6 py-4 rounded-md transition-all duration-200 shrink-0 disabled:opacity-70"
            >
              {status === "loading"
                ? "Subscribing..."
                : status === "success"
                  ? "Subscribed"
                  : "Subscribe"}
            </button>
          </form>

          {status === "success" && (
            <p className="text-xs text-emerald-400 mt-3 font-medium tracking-wide text-center lg:text-left">
              Welcome to the inner circle! Your entry has been processed.
            </p>
          )}

          {status === "error" && (
            <p className="text-xs text-rose-400 mt-3 font-medium tracking-wide text-center lg:text-left">
              An issue occurred. Check your network context and retry.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}