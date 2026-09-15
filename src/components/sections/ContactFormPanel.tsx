// components/contact/contact-form-panel.tsx
"use client";

import { useState, type FormEvent } from "react";
import { MapPin, Mail, Phone } from "lucide-react";

const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxv7OXdNeCSqB2wGceNeQbYm5AaNN38nbSxPjhsjiD1Tg1l1JyS3Lz3t80TBaf3wkYZ/exec";

export function ContactFormPanel() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "General Wellness Inquiry",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmitInquiry = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await fetch(WEB_APP_URL, {
        method: "POST",
        mode: "no-cors", // Bypasses explicit target script domain redirection flags
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setStatus("success");
      setFormData({
        fullName: "",
        email: "",
        subject: "General Wellness Inquiry",
        message: "",
      });
    } catch (error) {
      console.error("Inquiry pipeline submission breakdown:", error);
      setStatus("error");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Side: Handcrafted Presence Stack */}
        <div className="lg:col-span-5 space-y-10 text-left pt-2">
          <div className="space-y-6">
            <h2 className="text-xl font-serif tracking-wide text-zinc-900">
              Our Presence
            </h2>

            <div className="space-y-6">
              {/* Presence Row item 1 */}
              <div className="flex gap-4 items-start">
                <div className="p-2.5 bg-zinc-200/50 rounded-full border border-zinc-300/20 text-zinc-600 shrink-0">
                  <MapPin className="w-4 h-4 stroke-[1.5]" />
                </div>
                <div className="space-y-0.5 text-xs sm:text-sm">
                  <h3 className="font-bold tracking-wider uppercase text-[10px] text-zinc-400">
                    Boutique Atelier
                  </h3>
                  <p className="text-zinc-700 font-light leading-relaxed">
                    742 Heritage Oaks Lane
                    <br />
                    Bel Air, California 90077
                    <br />
                    United States
                  </p>
                </div>
              </div>

              {/* Presence Row item 2 */}
              <div className="flex gap-4 items-start">
                <div className="p-2.5 bg-zinc-200/50 rounded-full border border-zinc-300/20 text-zinc-600 shrink-0">
                  <Mail className="w-4 h-4 stroke-[1.5]" />
                </div>
                <div className="space-y-0.5 text-xs sm:text-sm">
                  <h3 className="font-bold tracking-wider uppercase text-[10px] text-zinc-400">
                    Concierge Email
                  </h3>
                  <p className="text-zinc-800 font-medium hover:underline cursor-pointer">
                    care@aureum.com
                  </p>
                </div>
              </div>

              {/* Presence Row item 3 */}
              <div className="flex gap-4 items-start">
                <div className="p-2.5 bg-zinc-200/50 rounded-full border border-zinc-300/20 text-zinc-600 shrink-0">
                  <Phone className="w-4 h-4 stroke-[1.5]" />
                </div>
                <div className="space-y-0.5 text-xs sm:text-sm">
                  <h3 className="font-bold tracking-wider uppercase text-[10px] text-zinc-400">
                    Private Line
                  </h3>
                  <p className="text-zinc-700 font-light">+1 (310) 555-0199</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Presence Tracking Bar */}
          <div className="space-y-2 pt-4 border-t border-zinc-200/60 max-w-xs">
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400">
              Follow The Journey
            </h4>
            <div className="flex gap-6 text-xs font-semibold text-zinc-800 tracking-wide">
              <span className="hover:text-zinc-500 transition-colors cursor-pointer">
                Instagram
              </span>
              <span className="hover:text-zinc-500 transition-colors cursor-pointer">
                Pinterest
              </span>
              <span className="hover:text-zinc-500 transition-colors cursor-pointer">
                LinkedIn
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Inquiry Box */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-zinc-200/30 p-6 sm:p-10 shadow-sm">
          <h2 className="text-xl font-serif tracking-wide text-zinc-900 mb-6 text-left">
            Send an Inquiry
          </h2>

          <form onSubmit={handleSubmitInquiry} className="space-y-5 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Julian Thorne"
                  value={formData.fullName}
                  disabled={status === "loading" || status === "success"}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full bg-[#fbf8f5] border border-zinc-200/60 rounded-lg px-4 py-3 text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none focus:border-zinc-400 focus:bg-white transition-all disabled:opacity-50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="julian@example.com"
                  value={formData.email}
                  disabled={status === "loading" || status === "success"}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-[#fbf8f5] border border-zinc-200/60 rounded-lg px-4 py-3 text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none focus:border-zinc-400 focus:bg-white transition-all disabled:opacity-50"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
                Subject
              </label>
              <select
                value={formData.subject}
                disabled={status === "loading" || status === "success"}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full bg-[#fbf8f5] border border-zinc-200/60 rounded-lg px-4 py-3 text-sm text-zinc-700 focus:outline-none focus:border-zinc-400 focus:bg-white transition-all appearance-none cursor-pointer disabled:opacity-50"
              >
                <option>General Wellness Inquiry</option>
                <option>Order Sourcing & Tracking</option>
                <option>Wholesale & Distribution Partnerships</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
                Your Message
              </label>
              <textarea
                required
                rows={4}
                placeholder="How can we assist you today?"
                value={formData.message}
                disabled={status === "loading" || status === "success"}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-[#fbf8f5] border border-zinc-200/60 rounded-lg px-4 py-3 text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none focus:border-zinc-400 focus:bg-white transition-all resize-none disabled:opacity-50"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="px-8 py-3.5 bg-[#312117] hover:bg-[#432f22] text-white text-xs font-semibold tracking-widest uppercase rounded-md shadow-md transition-all duration-200 active:scale-99 disabled:opacity-60"
              >
                {status === "loading"
                  ? "Sending..."
                  : status === "success"
                    ? "Sent Successfully"
                    : "Send Inquiry"}
              </button>
            </div>

            {status === "success" && (
              <p className="text-xs text-emerald-600 mt-2 font-medium tracking-wide">
                Thank you! Your message has been sent. We've sent a confirmation
                summary to your email.
              </p>
            )}

            {status === "error" && (
              <p className="text-xs text-rose-600 mt-2 font-medium tracking-wide">
                There was an issue processing your submission. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
