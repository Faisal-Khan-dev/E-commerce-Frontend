// components/BestSellers.tsx
import Link from "next/link";
import BestSellerCard, { BestSeller } from "../cards/BestSellerCard";

const BEST_SELLERS: BestSeller[] = [
  {
    id: "himalayan-walnuts",
    name: "Himalayan Walnuts",
    description: "Raw, Shelled (500g)",
    price: 24.0,
    imageSrc: "/bestseller-1.png",
    badge: { text: "Organic", type: "organic" },
  },
  {
    id: "sweet-almond-oil",
    name: "Sweet Almond Oil",
    description: "Cold-Pressed (250ml)",
    price: 18.0,
    imageSrc: "/bestseller-2.png",
    badge: { text: "New", type: "new" },
  },
  {
    id: "pure-shilajeet-resin",
    name: "Pure Shilajeet Resin",
    description: "Grade A+ (30g)",
    price: 45.0,
    imageSrc: "/bestseller-3.png",
    badge: { text: "Best Seller", type: "bestseller" },
  },
  {
    id: "giant-pistachios",
    name: "Giant Pistachios",
    description: "Roasted & Salted (400g)",
    price: 22.0,
    imageSrc: "/bestseller-4.png",
  },
];

export default function BestSellers() {
  return (
    <section className="w-full bg-[#fcf9f6] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-10 border-b border-zinc-200/60 pb-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif text-zinc-900 tracking-tight mb-2">
              Best Sellers
            </h2>
            <p className="text-sm text-zinc-500 font-light">
              Our most requested organic treasures.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold tracking-widest uppercase text-zinc-900 border-b border-zinc-900 pb-1 hover:text-zinc-600 hover:border-zinc-400 transition-colors duration-300 whitespace-nowrap"
          >
            View All
          </Link>
        </div>

        {/* Dynamic Responsive 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {BEST_SELLERS.map((product) => (
            <BestSellerCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
