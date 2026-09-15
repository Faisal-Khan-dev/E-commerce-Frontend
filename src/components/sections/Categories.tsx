// components/CategorySection.tsx
import CategoryCard, { CategoryCardProps } from "../cards/CategoryCard";

const CATEGORIES: CategoryCardProps[] = [
  {
    title: "Dry Fruits",
    subtitle: "Explore Variety",
    imageSrc: "/category-img-1.png",
    // Encodes space safely to /shop?category=Dry%20Fruits
    href: `/shop?category=${encodeURIComponent("Dry Fruits")}`,
  },
  {
    title: "Essential Oils",
    subtitle: "Browse Collection",
    imageSrc: "/category-img-2.png",
    // Maps seamlessly to the "Oils" category token expected by your shop sidebar
    href: `/shop?category=${encodeURIComponent("Oils")}`,
  },
  {
    title: "Shilajeet",
    subtitle: "Ancient Energy",
    imageSrc: "/category-img-3.png",
    href: `/shop?category=${encodeURIComponent("Shilajeet")}`,
  },
];

export default function CategorySection() {
  return (
    <section className="w-full bg-[#fcf9f6] py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Responsive Flex Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CATEGORIES.map((category, idx) => (
            <CategoryCard
              key={idx}
              title={category.title}
              subtitle={category.subtitle}
              imageSrc={category.imageSrc}
              href={category.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}