"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { History, Truck } from "lucide-react";

export function AccountSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  // Construct standard formatted display name strings from the authenticated context user type properties
  const displayName = user
    ? `${user.firstName} ${user.lastName}`.trim()
    : "Valued Customer";

  // Define navigational mapping endpoints
  const navItems = [
    {
      label: "Order History",
      href: "/account/orders",
      icon: History,
    },
    {
      label: "Tracking",
      href: "/account/tracking",
      icon: Truck,
    },
  ];

  return (
    <aside className="w-full space-y-6 text-left">
      {/* User Profile Badge */}
      <div className="space-y-1">
        <h1 className="text-xl font-serif text-zinc-900 tracking-wide font-normal">
          Welcome, {displayName}
        </h1>
        <p className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
          Account Panel
        </p>
      </div>

      {/* Control Actions Panel - Clear Next.js Navigation Paths */}
      <nav className="space-y-1" aria-label="Account Sub Navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-xs font-medium tracking-wide transition-all duration-150 ${
                isActive
                  ? "bg-[#3c3026] text-white shadow-xs"
                  : "bg-transparent text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
              }`}
            >
              <Icon className="w-4 h-4 stroke-[1.5]" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
