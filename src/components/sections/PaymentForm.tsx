"use client";

import {
  CreditCard,
  Truck,
  Smartphone,
  Wallet,
  Upload,
  X,
  Image as ImageIcon,
  Copy,
  Check,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { ChangeEvent, useState } from "react";

export type PaymentMethod = "Stripe" | "JazzCash" | "EasyPaisa" | "COD";

interface CardData {
  cardNumber: string;
  expiry: string;
  cvc: string;
}

interface PaymentFormProps {
  method: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
  cardInfo: CardData;
  onCardInfoChange: (data: CardData) => void;
  screenshotFile: File | null;
  onScreenshotChange: (file: File | null) => void;
}

const PAYMENT_OPTIONS: {
  id: PaymentMethod;
  label: string;
  subtitle: string;
  icon: React.ReactNode;
}[] = [
    {
      id: "COD",
      label: "Cash on Delivery",
      subtitle: "Pay when your package arrives at your door",
      icon: <Truck className="w-4 h-4 text-zinc-500 stroke-[1.5]" />,
    },
    {
      id: "Stripe",
      label: "Bank Transfer",
      subtitle: "Pay via Bank Account",
      icon: <CreditCard className="w-4 h-4 text-zinc-500 stroke-[1.5]" />,
    },
    {
      id: "EasyPaisa",
      label: "EasyPaisa",
      subtitle: "Pay securely via EasyPaisa App",
      icon: <Wallet className="w-4 h-4 text-zinc-500 stroke-[1.5]" />,
    },
    {
      id: "JazzCash",
      label: "JazzCash",
      subtitle: "Pay securely via JazzCash App",
      icon: <Smartphone className="w-4 h-4 text-zinc-500 stroke-[1.5]" />,
    },
  ];

export function PaymentForm({
  method,
  onMethodChange,
  cardInfo,
  onCardInfoChange,
  screenshotFile,
  onScreenshotChange,
}: PaymentFormProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onScreenshotChange(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(49,33,23,0.06)] hover:shadow-[0_8px_32px_rgba(49,33,23,0.12)] transition-all duration-300 space-y-6 text-left">
      <div className="flex items-center gap-3">
        <span className="w-5 h-5 bg-[#312117] text-white rounded-full flex items-center justify-center font-serif text-xs">
          2
        </span>
        <h2 className="text-lg font-serif tracking-wide text-zinc-900">
          Payment Method
        </h2>
      </div>

      {/* Payment Selector Options */}
      <div className="space-y-3 pt-2">
        {PAYMENT_OPTIONS.map((option) => (
          <label
            key={option.id}
            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${method === option.id
              ? "bg-white border-[#312117] ring-1 ring-[#312117] shadow-2xs"
              : "bg-white/60 border-zinc-200 hover:border-zinc-300"
              }`}
          >
            <div className="flex items-center gap-4">
              <input
                type="radio"
                name="payment"
                checked={method === option.id}
                onChange={() => onMethodChange(option.id)}
                className="w-4 h-4 accent-[#312117] cursor-pointer"
              />
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900">
                {option.icon}
                <span>{option.label}</span>
              </div>
            </div>
            <span className="text-[10px] text-zinc-400 font-light hidden sm:inline">
              {option.subtitle}
            </span>
          </label>
        ))}
      </div>

      {/* Payment Screenshot Upload Section - Required for Stripe, JazzCash, and EasyPaisa */}
      {method !== "COD" && (
        <div className="p-5 bg-[#f5efe9]/50 border border-stone-200/90 rounded-xl space-y-4 shadow-2xs">
          <div>
            <label className="text-xs font-semibold text-zinc-800 flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-zinc-600" />
              <span>Payment Screenshot / Receipt</span>
              <span className="text-red-500 text-xs font-bold">* Required</span>
            </label>
            <p className="text-[11px] text-zinc-500 font-light mt-1 leading-relaxed">
              Please attach a screenshot of your payment confirmation receipt. Orders placed via {method} require verified proof of payment before dispatch.
            </p>
          </div>

          {!screenshotFile ? (
            <label className="border-2 border-dashed border-stone-300 hover:border-[#312117] rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer bg-white transition-all duration-200 shadow-2xs group">
              <Upload className="w-6 h-6 text-zinc-400 group-hover:text-[#312117] mb-2 transition-colors" />
              <span className="text-xs font-medium text-zinc-700 group-hover:text-zinc-900">
                Click to upload payment screenshot
              </span>
              <span className="text-[10px] text-zinc-400 mt-0.5">
                PNG, JPG, JPEG or WEBP (Max 5MB)
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative border border-stone-200 bg-white p-3 rounded-xl flex items-center gap-4 shadow-xs">
              <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-zinc-100 shrink-0 border border-stone-200">
                <img
                  src={URL.createObjectURL(screenshotFile)}
                  alt="Payment screenshot preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-zinc-800 truncate">
                  {screenshotFile.name}
                </p>
                <p className="text-[10px] text-zinc-400">
                  {(screenshotFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={() => onScreenshotChange(null)}
                className="p-1.5 text-zinc-400 hover:text-red-600 transition-colors cursor-pointer"
                title="Remove image"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* DETAILED PAYMENT ACCOUNT INSTRUCTIONS SECTION (Right below screenshot upload) */}
      {/* 1. Debit/Credit Card & UBL Direct Bank Transfer */}
      {method === "Stripe" && (
        <div className="bg-white border border-stone-200/90 rounded-xl p-5 shadow-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#f5efe9] text-[#312117] flex items-center justify-center font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Direct Bank Transfer Details</h4>
                <p className="text-[11px] text-zinc-500 font-light">Transfer funds directly from your mobile banking app or ATM</p>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-md">
              UBL Bank
            </span>
          </div>

          {/* Precise Payment Method Steps & Guarantee */}
          <div className="p-4 bg-[#fffdfb] border border-amber-200/80 rounded-xl text-xs text-zinc-700 space-y-2.5 font-light">
            <p className="font-semibold text-amber-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-800" />Payment Instructions:
            </p>
            <ul className="space-y-2 text-[11px] text-zinc-600 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-amber-800 font-bold text-xs mt-0.5">•</span>
                <span>Transfer the exact order total to the UBL account details listed below.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-800 font-bold text-xs mt-0.5">•</span>
                <span>Take a clear screenshot of the successful transaction confirmation screen.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-800 font-bold text-xs mt-0.5">•</span>
                <span>Upload the screenshot in the <strong>Payment Screenshot / Receipt</strong> proof box above.</span>
              </li>
              <li className="flex items-start gap-2 pt-1 border-t border-amber-200/50 font-medium text-amber-950">
                <span className="text-amber-800 font-bold text-xs mt-0.5">•</span>
                <span><strong>Peace of Mind Guarantee:</strong> Feel free to make your online payment with 100% confidence. If you face any issue with your order payment or delivery, simply contact us on WhatsApp and your refund will be processed immediately.</span>
              </li>
            </ul>
          </div>

          {/* Account Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-stone-50/80 border border-stone-200 rounded-lg space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Bank Name</span>
              <p className="text-xs font-semibold text-zinc-900">UBL (United Bank Limited)</p>
            </div>

            <div className="p-3 bg-stone-50/80 border border-stone-200 rounded-lg space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Account Title</span>
              <p className="text-xs font-semibold text-zinc-900">Muhammad Farhad Khan</p>
            </div>

            <div className="p-3 bg-stone-50/80 border border-stone-200 rounded-lg flex items-center justify-between gap-2">
              <div className="space-y-0.5 min-w-0">
                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Account Number</span>
                <p className="text-xs font-mono font-bold text-zinc-900 truncate">2122321570121</p>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard("2122321570121", "ubl_acc")}
                className="px-2.5 py-1.5 bg-white border border-stone-300 hover:border-[#312117] text-zinc-700 text-[10px] font-semibold rounded-md transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === "ubl_acc" ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-zinc-500" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3 bg-stone-50/80 border border-stone-200 rounded-lg flex items-center justify-between gap-2">
              <div className="space-y-0.5 min-w-0">
                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">IBAN</span>
                <p className="text-xs font-mono font-bold text-zinc-900 truncate">PK66UNIL0109000321570121</p>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard("PK66UNIL0109000321570121", "ubl_iban")}
                className="px-2.5 py-1.5 bg-white border border-stone-300 hover:border-[#312117] text-zinc-700 text-[10px] font-semibold rounded-md transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === "ubl_iban" ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-zinc-500" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. EasyPaisa Account Details */}
      {method === "EasyPaisa" && (
        <div className="bg-white border border-stone-200/90 rounded-xl p-5 shadow-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Wallet className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">EasyPaisa Payment Details</h4>
                <p className="text-[11px] text-zinc-500 font-light">Transfer funds directly via EasyPaisa app or USSD *786#</p>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md">
              EasyPaisa
            </span>
          </div>

          {/* Precise Payment Method Steps & Guarantee */}
          <div className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-xl text-xs text-zinc-700 space-y-2.5 font-light">
            <p className="font-semibold text-emerald-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />Payment Instructions:
            </p>
            <ul className="space-y-2 text-[11px] text-zinc-600 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold text-xs mt-0.5">•</span>
                <span>Open EasyPaisa app or dial <strong>*786#</strong> on your mobile device.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold text-xs mt-0.5">•</span>
                <span>Select <strong>Send Money</strong> &gt; <strong>EasyPaisa Account</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold text-xs mt-0.5">•</span>
                <span>Enter mobile number <strong>03459270654</strong> and transfer the exact total order amount.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold text-xs mt-0.5">•</span>
                <span>Take a screenshot of the successful transaction receipt and upload it above.</span>
              </li>
              <li className="flex items-start gap-2 pt-1 border-t border-emerald-200/60 font-medium text-emerald-950">
                <span className="text-emerald-700 font-bold text-xs mt-0.5">•</span>
                <span><strong>Peace of Mind Guarantee:</strong> Feel free to make your online payment with 100% confidence. If you face any issue with your order payment or delivery, simply contact us on WhatsApp and your refund will be processed immediately.</span>
              </li>
            </ul>
          </div>

          {/* Account Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-stone-50/80 border border-stone-200 rounded-lg space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Account Title</span>
              <p className="text-xs font-semibold text-zinc-900">Muhammad Farhad Khan</p>
            </div>

            <div className="p-3 bg-stone-50/80 border border-stone-200 rounded-lg flex items-center justify-between gap-2">
              <div className="space-y-0.5 min-w-0">
                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">EasyPaisa Number</span>
                <p className="text-xs font-mono font-bold text-zinc-900 truncate">03459270654</p>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard("03459270654", "easypaisa_num")}
                className="px-2.5 py-1.5 bg-white border border-stone-300 hover:border-[#312117] text-zinc-700 text-[10px] font-semibold rounded-md transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === "easypaisa_num" ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-zinc-500" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. JazzCash Account Details */}
      {method === "JazzCash" && (
        <div className="bg-white border border-stone-200/90 rounded-xl p-5 shadow-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">JazzCash Payment Details</h4>
                <p className="text-[11px] text-zinc-500 font-light">Transfer funds directly via JazzCash mobile app or USSD *786#</p>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-rose-50 text-rose-800 border border-rose-200 rounded-md">
              JazzCash
            </span>
          </div>

          {/* Precise Payment Method Steps & Guarantee */}
          <div className="p-4 bg-rose-50/50 border border-rose-200/80 rounded-xl text-xs text-zinc-700 space-y-2.5 font-light">
            <p className="font-semibold text-rose-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-rose-700" />Payment Instructions:
            </p>
            <ul className="space-y-2 text-[11px] text-zinc-600 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-rose-700 font-bold text-xs mt-0.5">•</span>
                <span>Open JazzCash app or dial <strong>*786#</strong> on your mobile device.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-700 font-bold text-xs mt-0.5">•</span>
                <span>Select <strong>Money Transfer</strong> &gt; <strong>JazzCash Account</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-700 font-bold text-xs mt-0.5">•</span>
                <span>Enter mobile number <strong>03272735705</strong> and transfer the exact total order amount.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-700 font-bold text-xs mt-0.5">•</span>
                <span>Take a screenshot of the successful SMS/App transaction receipt and upload it above.</span>
              </li>
              <li className="flex items-start gap-2 pt-1 border-t border-rose-200/60 font-medium text-rose-950">
                <span className="text-rose-700 font-bold text-xs mt-0.5">•</span>
                <span><strong>Peace of Mind Guarantee:</strong> Feel free to make your online payment with 100% confidence. If you face any issue with your order payment or delivery, simply contact us on WhatsApp and your refund will be processed immediately.</span>
              </li>
            </ul>
          </div>

          {/* Account Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-stone-50/80 border border-stone-200 rounded-lg space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Account Title</span>
              <p className="text-xs font-semibold text-zinc-900">Muhammad Farhad Khan</p>
            </div>

            <div className="p-3 bg-stone-50/80 border border-stone-200 rounded-lg flex items-center justify-between gap-2">
              <div className="space-y-0.5 min-w-0">
                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">JazzCash Number</span>
                <p className="text-xs font-mono font-bold text-zinc-900 truncate">03272735705</p>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard("03272735705", "jazzcash_num")}
                className="px-2.5 py-1.5 bg-white border border-stone-300 hover:border-[#312117] text-zinc-700 text-[10px] font-semibold rounded-md transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === "jazzcash_num" ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-zinc-500" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COD confirmation note */}
      {method === "COD" && (
        <div className="p-5 bg-[#e2f0d9]/40 border border-[#b7d4a0]/60 rounded-xl">
          <p className="text-xs text-zinc-700 font-light leading-relaxed">
            Your order will be delivered to your shipping address and payment collected at your doorstep. Please keep the <strong className="font-semibold text-zinc-900">exact amount</strong> ready at the time of delivery.
          </p>
        </div>
      )}
    </div>
  );
}
