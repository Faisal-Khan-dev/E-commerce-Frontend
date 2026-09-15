// app/(shop)/checkout/success/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, Loader2, ShoppingBag, Truck } from "lucide-react";
import {
  CheckoutOrderDetails,
  getOrderDetails,
  verifyStripeSession,
} from "@/services/paymentService";

interface StoredCheckout {
  orderId?: string;
  paymentId?: string;
}

const getErrorMessage = (error: unknown) => {
  if (typeof error === "object" && error !== null) {
    const maybeError = error as {
      response?: { data?: { message?: string } };
      message?: string;
    };

    return maybeError.response?.data?.message || maybeError.message;
  }

  return undefined;
};

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState<CheckoutOrderDetails | null>(null);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [orderError, setOrderError] = useState("");

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
  const paymentId = searchParams.get("paymentId") || fallbackCheckout?.paymentId;
  const stripeSessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!orderId) return;

    let cancelled = false;
    let stripeVerified = false;

    const fetchOrder = async () => {
      setLoadingOrder(true);
      setOrderError("");

      try {
        if (stripeSessionId && !stripeVerified) {
          stripeVerified = true;
          await verifyStripeSession({
            sessionId: stripeSessionId,
            paymentId: paymentId || undefined,
            orderId,
          });
        }

        const order = await getOrderDetails(orderId);
        if (!cancelled) setOrderData(order);
      } catch (error: unknown) {
        if (!cancelled) {
          setOrderError(
            getErrorMessage(error) || "Unable to refresh order details.",
          );
        }
      } finally {
        if (!cancelled) setLoadingOrder(false);
      }
    };

    fetchOrder();
    const refreshTimer = window.setTimeout(fetchOrder, 2500);

    return () => {
      cancelled = true;
      window.clearTimeout(refreshTimer);
    };
  }, [orderId, paymentId, stripeSessionId]);

  const orderDetails = {
    orderNumber: orderData?.orderNo || (orderId ? `#${orderId.slice(-6)}` : "Processing"),
    estimatedDelivery: "3 - 5 business days",
    paymentStatus: orderData?.paymentId?.status,
  };

  return (
    <div className="w-full bg-[#fcf9f6] min-h-[85vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-xl w-full text-center space-y-8">
        {/* Animated Green Validation Checkmark Wrapper Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center shadow-sm border border-emerald-100/50 relative animate-scale-in">
            <div
              className="absolute inset-0 rounded-full bg-emerald-400/10 animate-ping opacity-75"
              style={{ animationDuration: "2s" }}
            />
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xs z-10">
              <Check className="w-6 h-6 text-emerald-600 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Header Branding Messaging Block */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-serif tracking-tight text-zinc-900">
            Order Placed Successfully!
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-light max-w-sm mx-auto leading-relaxed text-balance">
            Thank you for choosing Healthy Basket. Your journey to wellness
            begins here.
          </p>
        </div>

        {/* Metadata Receipt Parameter Tracking Card Info Row */}
        <div className="bg-[#f5efe9]/50 border border-zinc-200/40 rounded-xl grid grid-cols-2 p-5 text-left divide-x divide-zinc-200 shadow-3xs">
          <div className="space-y-1 pl-2">
            <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase block">
              Order Number
            </span>
            <span className="text-sm font-mono text-zinc-800 font-medium">
              {loadingOrder ? (
                <Loader2 className="w-4 h-4 animate-spin text-zinc-500" />
              ) : (
                orderDetails.orderNumber
              )}
            </span>
          </div>
          <div className="space-y-1 pl-6">
            <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase block">
              Estimated Delivery
            </span>
            <span className="text-xs sm:text-sm text-zinc-700 font-light">
              {orderDetails.estimatedDelivery}
            </span>
          </div>
        </div>

        {(orderDetails.paymentStatus || orderError) && (
          <p className="text-[11px] font-light text-zinc-500">
            {orderError ||
              `Payment status: ${String(orderDetails.paymentStatus).replace("_", " ")}`}
          </p>
        )}

        {/* Centered Creative Ambient Product Banner Component */}
        <div className="relative aspect-[21/9] w-full rounded-xl overflow-hidden border border-zinc-200/40 shadow-sm group">
          <Image
            src="/order-card-pic.png" // Sourcing reference image mapping location paths
            alt="Artisanal loose-leaf wellness blends alongside measuring spoons on warm neutral surface textures"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover transition-transform duration-700 group-hover:scale-102 filter brightness-[0.70] contrast-[0.95]"
          />
          {/* Internal Minimal Typography Branding Overlay Label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold tracking-[0.35em] uppercase text-center opacity-90 scale-95 sm:scale-100 select-none">
              Purity in Every Ritual
            </span>
          </div>
        </div>

        {/* Split Post-Purchase Navigation Action Blocks */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/account/orders"
            className="flex-1 py-4 bg-[#312117] hover:bg-[#432f22] text-white text-xs font-semibold uppercase tracking-widest rounded-md shadow-md transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <Truck className="w-3.5 h-3.5 text-zinc-300 transition-transform group-hover:translate-x-0.5" />
            <span>Track Order</span>
          </Link>
          <Link
            href="/shop"
            className="flex-1 py-4 bg-white hover:bg-zinc-50 border border-[#4a6b36]/30 hover:border-[#4a6b36]/60 text-[#4a6b36] text-xs font-semibold uppercase tracking-widest rounded-md shadow-2xs transition-all duration-200 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Dynamic Dispatch Notice Footnote banner elements */}
        <p className="text-[11px] font-light text-zinc-400 pt-2 border-t border-dashed border-zinc-200">
          A confirmation email has been sent to your registered address.
        </p>
      </div>
    </div>
  );
}
