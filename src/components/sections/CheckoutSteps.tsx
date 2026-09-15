// components/checkout/checkout-steps.tsx
export function CheckoutSteps() {
  return (
    <nav
      className="w-full border-b border-zinc-200/60 py-6 bg-white/40 mb-12"
      aria-label="Checkout Progress"
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-center items-center gap-6 sm:gap-8 text-[11px] font-semibold tracking-[0.2em] uppercase">
        <span className="text-zinc-400">01 Cart</span>
        <span className="text-zinc-300 font-light">—</span>
        <div className="flex items-center gap-2 text-zinc-900">
          <span>02</span>
          <span className="border-b-2 border-zinc-900 pb-1">Checkout</span>
        </div>
        <span className="text-zinc-300 font-light">—</span>
        <span className="text-zinc-400">03 Success</span>
      </div>
    </nav>
  );
}
