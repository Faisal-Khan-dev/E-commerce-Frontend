"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertCircle, Loader2, RotateCcw, ShoppingBag } from "lucide-react";
import {
  CheckoutOrderDetails,
  getOrderDetails,
} from "@/services/paymentService";

interface StoredCheckout {
  orderId?: string;
}

function CheckoutCancelContent() {
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState<CheckoutOrderDetails | null>(null);
  const [loadingOrder, setLoadingOrder] = useState(false);

  const fallbackCheckout = useMemo(() => {
    if (typeof window === "undefined") return null;

    try {
      const stored = sessionStorage.getItem("lastCheckout");
      return stored ? (JSON.parse(stored) as StoredCheckout) : null;
    } catch {
      return null;
    }
  }, []);

  const orderId = searchParams.get("orderId") || fallbackCheckout?.orderId;
  const errorMessage =
    searchParams.get("err") ||
    "Payment was cancelled or could not be completed. Your order was not marked as paid.";

  useEffect(() => {
    if (!orderId) return;

    let cancelled = false;

    const fetchOrder = async () => {
      setLoadingOrder(true);

      try {
        const order = await getOrderDetails(orderId);
        if (!cancelled) setOrderData(order);
      } finally {
        if (!cancelled) setLoadingOrder(false);
      }
    };

    fetchOrder();

    return () => {
      cancelled = true;
    };
  }, [orderId]);

  return (
    <div className="w-full bg-[#fcf9f6] min-h-[85vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-xl w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center shadow-sm border border-red-100/50">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xs">
              <AlertCircle className="w-6 h-6 text-red-600 stroke-[2.5]" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-serif tracking-tight text-zinc-900">
            Payment Not Completed
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-light max-w-sm mx-auto leading-relaxed text-balance">
            {errorMessage}
          </p>
        </div>

        {orderId && (
          <div className="bg-[#f5efe9]/50 border border-zinc-200/40 rounded-xl p-5 text-left shadow-3xs">
            <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase block">
              Order Reference
            </span>
            <span className="text-sm font-mono text-zinc-800 font-medium flex items-center gap-2">
              {loadingOrder ? (
                <Loader2 className="w-4 h-4 animate-spin text-zinc-500" />
              ) : (
                orderData?.orderNo || `#${orderId.slice(-6)}`
              )}
            </span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/account/orders"
            className="flex-1 py-4 bg-[#312117] hover:bg-[#432f22] text-white text-xs font-semibold uppercase tracking-widest rounded-md shadow-md transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-300" />
            <span>Review Order</span>
          </Link>
          <Link
            href="/shop"
            className="flex-1 py-4 bg-white hover:bg-zinc-50 border border-[#4a6b36]/30 hover:border-[#4a6b36]/60 text-[#4a6b36] text-xs font-semibold uppercase tracking-widest rounded-md shadow-2xs transition-all duration-200 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutCancelPage() {
  return (
    <Suspense fallback={<div className="min-h-[85vh] flex items-center justify-center text-xs text-zinc-400">Loading...</div>}>
      <CheckoutCancelContent />
    </Suspense>
  );
}
