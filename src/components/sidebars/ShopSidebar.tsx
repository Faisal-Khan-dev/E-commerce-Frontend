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

  // 1. Fetch available categories directly from API products database
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
          // Deep deduplication matching values uniformly
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

          // Initial URL sync for single or multiple category query params
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
    <div className="space-y-8 sticky top-6">
      {/* Available Categories Checkboxes */}
      <div>
        <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-400 mb-4">
          Categories
        </h4>

        {loading ? (
          <p className="text-xs text-zinc-400 font-light mb-3">
            Loading categories...
          </p>
        ) : error ? (
          <p className="text-xs text-red-500 mb-3">{error}</p>
        ) : categories.length === 0 ? (
          <p className="text-xs text-zinc-400 font-light mb-3">
            No categories available.
          </p>
        ) : null}

        <div className="space-y-3">
          {categories.map((cat) => {
            const checked = selectedCategories.some(
              (c) => c.toLowerCase().trim() === cat.toLowerCase().trim(),
            );

            return (
              <label
                key={cat}
                className="flex items-center gap-3 text-xs font-medium text-zinc-700 cursor-pointer select-none group"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleCheckboxToggle(cat)}
                  className="w-4 h-4 rounded border-zinc-300 bg-white text-emerald-600 focus:ring-0 accent-emerald-700 cursor-pointer"
                />
                <span className="group-hover:text-zinc-900 transition-colors">
                  {cat}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
