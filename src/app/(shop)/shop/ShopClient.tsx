"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import ShopSidebar from "@/components/sidebars/ShopSidebar";
import ProductGridCard, { ShopProduct } from "@/components/cards/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
              price: product.salePrice || product.originalPrice,
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
          <ShopSidebar
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
          />
        </aside>

        {/* Right Side Control Bar & Grid Panel */}
        <main className="flex-grow">
          {/* Top Control Bar row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6">
            {/* Results Count - Left Side */}
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider whitespace-nowrap">
              {loading ? "Loading..." : `Showing ${products.length} of ${pagination.total}`}
            </span>

            {/* Sort Dropdown & Search Input - Right Side */}
            <div className="flex items-center gap-3 ml-auto">
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
                className="w-108 px-4 py-2.5 bg-[#f5efe9] text-xs font-medium text-zinc-700 placeholder-zinc-400 border border-zinc-300/30 rounded outline-none focus:border-zinc-400 transition-colors"
              />
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-[#f5efe9] text-xs font-medium text-zinc-700 px-4 py-2.5 rounded border border-zinc-300/30 outline-none focus:border-zinc-400 cursor-pointer transition-colors"
              >
                <option value="newest">Sort by: Featured</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
                <option value="top-rated">Highest Rated</option>
              </select>
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
                    className="p-2 border border-zinc-300 rounded-full text-zinc-600 hover:bg-zinc-900 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                          className={`w-9 h-9 flex items-center justify-center rounded-full text-xs font-medium transition-colors ${
                            currentPage === page
                              ? "bg-zinc-900 text-white font-semibold"
                              : "text-zinc-600 hover:bg-zinc-200/50"
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
                    className="p-2 border border-zinc-300 rounded-full text-zinc-600 hover:bg-zinc-900 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
