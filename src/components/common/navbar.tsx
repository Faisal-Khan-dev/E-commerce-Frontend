"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
// Import authentication tracking context elements
import { useAuth } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/shop" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
];

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 21a8 8 0 10-16 0"
      />
      <circle cx="12" cy="8" r="3.25" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 4h2l2.2 10.5A2 2 0 009.15 16h7.7a2 2 0 001.95-1.55L20 8H6.2"
      />
      <circle cx="10" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const { totalItems, cartIconRef, lastAdded } = useCart();
  const { isAuthenticated } = useAuth();
  const [pulse, setPulse] = useState(false);

  // Trigger pulse animation whenever a new item is added
  useEffect(() => {
    if (lastAdded !== null) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 600);
      return () => clearTimeout(t);
    }
  }, [lastAdded]);

  // Handle protected account navigation route state gating with deep redirect matching
  const handleAccountClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push(`/login?redirect=/account/orders`);
    } else {
      router.push("/account/orders");
    }
  };

  return (
    <header className="border-b border-black/10 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-serif text-3xl font-black uppercase tracking-tight [word-spacing:10px] text-black sm:text-4xl"
        >
          Healthy Basket
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-10 md:flex"
        >
          {navigationItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const base = "text-[15px] font-medium transition-colors";
            const normal = "text-black/70 hover:text-black";
            const active =
              "underline decoration-black underline-offset-4 text-black";

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`${base} ${isActive ? active : normal}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 text-black">
          <button
            type="button"
            onClick={handleAccountClick}
            aria-label="Account"
            className="transition-opacity hover:opacity-70 cursor-pointer"
          >
            <UserIcon />
          </button>

          {/* Cart button with badge */}
          <Link href="/cart" aria-label={`Cart (${totalItems} items)`}>
            {/* This div is the ref target for the fly-to animation */}
            <div
              ref={cartIconRef}
              className="relative transition-opacity hover:opacity-70"
            >
              <CartIcon />
              {totalItems > 0 && (
                <span
                  key={totalItems} // re-mount to retrigger scale animation on count change
                  className={`
                    absolute -top-2 -right-2.5
                    min-w-[18px] h-[18px] px-1
                    flex items-center justify-center
                    rounded-full
                    bg-[#312117] text-white
                    text-[10px] font-bold leading-none
                    select-none
                    ${pulse ? "animate-cart-pop" : ""}
                  `}
                  style={{
                    animation: pulse
                      ? "cartPop 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both"
                      : undefined,
                  }}
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* Keyframes injected inline for the pop animation */}
      <style>{`
        @keyframes cartPop {
          0%   { transform: scale(1); }
          30%  { transform: scale(1.5); }
          55%  { transform: scale(0.85); }
          75%  { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      `}</style>
    </header>
  );
}
