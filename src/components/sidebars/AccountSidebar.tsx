"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Package, History } from "lucide-react";

function AccountSidebarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const displayName = user
    ? `${user.firstName} ${user.lastName}`.trim()
    : "Valued Customer";

  const currentType = searchParams.get("type") || "active";

  const navItems = [
    {
      label: "Orders",
      type: "active",
      href: "/account/orders",
      icon: Package,
    },
    {
      label: "Order History",
      type: "history",
      href: "/account/orders?type=history",
      icon: History,
    },
  ];

  return (
    <aside className="w-full space-y-5 text-left sticky top-6">
      {/* User Profile Badge Card */}
      <div className="bg-white border border-stone-200/90 shadow-xs rounded-xl p-4.5 space-y-1">
        <h1 className="text-lg font-serif text-[#312117] tracking-wide font-medium">
          Welcome, {displayName}
        </h1>
        <p className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
          Account Panel
        </p>
      </div>

      {/* Control Actions Panel */}
      <nav className="space-y-2.5" aria-label="Account Sub Navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === "/account/orders" && currentType === item.type;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                isActive
                  ? "bg-[#312117] text-white border border-[#312117] shadow-md ring-2 ring-[#312117]/10"
                  : "bg-white text-stone-700 hover:text-stone-900 border border-stone-200/90 shadow-xs hover:shadow-sm hover:border-stone-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? "text-amber-300" : "text-stone-400"}`} />
                <span>{item.label}</span>
              </div>
              {isActive && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function AccountSidebar() {
  return (
    <Suspense fallback={<div className="w-full h-32 bg-zinc-50 animate-pulse rounded-md" />}>
      <AccountSidebarContent />
    </Suspense>
  );
}
