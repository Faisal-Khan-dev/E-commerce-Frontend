// components/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";

export interface BestSeller {
  id: string;
  name: string;
  description: string;
  price: number;
  imageSrc: string;
  badge?: {
    text: string;
    type: "organic" | "new" | "bestseller";
  };
}

export default function BestSellerCard({
  id,
  name,
  description,
  price,
  imageSrc,
  badge,
}: BestSeller) {
  // Map dynamic badge colors to match the subtle tones in your UI
  const badgeStyles = {
    organic: "bg-[#e2f0d9] text-[#4a6b36]",
    new: "bg-[#fce4d6] text-[#c65911]",
    bestseller: "bg-[#e2f0d9] text-[#4a6b36]", // Using a clean premium green similar to organic
  };

  return (
    <Link
      href={`/shop/${id}`}
      className="group bg-[#fffdfa] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ease-out flex flex-col border border-zinc-100/50"
    >
      {/* Image Container with Badges */}
      <div className="relative w-full aspect-square bg-zinc-100 overflow-hidden">
        {badge && (
          <span
            className={`absolute top-4 left-4 z-10 px-3 py-1 text-[11px] font-medium rounded-full tracking-wide shadow-sm ${badgeStyles[badge.type]}`}
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
      <div className="p-6 flex flex-col items-center text-center grow bg-[#fffdfa]">
        <h3 className="text-lg sm:text-xl font-serif text-zinc-900 tracking-wide mb-1 transition-colors duration-300 group-hover:text-amber-900">
          {name}
        </h3>
        <p className="text-xs text-zinc-500 font-light mb-4">{description}</p>
        <div className="mt-auto font-serif text-base sm:text-lg font-medium text-zinc-900">
          Rs. {Math.round(price).toLocaleString()}
        </div>
      </div>
    </Link>
  );
}
