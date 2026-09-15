import Image from "next/image";
import { ShieldCheck, Leaf, Award } from "lucide-react";

export interface CheckoutProduct {
  name: string;
  variant?: string;
  quantity: number;
  price: number;
  imageSrc: string;
}

interface OrderSummaryProps {
  items: CheckoutProduct[];
  subtotal: number;
  isSubmitting: boolean; // Added to manage button state internally
}

export function OrderSummary({
  items,
  subtotal,
  isSubmitting,
}: OrderSummaryProps) {
  return (
    <div className="bg-[#f5efe9]/70 rounded-xl p-6 sm:p-8 border border-zinc-200/40 sticky top-6 flex flex-col justify-between">
      <div>
        <h3 className="text-[10px] font-bold tracking-[0.15em] uppercase text-zinc-400 mb-6 text-left">
          Your Order
        </h3>

        <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-1">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-4 py-1"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded bg-zinc-100 border border-zinc-200/60 overflow-hidden shrink-0">
                  <Image
                    src={item.imageSrc}
                    alt={item.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-serif text-zinc-900 font-medium tracking-wide leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-zinc-400 font-light mt-0.5">
                    {item.variant ? `${item.variant} • ` : ""}QTY:{" "}
                    {item.quantity}
                  </p>
                </div>
              </div>
              <span className="text-xs font-medium text-zinc-700 shrink-0">
                Rs. {(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-3 py-4 border-t border-b border-zinc-200/60 text-xs font-light text-zinc-600 text-left">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-medium text-zinc-900">
              Rs. {subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Shipping</span>
            <span className="text-xs font-medium text-zinc-800">
              Rs. 250
            </span>
          </div>
        </div>

        <div className="flex justify-between items-baseline pt-5 mb-8">
          <span className="font-serif text-base text-zinc-950">Total</span>
          <span className="font-serif text-xl font-semibold text-zinc-950">
            Rs. {(subtotal + 250).toLocaleString()}
          </span>
        </div>
      </div>

      <div>
        {/* Single Form Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || items.length === 0}
          className="w-full py-4 bg-[#312117] hover:bg-[#432f22] cursor-pointer text-white text-xs font-semibold uppercase tracking-widest rounded-md shadow-md transition-all duration-200 active:scale-[0.99] mb-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {isSubmitting
            ? "Processing..."
            : `Place Order`}
        </button>

        <div className="flex justify-between items-center px-2 pt-2 border-t border-zinc-200/60 text-zinc-400 text-[8px] font-bold uppercase tracking-widest">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-zinc-300" />{" "}
            <span>SECURE</span>
          </div>
          <div className="flex items-center gap-1">
            <Leaf className="w-3 h-3 text-zinc-300" /> <span>ORGANIC</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-3 h-3 text-zinc-300" /> <span>LAB TESTED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
