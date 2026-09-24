"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
// Import authentication tracking context elements
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/shop" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Terms & Policy", href: "/terms-and-policies" },
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
  const { isAuthenticated, openAuthModal } = useAuth();
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
      openAuthModal("login");
    } else {
      router.push("/account/orders");
    }
  };

  return (
    <header className="border-b border-black/10 bg-white relative z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-serif text-3xl font-black uppercase tracking-tight [word-spacing:10px] text-black sm:text-4xl"
        >
          Healthy Basket
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-10 md:flex group/nav"
        >
          {navigationItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                data-no-ripple="true"
                className={`py-1 text-[15px] font-medium transition-colors group/item ${
                  isActive
                    ? "text-black font-semibold"
                    : "text-black/70 hover:text-black"
                }`}
              >
                <span className="relative inline-block">
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-black transition-all duration-300 ease-out ${
                      isActive
                        ? "w-full group-hover/nav:w-0 group-hover/item:!w-full"
                        : "w-0 group-hover/item:w-full"
                    }`}
                  />
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 text-black">
          {/* Account Profile Button with Tooltip */}
          <div className="relative group/account">
            <button
              type="button"
              onClick={handleAccountClick}
              data-no-ripple="true"
              aria-label="Account"
              className="p-2.5 rounded-full hover:bg-zinc-100 transition-all duration-200 cursor-pointer flex items-center justify-center text-zinc-800 hover:text-black"
            >
              <UserIcon />
            </button>
            {/* Tooltip */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-[#1a120c]/90 backdrop-blur-md text-white text-[11px] font-medium rounded-lg shadow-xl border border-amber-900/30 whitespace-nowrap opacity-0 -translate-y-1 group-hover/account:opacity-100 group-hover/account:translate-y-0 transition-all duration-200 pointer-events-none z-50 flex flex-col items-center">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1a120c]/90 rotate-45 border-l border-t border-amber-900/30" />
              <span>{isAuthenticated ? "My Account & Orders" : "Sign In / Account"}</span>
            </div>
          </div>

          {/* Cart Icon Button with Tooltip */}
          <div className="relative group/cart">
            <Link href="/cart" aria-label={`Cart (${totalItems} items)`} data-no-ripple="true">
              <div
                ref={cartIconRef}
                className="relative p-2.5 rounded-full hover:bg-zinc-100 transition-all duration-200 cursor-pointer flex items-center justify-center text-zinc-800 hover:text-black"
              >
                <CartIcon />
                {totalItems > 0 && (
                  <span
                    key={totalItems} // re-mount to retrigger scale animation on count change
                    className={`
                      absolute top-1 right-1
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
            {/* Tooltip */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-[#1a120c]/90 backdrop-blur-md text-white text-[11px] font-medium rounded-lg shadow-xl border border-amber-900/30 whitespace-nowrap opacity-0 -translate-y-1 group-hover/cart:opacity-100 group-hover/cart:translate-y-0 transition-all duration-200 pointer-events-none z-50 flex flex-col items-center">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1a120c]/90 rotate-45 border-l border-t border-amber-900/30" />
              <span>Shopping Cart {totalItems > 0 ? `(${totalItems})` : "(Empty)"}</span>
            </div>
          </div>
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
