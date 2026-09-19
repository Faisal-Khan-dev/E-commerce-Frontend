"use client";

// components/cards/BestSellerCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag } from "lucide-react";
import { useRef, useState, useCallback } from "react";
import { useCart } from "@/context/CartContext";
import FlyToCart from "@/components/common/FlyToCart";

export interface BestSeller {
  id: string;
  _id?: string;
  name: string;
  description: string;
  price?: number;
  imageSrc: string;
  rating?: number;
  reviewsCount?: number;
  badge?: {
    text: string;
    type: "organic" | "new" | "bestseller";
  };
}

export default function BestSellerCard({
  id,
  _id = "650000000000000000000001",
  name,
  description,
  price = 20,
  imageSrc,
  rating = 5,
  reviewsCount = 32,
  badge,
}: BestSeller) {
  // Map dynamic badge colors to match the subtle tones in your UI
  const badgeStyles = {
    organic: "bg-[#e2f0d9] text-[#4a6b36]",
    new: "bg-[#fce4d6] text-[#c65911]",
    bestseller: "bg-[#e2f0d9] text-[#4a6b36]",
  };

  const { addItem, cartIconRef } = useCart();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [flyTrigger, setFlyTrigger] = useState(0);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      addItem({ id, name, price, imageSrc, _id });
      setFlyTrigger((t) => t + 1);
    },
    [addItem, id, name, price, imageSrc, _id]
  );

  return (
    <>
      <FlyToCart
        originEl={buttonRef.current}
        targetEl={cartIconRef.current}
        imageSrc={imageSrc}
        trigger={flyTrigger}
      />

      <Link
        href={`/shop/${id}`}
        className="group bg-[#fffdfa] rounded-xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 ease-out flex flex-col border border-zinc-100/60"
      >
        {/* Image Container with Badges */}
        <div className="relative w-full aspect-square bg-zinc-100 overflow-hidden">
          {badge && (
            <span
              className={`absolute top-4 left-4 z-10 px-3 py-1 text-[11px] font-medium rounded-full tracking-wide shadow-xs ${badgeStyles[badge.type]}`}
            >
              {badge.text}
            </span>
          )}
          <Image
            src={imageSrc}
            alt={`Premium packaging of ${name}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* Product Information */}
        <div className="p-5 flex flex-col grow bg-[#fffdfa]">
          <h3 className="text-lg font-serif text-zinc-900 tracking-wide mb-1 transition-colors duration-300 group-hover:text-[#402e22] font-medium">
            {name}
          </h3>
          <p className="text-xs text-zinc-500 font-light mb-3">{description}</p>

          {/* Product Micro Stars Row */}
          <div className="flex items-center gap-1 mb-4">
            <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
            <span className="text-[11px] font-medium text-zinc-800">
              {rating}.0
            </span>
            <span className="text-[11px] text-zinc-400 font-light ml-0.5">
              ({reviewsCount} reviews)
            </span>
          </div>

          {/* Action Row replacing Price with Shop Icon Button */}
          <div className="mt-auto pt-3 border-t border-zinc-100 flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-zinc-400 group-hover:text-[#402e22] transition-colors">
              Organic Select
            </span>
            <button
              ref={buttonRef}
              onClick={handleAddToCart}
              aria-label={`Add ${name} to your shopping basket`}
              className="p-2.5 bg-[#312117] text-white rounded-lg hover:bg-[#402e22] active:scale-95 transition-all duration-200 shadow-sm cursor-pointer flex items-center justify-center"
            >
              <ShoppingBag className="w-4 h-4 stroke-current" />
            </button>
          </div>
        </div>
      </Link>
    </>
  );
}

