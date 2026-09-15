"use client";

import { useEffect, useRef } from "react";
import { X, Loader2, Calendar, ShoppingBag, ShieldCheck, Image as ImageIcon } from "lucide-react";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string | null;
  orderData: any;
  loading: boolean;
  error: string;
}

export default function OrderDetailsModal({
  isOpen,
  onClose,
  orderId,
  orderData,
  loading,
  error,
}: OrderDetailsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const screenshotUrl =
    orderData?.paymentScreenshot || orderData?.paymentId?.paymentScreenshot;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay layout shield */}
      <div
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal interface shell window */}
      <div
        ref={modalRef}
        className="relative bg-[#fcf9f6] w-full max-w-xl rounded-xl border border-zinc-200/60 p-6 sm:p-8 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto scrollbar-none"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-zinc-600" />
            <p className="text-xs text-zinc-400 uppercase tracking-widest font-medium">
              Synchronizing Transaction Data...
            </p>
          </div>
        ) : error ? (
          <div className="py-6 text-center">
            <div className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              !
            </div>
            <p className="text-sm text-zinc-800 font-medium">{error}</p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-zinc-900 text-white text-xs font-semibold uppercase tracking-wider rounded-md"
            >
              Dismiss
            </button>
          </div>
        ) : !orderData ? (
          <p className="text-sm text-zinc-500 text-center py-6">
            No order details accessible.
          </p>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold tracking-[0.15em] text-[#4a6b36] bg-[#e2f0d9] px-2.5 py-0.5 rounded-full uppercase">
                  {orderData.status || "Processing"}
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-zinc-900">
                Order {orderData.orderNo || `#${orderData._id?.slice(-6)}`}
              </h3>
              <p className="text-[11px] text-zinc-400 font-light flex items-center gap-1.5 mt-1">
                <Calendar className="w-3 h-3" /> System ID Reference:{" "}
                {orderData._id}
              </p>
            </div>

            <hr className="border-zinc-200/60" />

            {/* Line Items Container Matrix */}
            <div>
              <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase mb-3 flex items-center gap-1.5">
                <ShoppingBag className="w-3 h-3" /> Manifest Items
              </h4>
              <div className="space-y-3">
                {orderData.orderItems?.map((item: any, idx: number) => (
                  <div
                    key={item._id || idx}
                    className="flex justify-between items-center bg-white border border-zinc-200/60 p-3.5 rounded-lg"
                  >
                    <div>
                      <h5 className="text-sm font-serif text-zinc-900 tracking-wide">
                        {item.name}
                      </h5>
                      <p className="text-xs text-zinc-400 font-light mt-0.5">
                        Quantity Ordered:{" "}
                        <span className="font-medium text-zinc-600">
                          {item.quantity}
                        </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-zinc-900">
                        Rs. {Math.round(item.price * item.quantity).toLocaleString()}
                      </span>
                      <p className="text-[10px] text-zinc-400 font-light">
                        Rs. {Math.round(item.price).toLocaleString()} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Proof Screenshot if available */}
            {screenshotUrl && (
              <div className="bg-white border border-zinc-200/60 p-4 rounded-xl space-y-2 text-left">
                <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase flex items-center gap-1.5">
                  <ImageIcon className="w-3 h-3 text-zinc-500" /> Payment Screenshot Proof
                </h4>
                <a
                  href={screenshotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group overflow-hidden rounded-lg border border-zinc-200/80 bg-zinc-50 p-2 hover:border-zinc-400 transition-colors"
                >
                  <img
                    src={screenshotUrl}
                    alt="Payment Screenshot Proof"
                    className="w-full h-auto max-h-56 object-contain rounded-md mx-auto"
                  />
                  <p className="text-[10px] text-center text-zinc-400 group-hover:text-zinc-600 mt-2">
                    Click to open full size image ↗
                  </p>
                </a>
              </div>
            )}

            <hr className="border-zinc-200/60" />

            {/* Financial Aggregate Checkout Summary Breakdown */}
            <div className="bg-zinc-50 border border-zinc-200/40 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-xs font-light text-zinc-500">
                <span>Subtotal Settlement</span>
                <span>Rs. {Math.round(orderData.totalAmount || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs font-light text-zinc-500">
                <span>Logistic Allocation (Shipping)</span>
                <span className="text-zinc-700 font-medium text-xs">
                  Rs. 250
                </span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-zinc-200/60 font-serif text-zinc-900">
                <span className="font-medium">Total Statement Amount</span>
                <span className="font-bold">
                  Rs. {Math.round((orderData.totalAmount || 0) + 250).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-light justify-center pt-2 bg-white border border-zinc-100 py-2 rounded-md">
              <ShieldCheck className="w-4 h-4 text-zinc-400" /> Secure checkout
              verified by client ledger pipelines.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

