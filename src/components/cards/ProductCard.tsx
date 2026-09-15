"use client";

// components/cards/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { useRef, useState, useCallback } from "react";
import { useCart } from "@/context/CartContext";
import FlyToCart from "@/components/common/FlyToCart";

export interface ShopProduct {
  id: string;
  _id: string;
  name: string;
  price: number;
  rating: number;
  reviewsCount: number;
  imageSrc: string;
  badge?: {
    text: string;
    type: "premium" | "organic" | "rare" | "topseller";
  };
}

export default function ProductGridCard({
  id,
  _id,
  name,
  price,
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

  const { addItem, cartIconRef } = useCart();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [flyTrigger, setFlyTrigger] = useState(0);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault(); // prevent the wrapping Link from navigating
      e.stopPropagation();
      addItem({ id, name, price, imageSrc, _id });
      setFlyTrigger((t) => t + 1);
    },
    [addItem, id, name, price, imageSrc, _id]
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
            <span className="font-serif text-base sm:text-lg font-medium text-zinc-900">
              Rs. {Math.round(price).toLocaleString()}
            </span>
            <button
              ref={buttonRef}
              onClick={handleAddToCart}
              aria-label={`Add ${name} to your shopping basket`}
              className="p-2.5 bg-[#312117] text-white rounded-md hover:bg-[#473224] active:scale-95 transition-all duration-200 shadow-sm"
            >
              <Image src="/cart-icon.png" width={14} height={14} alt="Add to Cart" />
            </button>
          </div>
        </div>
      </Link>
    </>
  );
}
