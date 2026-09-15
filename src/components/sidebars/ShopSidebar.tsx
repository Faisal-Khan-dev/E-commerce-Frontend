// components/shop/ShopSidebar.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { productService } from "@/services/productService";

interface ShopSidebarProps {
  selectedCategories?: string[];
  onCategoryChange?: (categories: string[]) => void;
}

export default function ShopSidebar({
  selectedCategories = [],
  onCategoryChange,
}: ShopSidebarProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isInitialSyncDone = useRef(false);

  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await productService.getCategories();

        if (
          response &&
          response.success &&
          Array.isArray(response.categories)
        ) {
          const uniqueMap = new Map<string, string>();
          response.categories.forEach((cat) => {
            if (typeof cat === "string" && cat.trim()) {
              const lower = cat.toLowerCase().trim();
              if (!uniqueMap.has(lower)) {
                uniqueMap.set(lower, cat.trim());
              }
            }
          });

          const finalizedList = Array.from(uniqueMap.values());
          if (isMounted) setCategories(finalizedList);

          if (categoryParam && !isInitialSyncDone.current) {
            isInitialSyncDone.current = true;
            const urlCats = categoryParam
              .split(",")
              .map((c) => c.toLowerCase().trim());
            const matchedList = finalizedList.filter((c) =>
              urlCats.includes(c.toLowerCase().trim()),
            );

            if (matchedList.length > 0) {
              onCategoryChange?.(matchedList);
            }
          }
        } else {
          if (isMounted) setCategories([]);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        if (isMounted) setError("Failed to load available categories");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, [categoryParam]);

  const handleCheckboxToggle = (cat: string) => {
    const isSelected = selectedCategories.some(
      (c) => c.toLowerCase().trim() === cat.toLowerCase().trim(),
    );

    let updatedList: string[];
    if (isSelected) {
      updatedList = selectedCategories.filter(
        (c) => c.toLowerCase().trim() !== cat.toLowerCase().trim(),
      );
    } else {
      updatedList = [...selectedCategories, cat];
    }

    onCategoryChange?.(updatedList);
  };

  return (
    <div className="space-y-6 sticky top-6">
      <div>
        <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#312117] mb-4 pb-1">
          Categories
        </h4>

        {loading ? (
          <p className="text-xs text-stone-400 font-light mb-3">
            Loading categories...
          </p>
        ) : error ? (
          <p className="text-xs text-red-500 mb-3">{error}</p>
        ) : categories.length === 0 ? (
          <p className="text-xs text-stone-400 font-light mb-3">
            No categories available.
          </p>
        ) : null}

        <div className="space-y-2.5">
          {categories.map((cat) => {
            const checked = selectedCategories.some(
              (c) => c.toLowerCase().trim() === cat.toLowerCase().trim(),
            );

            return (
              <div
                key={cat}
                onClick={() => handleCheckboxToggle(cat)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs cursor-pointer select-none transition-all duration-200 bg-white border shadow-xs hover:shadow-sm ${
                  checked
                    ? "border-[#312117] text-[#312117] font-semibold"
                    : "border-stone-200/90 text-stone-700 hover:text-stone-900 hover:border-stone-300 font-medium"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={checked}
                    readOnly
                    className="w-4 h-4 rounded border-stone-300 bg-white text-[#312117] focus:ring-0 accent-[#312117] cursor-pointer"
                  />
                  <span>{cat}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
