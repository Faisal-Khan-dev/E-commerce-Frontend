"use client";

// components/cards/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag } from "lucide-react";
import { useRef, useState, useCallback } from "react";
import { useCart } from "@/context/CartContext";
import FlyToCart from "@/components/common/FlyToCart";

export interface ShopProduct {
  id: string;
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  salePrice?: number;
  rating: number;
  reviewsCount: number;
  imageSrc: string;
  badge?: {
    text: string;
    type: "premium" | "organic" | "rare" | "topseller";
  };
}

export function ScallopedDiscountBadge({ percent }: { percent: number }) {
  const numScallops = 16;
  const cx = 50;
  const cy = 50;
  const rPeak = 48;
  const rValley = 41;
  let d = "";

  for (let i = 0; i < numScallops; i++) {
    const a1 = (i * 2 * Math.PI) / numScallops;
    const aMid = ((i + 0.5) * 2 * Math.PI) / numScallops;
    const a2 = ((i + 1) * 2 * Math.PI) / numScallops;

    const x1 = cx + rPeak * Math.cos(a1);
    const y1 = cy + rPeak * Math.sin(a1);
    const xMid = cx + rValley * Math.cos(aMid);
    const yMid = cy + rValley * Math.sin(aMid);
    const x2 = cx + rPeak * Math.cos(a2);
    const y2 = cy + rPeak * Math.sin(a2);

    if (i === 0) {
      d += `M ${x1.toFixed(2)},${y1.toFixed(2)} `;
    }
    d += `Q ${xMid.toFixed(2)},${yMid.toFixed(2)} ${x2.toFixed(2)},${y2.toFixed(2)} `;
  }

  return (
    <div className="absolute top-2.5 right-2.5 z-10 w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md select-none pointer-events-none transition-transform duration-300 group-hover:scale-105">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <defs>
          <radialGradient id={`redBadgeGrad-${percent}`} cx="48%" cy="42%" r="58%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="60%" stopColor="#c41c1c" />
            <stop offset="100%" stopColor="#880e0e" />
          </radialGradient>
        </defs>

        {/* 16 Scalloped Outer Red Shape */}
        <path d={d} fill={`url(#redBadgeGrad-${percent})`} />

        {/* Inner Gold / Light Circular Ring */}
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="rgba(255, 235, 180, 0.85)"
          strokeWidth="1.6"
        />

        {/* Percentage Number Text */}
        <text
          x="50"
          y="43"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#ffffff"
          fontSize="24"
          fontWeight="900"
          style={{ fontFamily: "Arial Black, Impact, sans-serif" }}
        >
          {percent}%
        </text>

        {/* Subtext */}
        <text
          x="50"
          y="65"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#ffffff"
          fontSize="7"
          fontWeight="800"
          letterSpacing="0.8"
          style={{ fontFamily: "sans-serif" }}
        >
          DISCOUNT
        </text>
      </svg>
    </div>
  );
}

export default function ProductGridCard({
  id,
  _id,
  name,
  price,
  originalPrice,
  salePrice,
  rating,
  reviewsCount,
  imageSrc,
  badge,
}: ShopProduct) {
  const badgeColors = {
    premium: "bg-[#e2f0d9] text-[#4a6b36]",
    organic: "bg-[#e2f0d9] text-[#4a6b36]",
    rare: "bg-[#fce4d6] text-[#c65911]",
    topseller: "bg-zinc-800 text-zinc-100",
  };

  const origPrice = originalPrice || 0;
  const currSalePrice = salePrice && salePrice > 0 ? salePrice : 0;

  // Discount applies ONLY if originalPrice > 0, salePrice > 0, and salePrice < originalPrice (NOT equal)
  const hasDiscount =
    origPrice > 0 &&
    currSalePrice > 0 &&
    currSalePrice < origPrice;

  const discountPercent = hasDiscount
    ? Math.round(((origPrice - currSalePrice) / origPrice) * 100)
    : 0;

  const effectivePrice = currSalePrice > 0 ? currSalePrice : (origPrice || price);

  const { addItem, cartIconRef } = useCart();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [flyTrigger, setFlyTrigger] = useState(0);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault(); // prevent the wrapping Link from navigating
      e.stopPropagation();
      addItem({ id, name, price: effectivePrice, imageSrc, _id });
      setFlyTrigger((t) => t + 1);
    },
    [addItem, id, name, effectivePrice, imageSrc, _id]
  );

  return (
    <>
      {/* Fly-to-cart animation */}
      <FlyToCart
        originEl={buttonRef.current}
        targetEl={cartIconRef.current}
        imageSrc={imageSrc}
        trigger={flyTrigger}
      />

      <Link
        href={`/shop/${id}`}
        className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-zinc-100/60 cursor-pointer transition-all duration-300 flex flex-col h-full"
      >
        {/* Product Card Media Box */}
        <div className="relative w-full aspect-square bg-zinc-50 overflow-hidden">
          {badge && (
            <span
              className={`absolute top-3 left-3 z-10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider rounded-full uppercase shadow-xs ${badgeColors[badge.type]}`}
            >
              {badge.text}
            </span>
          )}
          {hasDiscount && <ScallopedDiscountBadge percent={discountPercent} />}
          <Image
            src={imageSrc}
            alt={`Premium organic variant of ${name}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-102"
          />
        </div>

        {/* Descriptive Details Bottom Box */}
        <div className="p-5 flex flex-col flex-grow bg-white">
          {/* Product Title */}
          <div className="block mb-2">
            <h3 className="font-serif text-base sm:text-lg text-zinc-900 tracking-wide leading-tight group-hover:text-amber-900 transition-colors duration-200">
              {name}
            </h3>
          </div>

          {/* Product Micro Stars Row */}
          <div className="flex items-center gap-1 mb-4">
            <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
            <span className="text-[11px] font-medium text-zinc-800">
              {rating && rating > 0 ? rating : 5}
            </span>
            <span className="text-[11px] text-zinc-400 font-light">
              ({reviewsCount} reviews)
            </span>
          </div>

          {/* Pricing Layout Row with Embedded Action Cart Button */}
          <div className="mt-auto pt-2 flex items-center justify-between">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-serif text-base sm:text-lg font-bold text-[#312117]">
                Rs. {Math.round(effectivePrice).toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="line-through text-stone-400 text-xs font-light">
                  Rs. {Math.round(origPrice).toLocaleString()}
                </span>
              )}
            </div>
            <button
              ref={buttonRef}
              onClick={handleAddToCart}
              aria-label={`Add ${name} to your shopping basket`}
              className="p-2.5 bg-[#312117] text-white rounded-md hover:bg-[#473224] active:scale-95 transition-all duration-200 shadow-sm cursor-pointer flex items-center justify-center"
            >
              <ShoppingBag className="w-4 h-4 stroke-current" />
            </button>
          </div>
        </div>
      </Link>
    </>
  );
}
