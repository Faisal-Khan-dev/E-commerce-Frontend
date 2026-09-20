"use client";

import { useEffect, useState, useRef, useCallback, Suspense } from "react";
import ShopSidebar from "@/components/sidebars/ShopSidebar";
import ProductGridCard, { ShopProduct } from "@/components/cards/ProductCard";
import { ChevronLeft, ChevronRight, Search, X, ChevronDown, SlidersHorizontal } from "lucide-react";
import { productService, Product } from "@/services/productService";

interface ShopClientProps {
  initialProducts: ShopProduct[];
  initialPagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export default function ShopClient({ initialProducts, initialPagination }: ShopClientProps) {
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<ShopProduct[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState(initialPagination);

  const handleCategoryChange = useCallback((categories: string[]) => {
    setSelectedCategories(categories);
    setCurrentPage(1);
  }, []);

  const isFirstRender = useRef(true);

  useEffect(() => {
    // Avoid double fetching on initial page load by skipping the first render useEffect call
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const categoryQuery =
          selectedCategories.length > 0
            ? selectedCategories.join(",")
            : undefined;

        const response = await productService.getAllProducts({
          page: currentPage,
          limit: 10,
          sort: sortBy,
          category: categoryQuery,
          search: searchTerm || undefined,
        });

        if (response.success) {
          // Map backend products to ShopProduct interface
          const mappedProducts: ShopProduct[] = response.products.map(
            (product: Product) => ({
              id: product.slug,
              _id: product._id,
              name: product.name,
              price: product.salePrice && product.salePrice > 0 ? product.salePrice : product.originalPrice,
              originalPrice: product.originalPrice,
              salePrice: product.salePrice,
              rating: product.ratings && product.ratings > 0 ? product.ratings : 5,
              reviewsCount: product.numReviews || 0,
              imageSrc: product.images?.[0] || "/bestseller-4.png",
              badge: product.category
                ? { text: product.category, type: "premium" as const }
                : undefined,
            })
          );

          setProducts(mappedProducts);
          setPagination(response.pagination);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, sortBy, selectedCategories, searchTerm]);

  return (
    <div className="w-full bg-white min-h-screen text-zinc-900 pb-16">
      {/* Header Banner */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 border-b-2 border-[#d7cbc4]">
        <h1 className="text-4xl font-serif tracking-wide mb-2 text-zinc-900">
          Organic Sourcing
        </h1>
        <p className="text-sm text-zinc-500 font-light max-w-2xl">
          Discover the purest expressions of nature, harvested from
          high-altitude estates and sun-drenched organic groves.
        </p>
      </header>

      {/* Main Content Layout Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col md:flex-row gap-8">
        {/* Left Side Filter Toolbar */}
        <aside className="w-full md:w-64 shrink-0">
          <Suspense fallback={<div className="text-xs text-zinc-400">Loading filters...</div>}>
            <ShopSidebar
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />
          </Suspense>
        </aside>

        {/* Right Side Control Bar & Grid Panel */}
        <main className="flex-grow">
          {/* Top Control Bar row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-stone-200/60">
            {/* Results Count & Filter Indicator - Left Side */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 text-[11px] font-semibold text-[#312117] tracking-wider uppercase">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#312117]" />
                {loading ? "Loading..." : `Showing ${products.length} of ${pagination.total} Products`}
              </span>
            </div>

            {/* Sort Dropdown & Search Input - Right Side */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              {/* Search Input Container */}
              <div className="relative w-full sm:w-80 md:w-96 lg:w-[28rem]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page when searching
                  }}
                  className="w-full pl-10 pr-9 py-2.5 bg-stone-50 hover:bg-white text-xs font-medium text-stone-800 placeholder-stone-400 border border-stone-200/90 rounded-xl outline-none focus:outline-none focus:bg-white focus:border-stone-300 focus:ring-0 transition-all shadow-xs"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("");
                      setCurrentPage(1);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort Dropdown Container */}
              <div className="relative w-full sm:w-auto shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full appearance-none pl-4 pr-10 py-2.5 bg-stone-50 hover:bg-white text-xs font-semibold text-stone-800 border border-stone-200/90 rounded-xl outline-none focus:outline-none focus:bg-white focus:border-stone-300 focus:ring-0 cursor-pointer transition-all shadow-xs"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="low-to-high">Price: Low to High</option>
                  <option value="high-to-low">Price: High to Low</option>
                  <option value="top-rated">Highest Rated</option>
                  <option value="most-reviewed">Most Reviewed</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-100 border border-red-300 rounded text-red-700 text-sm mb-6">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-zinc-200 rounded-xl aspect-square animate-pulse"
                />
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              {/* Core Product Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductGridCard key={product._id} {...product} />
                ))}
              </div>

              {/* Clean Pagination Bar */}
              {pagination.pages > 1 && (
                <nav
                  className="flex justify-center items-center gap-2 mt-16"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="p-2 border border-zinc-300 rounded-full text-zinc-600 hover:text-[#312117] hover:border-[#312117] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {[...Array(pagination.pages)].map((_, i) => {
                    const page = i + 1;
                    if (
                      page === 1 ||
                      page === pagination.pages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-9 h-9 flex items-center justify-center rounded-full text-xs font-medium transition-colors cursor-pointer ${currentPage === page
                            ? "bg-[#312117] text-white font-semibold shadow-xs"
                            : "text-zinc-600 hover:text-[#312117]"
                            }`}
                        >
                          {page}
                        </button>
                      );
                    }
                    if (
                      (page === 2 && currentPage > 3) ||
                      (page === pagination.pages - 1 && currentPage < pagination.pages - 2)
                    ) {
                      return (
                        <span key={page} className="text-zinc-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(prev + 1, pagination.pages)
                      )
                    }
                    disabled={currentPage === pagination.pages}
                    className="p-2 border border-zinc-300 rounded-full text-zinc-600 hover:text-[#312117] hover:border-[#312117] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </nav>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-zinc-600">No products found.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
