// app/(shop)/cart/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShieldCheck, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem } = useCart();

  return (
    <div className="w-full bg-[#fcf9f6] min-h-screen text-zinc-900 pb-24">
      {/* Upper Tracker Bar: Structural Multi-Step Checkout Breadcrumbs */}
      <nav
        className="w-full border-b border-zinc-200/60 py-6 bg-white/40"
        aria-label="Checkout Progress"
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center gap-6 sm:gap-8 text-[11px] font-semibold tracking-[0.2em] uppercase">
          <div className="flex items-center gap-2 text-zinc-900">
            <span>01</span>
            <span className="border-b-2 border-zinc-900 pb-1">Cart</span>
          </div>
          <span className="text-zinc-300 font-light">—</span>
          <div className="flex items-center gap-2 text-zinc-400">
            <span>02</span>
            <span>Checkout</span>
          </div>
          <span className="text-zinc-300 font-light">—</span>
          <div className="flex items-center gap-2 text-zinc-400">
            <span>03</span>
            <span>Success</span>
          </div>
        </div>
      </nav>

      {/* Main Core Form Content Stack Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <h1 className="text-2xl sm:text-3xl font-serif tracking-tight text-zinc-900 mb-8">
          Your Selection
          {totalItems > 0 && (
            <span className="ml-3 text-sm font-sans font-light text-zinc-400">
              ({totalItems} {totalItems === 1 ? "item" : "items"})
            </span>
          )}
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-white/40 rounded-xl border border-dashed border-zinc-200 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#f5efe9] flex items-center justify-center mb-2">
              <ShoppingBag className="w-7 h-7 text-zinc-400" />
            </div>
            <p className="text-zinc-500 font-light text-sm">
              Your shopping selections cart is empty.
            </p>
            <Link
              href="/shop"
              data-ripple="true"
              data-hover-bg="#d4a373"
              data-hover-text="#312117"
              className="btn inline-block py-4 px-8 bg-[#312117] text-white text-xs font-semibold uppercase tracking-widest rounded-md shadow-md transition-colors duration-200 text-center cursor-pointer"
            >
              <span>Continue Shopping</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
            {/* Left Column Stack: Interactive Item Rows */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-[0_4px_20px_rgba(49,33,23,0.06)] hover:shadow-[0_8px_25px_rgba(49,33,23,0.1)] transition-all duration-300 flex items-center gap-4 sm:gap-5 relative text-left"
                >
                  {/* Media Snapshot Wrapper */}
                  <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-lg overflow-hidden bg-zinc-50 border border-zinc-100 shrink-0">
                    <Image
                      src={item.imageSrc}
                      alt={item.name}
                      fill
                      sizes="88px"
                      className="object-cover"
                    />
                  </div>

                  {/* Core Information Details Panel */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-grow gap-2 sm:gap-4 pr-7 sm:pr-8">
                    <div className="space-y-1 max-w-xs">
                      <Link href={`/shop/${item.id}`}>
                        <h2 className="font-serif text-base sm:text-lg font-medium text-stone-900 tracking-wide leading-tight hover:text-[#312117] transition-colors">
                          {item.name}
                        </h2>
                      </Link>
                      {item.variant && (
                        <p className="text-xs text-stone-400 font-light">
                          {item.variant}
                        </p>
                      )}

                      {/* Quantity Action Controls */}
                      <div className="flex items-center border border-stone-200 rounded-md bg-[#fcf9f6] w-fit shadow-2xs mt-3 overflow-hidden">
                        <button
                          type="button"
                          data-no-ripple="true"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label={`Decrease quantity for ${item.name}`}
                          className="px-2.5 py-1 text-stone-400 hover:text-stone-900 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold w-6 text-center select-none text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          data-no-ripple="true"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label={`Increase quantity for ${item.name}`}
                          className="px-2.5 py-1 text-stone-400 hover:text-stone-900 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Extended Calculated Row Pricing Information */}
                    <div className="sm:text-right flex sm:flex-col justify-between sm:justify-center items-start sm:items-end shrink-0">
                      <span className="font-serif text-base sm:text-lg font-medium text-stone-900">
                        Rs. {Math.round(item.price).toLocaleString()}
                      </span>
                      <span className="text-[11px] text-stone-400 font-light mt-0.5">
                        Subtotal: Rs. {Math.round(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Small Top-Right Positioned Line Item Clear Trigger Button */}
                  <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20">
                    <button
                      type="button"
                      data-no-ripple="true"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name} item from selections basket`}
                      className="p-1.5 text-stone-400 hover:text-red-600 transition-colors rounded-full hover:bg-red-50 cursor-pointer flex items-center justify-center"
                    >
                      <X className="w-3.5 h-3.5 stroke-[2]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column Panel Sidebar: Sticky Order Summary Widget */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 z-30">
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-[0_4px_24px_rgba(49,33,23,0.08)] hover:shadow-[0_8px_32px_rgba(49,33,23,0.14)] transition-all duration-300 text-left">
                  <h3 className="text-[10px] font-bold tracking-[0.15em] uppercase text-zinc-400 mb-6">
                    Order Summary
                  </h3>

                  <div className="space-y-4 pb-6 border-b border-zinc-200/60 text-xs sm:text-sm">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between font-light text-zinc-600">
                        <span className="truncate max-w-[60%]">
                          {item.name}
                          <span className="text-zinc-400 ml-1">×{item.quantity}</span>
                        </span>
                        <span className="font-medium text-zinc-900 ml-2">
                          Rs. {Math.round(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between font-light text-zinc-600 pt-2 border-t border-zinc-200/40">
                      <span>Subtotal</span>
                      <span className="font-medium text-zinc-900">
                        Rs. {Math.round(totalPrice).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline font-light text-zinc-600">
                      <span>Shipping</span>
                      <span className="text-xs font-medium text-zinc-800">
                        Rs. 250
                      </span>
                    </div>
                  </div>

                  {/* Total Aggregate Sum Indicator row */}
                  <div className="flex justify-between items-baseline pt-6 mb-8">
                    <span className="font-serif text-lg text-zinc-950">Total</span>
                    <span className="font-serif text-2xl font-semibold text-zinc-950">
                      Rs. {Math.round(totalPrice + 250).toLocaleString()}
                    </span>
                  </div>

                  {/* Final Transaction Trigger Execution CTA Button */}
                  <Link
                    href="/checkout"
                    data-ripple="true"
                    data-hover-bg="#d4a373"
                    data-hover-text="#312117"
                    className="btn block w-full py-4 bg-[#312117] text-white text-xs font-semibold uppercase tracking-widest rounded-md shadow-md transition-colors duration-200 mb-4 text-center cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                  </Link>

                  {/* Secure Trust Footnote element banner */}
                  <div className="flex items-center justify-center gap-2 text-[10px] font-light text-zinc-400 text-center max-w-xs mx-auto leading-normal">
                    <ShieldCheck className="w-4 h-4 text-zinc-300 shrink-0" />
                    <span>
                      Secure checkout powered by Pure Provenance Trust Network
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
