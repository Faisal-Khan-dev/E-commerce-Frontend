import { CreditCard, Truck, Smartphone, Wallet, Upload, X, Image as ImageIcon } from "lucide-react";
import { ChangeEvent } from "react";

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
    id: "Stripe",
    label: "Stripe",
    subtitle: "Credit / Debit Card via Stripe",
    icon: <CreditCard className="w-4 h-4 text-zinc-500 stroke-[1.5]" />,
  },
  {
    id: "JazzCash",
    label: "JazzCash",
    subtitle: "Pay securely via JazzCash mobile wallet",
    icon: <Smartphone className="w-4 h-4 text-zinc-500 stroke-[1.5]" />,
  },
  {
    id: "EasyPaisa",
    label: "EasyPaisa",
    subtitle: "Pay securely via EasyPaisa mobile wallet",
    icon: <Wallet className="w-4 h-4 text-zinc-500 stroke-[1.5]" />,
  },
  {
    id: "COD",
    label: "Cash on Delivery",
    subtitle: "Pay when your package arrives at your door",
    icon: <Truck className="w-4 h-4 text-zinc-500 stroke-[1.5]" />,
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
  const updateCardField = (field: keyof CardData, value: string) => {
    onCardInfoChange({ ...cardInfo, [field]: value });
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onScreenshotChange(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center gap-3">
        <span className="w-5 h-5 bg-[#312117] text-white rounded-full flex items-center justify-center font-serif text-xs">
          2
        </span>
        <h2 className="text-lg font-serif tracking-wide text-zinc-900">
          Payment Method
        </h2>
      </div>

      <div className="space-y-3 pt-2">
        {PAYMENT_OPTIONS.map((option) => (
          <label
            key={option.id}
            className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
              method === option.id
                ? "bg-white border-zinc-800 ring-1 ring-zinc-800"
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
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-800">
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
        <div className="p-5 bg-[#f5efe9]/40 border border-zinc-200/80 rounded-xl space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-800 flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-zinc-600" />
              <span>Payment Screenshot / Receipt</span>
              <span className="text-red-500 text-xs font-bold">* Required</span>
            </label>
            <p className="text-[11px] text-zinc-500 font-light mt-1">
              Please attach a screenshot of your {method} payment confirmation. Orders with {method} payment cannot be placed without uploading proof of payment.
            </p>
          </div>

          {!screenshotFile ? (
            <label className="border-2 border-dashed border-zinc-300 hover:border-zinc-800 rounded-lg p-5 flex flex-col items-center justify-center cursor-pointer bg-white transition-colors">
              <Upload className="w-6 h-6 text-zinc-400 mb-2" />
              <span className="text-xs font-medium text-zinc-700">
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
            <div className="relative border border-zinc-200 bg-white p-3 rounded-lg flex items-center gap-4">
              <div className="w-16 h-16 relative rounded-md overflow-hidden bg-zinc-100 shrink-0">
                {/* Image preview */}
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
                className="p-1 text-zinc-400 hover:text-red-500 transition-colors"
                title="Remove image"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* COD confirmation note */}
      {method === "COD" && (
        <div className="p-5 bg-[#e2f0d9]/30 border border-[#b7d4a0]/50 rounded-xl">
          <p className="text-xs text-zinc-600 font-light leading-relaxed">
            Your order will be delivered to your address and payment collected at the doorstep. Please keep the <strong className="font-semibold text-zinc-800">exact amount</strong> ready at the time of delivery.
          </p>
        </div>
      )}
    </div>
  );
}

