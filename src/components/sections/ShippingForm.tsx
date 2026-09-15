// components/checkout/shipping-form.tsx
interface ShippingData {
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string; // Added to match checkout page state and mongoose model
}

interface ShippingFormProps {
  data: ShippingData;
  onChange: (data: ShippingData) => void;
}

export function ShippingForm({ data, onChange }: ShippingFormProps) {
  const updateField = (field: keyof ShippingData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center gap-3">
        <span className="w-5 h-5 bg-[#312117] text-white rounded-full flex items-center justify-center font-serif text-xs">
          1
        </span>
        <h2 className="text-lg font-serif tracking-wide text-zinc-900">
          Shipping Information
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
        <div className="sm:col-span-2 flex flex-col border-b border-zinc-300 py-1.5 focus-within:border-zinc-800 transition-colors">
          <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase mb-0.5">
            Full Name
          </label>
          <input
            type="text"
            required
            placeholder="Johnathan Doe"
            value={data.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            className="w-full bg-transparent text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2 flex flex-col border-b border-zinc-300 py-1.5 focus-within:border-zinc-800 transition-colors">
          <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase mb-0.5">
            Address
          </label>
          <input
            type="text"
            required
            placeholder="123 Ritual Way, Suite 4B"
            value={data.address}
            onChange={(e) => updateField("address", e.target.value)}
            className="w-full bg-transparent text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none"
          />
        </div>

        <div className="flex flex-col border-b border-zinc-300 py-1.5 focus-within:border-zinc-800 transition-colors">
          <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase mb-0.5">
            City
          </label>
          <input
            type="text"
            required
            placeholder="San Francisco"
            value={data.city}
            onChange={(e) => updateField("city", e.target.value)}
            className="w-full bg-transparent text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none"
          />
        </div>

        <div className="flex flex-col border-b border-zinc-300 py-1.5 focus-within:border-zinc-800 transition-colors">
          <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase mb-0.5">
            Zip Code
          </label>
          <input
            type="text"
            required
            placeholder="94103"
            value={data.zipCode}
            onChange={(e) => updateField("zipCode", e.target.value)}
            className="w-full bg-transparent text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none"
          />
        </div>

        {/* Added Phone Input Field to match the required Mongoose field */}
        <div className="sm:col-span-2 flex flex-col border-b border-zinc-300 py-1.5 focus-within:border-zinc-800 transition-colors">
          <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase mb-0.5">
            Phone Number
          </label>
          <input
            type="tel"
            required
            placeholder="+1 (555) 000-0000"
            value={data.phone || ""}
            onChange={(e) => updateField("phone", e.target.value)}
            className="w-full bg-transparent text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
