// components/BestSellers.tsx
import Link from "next/link";
import BestSellerCard, { BestSeller } from "../cards/BestSellerCard";

const BEST_SELLERS: BestSeller[] = [
  {
    id: "extra-virgin-olive-oil",
    _id: "650000000000000000000001",
    name: "Olive Oil",
    description: "Cold-Pressed Extra Virgin (1000ml)",
    price: 28,
    imageSrc: "/olive web.jfif",
    rating: 5,
    reviewsCount: 40,
    badge: { text: "Cold-Pressed", type: "organic" },
  },
  {
    id: "himalayan-walnuts",
    _id: "650000000000000000000002",
    name: "Walnut Oil",
    description: "Cold-Pressed Extra Virgin (1000ml)",
    price: 24,
    imageSrc: "/walnut web.jfif",
    rating: 5,
    reviewsCount: 35,
    badge: { text: "Organic", type: "organic" },
  },
  {
    id: "pure-coconut-oil",
    _id: "650000000000000000000003",
    name: "Coconut Oil",
    description: "Pure Cold-Pressed Virgin (500ml)",
    price: 20,
    imageSrc: "/cocnut web.jfif",
    rating: 4.9,
    reviewsCount: 29,
    badge: { text: "100% Pure", type: "new" },
  },
  {
    id: "pure-castor-oil",
    _id: "650000000000000000000004",
    name: "Castor Oil",
    description: "Hexane-Free Cold-Pressed (250ml)",
    price: 18,
    imageSrc: "/castor web.jfif",
    rating: 4.9,
    reviewsCount: 25,
    badge: { text: "Best Seller", type: "bestseller" },
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
