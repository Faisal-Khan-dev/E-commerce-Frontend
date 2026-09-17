"use client";

import { useState } from "react";

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = "923459270654";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    "Hello! I am browsing Healthy Basket and would like to inquire about your organic dry fruits."
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group pointer-events-auto select-none">
      {/* Tooltip text box popping out smoothly on hover */}
      <div
        className={`mr-3 px-4 py-2 bg-[#1a120c]/90 backdrop-blur-md text-white text-xs font-medium rounded-xl shadow-xl border border-amber-900/30 transition-all duration-300 transform origin-right flex items-center gap-2.5 ${
          isHovered
            ? "opacity-100 translate-x-0 scale-100"
            : "opacity-0 translate-x-4 scale-95 pointer-events-none sm:group-hover:opacity-100 sm:group-hover:translate-x-0 sm:group-hover:scale-100"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <div className="flex flex-col">
          <span className="font-semibold text-zinc-100">Need Quick Support?</span>
          <span className="text-[11px] text-emerald-400 font-medium">Chat on WhatsApp</span>
        </div>
      </div>

      {/* Main WhatsApp Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-no-ripple="true"
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        style={{
          animation: "waBouncePulse 2.8s ease-in-out infinite",
        }}
      >
        {/* Concentric infinite ripple aura rings */}
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] pointer-events-none"
          style={{
            animation: "waRingRipple 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite",
          }}
        />
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] pointer-events-none"
          style={{
            animation: "waRingRipple 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite 1.2s",
          }}
        />

        {/* Online Status Green Badge Dot */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full z-10 shadow-sm flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        </span>

        {/* SVG WhatsApp Logo */}
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 fill-white drop-shadow-md z-10 transition-transform duration-300 group-hover:rotate-12"
          aria-hidden="true"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l.999 1.583-1.048 3.828 3.896-1.022.896.278z" />
          <path d="M8.286 6.516c-.23-.51-.471-.52-.69-.529-.18-.008-.387-.008-.594-.008s-.542.077-.826.387c-.284.31-1.085 1.059-1.085 2.582 0 1.523 1.111 2.993 1.266 3.2 0 .206 2.138 3.407 5.283 4.673.748.301 1.332.481 1.787.625.751.238 1.436.204 1.977.123.603-.09 1.859-.76 2.122-1.496.262-.736.262-1.368.183-1.496-.078-.129-.284-.206-.593-.361-.309-.155-1.833-.904-2.116-1.007-.283-.103-.49-.155-.697.155-.207.31-.8 1.007-.981 1.213-.18.207-.361.232-.67.077-.309-.155-1.306-.481-2.488-1.535-.92-.821-1.541-1.834-1.722-2.144-.18-.31-.019-.478.135-.632.139-.139.309-.361.464-.542.155-.181.206-.31.309-.516.103-.207.052-.387-.026-.542-.077-.155-.693-1.676-.957-2.296z" />
        </svg>
      </a>
    </div>
  );
}
