"use client";

import { useState } from "react";
import { Navigation, Loader2, Check } from "lucide-react";

export interface ShippingData {
  fullName: string;
  address: string;
  houseNo?: string;
  area?: string;
  city: string;
  zipCode: string;
  phone: string;
  whatsapp?: string;
}

interface ShippingFormProps {
  data: ShippingData;
  onChange: (data: ShippingData) => void;
}

export function ShippingForm({ data, onChange }: ShippingFormProps) {
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [sameAsPhone, setSameAsPhone] = useState(false);

  const updateField = (field: keyof ShippingData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handlePhoneChange = (field: "phone" | "whatsapp", value: string) => {
    // Restrict input to digits with a max length of 11 characters (e.g., 03001234567)
    const sanitized = value.replace(/[^\d+]/g, "").slice(0, 11);

    if (field === "phone") {
      const updated: ShippingData = { ...data, phone: sanitized };
      if (sameAsPhone) {
        updated.whatsapp = sanitized;
      }
      onChange(updated);
    } else {
      onChange({ ...data, whatsapp: sanitized });
    }
  };

  const handleToggleSameAsPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setSameAsPhone(isChecked);
    if (isChecked) {
      onChange({ ...data, whatsapp: data.phone || "" });
    }
  };

  const handleAddressChange = (houseNoVal: string, areaVal: string) => {
    const combined = [houseNoVal.trim(), areaVal.trim()].filter(Boolean).join(", ");
    onChange({
      ...data,
      houseNo: houseNoVal,
      area: areaVal,
      address: combined,
    });
  };

  const handleDetectLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    setLocationStatus(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Free OpenStreetMap Nominatim Reverse Geocoding API
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          if (!res.ok) throw new Error("Failed to fetch address details");

          const result = await res.json();
          const addr = result.address || {};

          const detectedHouse =
            [addr.house_number, addr.building].filter(Boolean).join(" ") || data.houseNo || "";

          const areaParts = [
            addr.road || addr.street,
            addr.suburb || addr.neighbourhood || addr.residential,
            addr.city_district || addr.county,
          ].filter(Boolean);

          const detectedArea =
            areaParts.length > 0 ? areaParts.join(", ") : result.display_name || data.area || "";
          const detectedCity =
            addr.city || addr.town || addr.village || addr.state_district || addr.state || "";
          const detectedZip = addr.postcode || "";

          const combinedAddress = [detectedHouse, detectedArea].filter(Boolean).join(", ");

          onChange({
            ...data,
            houseNo: detectedHouse,
            area: detectedArea,
            address: combinedAddress || data.address,
            city: detectedCity || data.city,
            zipCode: detectedZip || data.zipCode,
          });

          setLocationStatus("Location auto-filled!");
          setTimeout(() => setLocationStatus(null), 4000);
        } catch (error) {
          console.error("Location lookup error:", error);
          alert("Could not automatically retrieve street address. Please enter it manually.");
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          alert(
            "Location access permission was denied. Please allow location access in your browser or type your address manually."
          );
        } else {
          alert("Unable to retrieve your current location. Please type your address manually.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(49,33,23,0.06)] hover:shadow-[0_8px_32px_rgba(49,33,23,0.12)] transition-all duration-300 space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 bg-[#312117] text-white rounded-full flex items-center justify-center font-serif text-xs">
            1
          </span>
          <h2 className="text-lg font-serif tracking-wide text-zinc-900">
            Shipping Information
          </h2>
        </div>

        {/* Professional Choose Location Button */}
        <button
          type="button"
          onClick={handleDetectLocation}
          disabled={isLocating}
          className="inline-flex items-center gap-2 text-xs font-medium text-[#312117] hover:text-[#312117] bg-[#f5efe9] hover:bg-[#e8ded5] border border-[#e8ded5] hover:border-[#d4c5b9] px-3.5 py-1.5 rounded-lg transition-all duration-200 shadow-2xs cursor-pointer active:scale-95 disabled:opacity-50"
        >
          {isLocating ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Detecting Location...</span>
            </>
          ) : locationStatus ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">{locationStatus}</span>
            </>
          ) : (
            <>
              <Navigation className="w-3.5 h-3.5" />
              <span>Detect My Location</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
        {/* Full Name */}
        <div className="sm:col-span-2 flex flex-col border-b border-zinc-300 py-1.5 focus-within:border-zinc-800 transition-colors">
          <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase mb-0.5">
            Full Name
          </label>
          <input
            type="text"
            required
            placeholder="Muhammad Ali"
            value={data.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            className="w-full bg-transparent text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none"
          />
        </div>

        {/* House / Flat */}
        <div className="flex flex-col border-b border-zinc-300 py-1.5 focus-within:border-zinc-800 transition-colors">
          <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase mb-0.5">
            House / Flat
          </label>
          <input
            type="text"
            required
            placeholder="House #14, Street 5"
            value={data.houseNo || ""}
            onChange={(e) => handleAddressChange(e.target.value, data.area || "")}
            className="w-full bg-transparent text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none"
          />
        </div>

        {/* Area / Sector */}
        <div className="flex flex-col border-b border-zinc-300 py-1.5 focus-within:border-zinc-800 transition-colors">
          <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase mb-0.5">
            Area / Sector
          </label>
          <input
            type="text"
            required
            placeholder="Gulberg III, Block B"
            value={data.area || ""}
            onChange={(e) => handleAddressChange(data.houseNo || "", e.target.value)}
            className="w-full bg-transparent text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none"
          />
        </div>

        {/* City */}
        <div className="flex flex-col border-b border-zinc-300 py-1.5 focus-within:border-zinc-800 transition-colors">
          <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase mb-0.5">
            City
          </label>
          <input
            type="text"
            required
            placeholder="Lahore"
            value={data.city}
            onChange={(e) => updateField("city", e.target.value)}
            className="w-full bg-transparent text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none"
          />
        </div>

        {/* Zip Code */}
        <div className="flex flex-col border-b border-zinc-300 py-1.5 focus-within:border-zinc-800 transition-colors">
          <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase mb-0.5">
            Zip Code
          </label>
          <input
            type="text"
            required
            placeholder="54000"
            value={data.zipCode}
            onChange={(e) => updateField("zipCode", e.target.value)}
            className="w-full bg-transparent text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col border-b border-zinc-300 py-1.5 focus-within:border-zinc-800 transition-colors">
          <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase mb-0.5">
            Phone Number
          </label>
          <input
            type="tel"
            required
            maxLength={11}
            placeholder="03001234567"
            value={data.phone || ""}
            onChange={(e) => handlePhoneChange("phone", e.target.value)}
            className="w-full bg-transparent text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none"
          />
        </div>

        {/* WhatsApp Number */}
        <div className="flex flex-col border-b border-zinc-300 py-1.5 focus-within:border-zinc-800 transition-colors">
          <div className="flex items-center justify-between mb-0.5">
            <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
              WhatsApp Number
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-[10px] text-zinc-500 hover:text-zinc-800">
              <input
                type="checkbox"
                checked={sameAsPhone}
                onChange={handleToggleSameAsPhone}
                className="w-3 h-3 accent-[#312117] rounded cursor-pointer"
              />
              <span>Same as phone</span>
            </label>
          </div>
          <input
            type="tel"
            required
            maxLength={11}
            placeholder="03001234567"
            value={data.whatsapp || ""}
            onChange={(e) => handlePhoneChange("whatsapp", e.target.value)}
            className="w-full bg-transparent text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}


