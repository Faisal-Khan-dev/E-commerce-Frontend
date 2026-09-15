import ShopClient from "./ShopClient";
import { ShopProduct } from "@/components/cards/ProductCard";
import axiosInstance from "@/lib/axios";

// Enable Incremental Static Regeneration (ISR) with a 60-second revalidation period
export const revalidate = 60;

export default async function ShopPage() {
  let initialProducts: ShopProduct[] = [];
  let initialPagination = {
    total: 0,
    page: 1,
    limit: 12,
    pages: 0,
  };

  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";
    
    // Fetch products statically during build / background regeneration using axios instance
    const res = await axiosInstance.get('/products', {
      params: { page: 1, limit: 12, sort: 'newest' },
    });

    if (res.status === 200) {
      const responseData = res.data;
      if (responseData.success) {
        initialProducts = responseData.products.map((product: any) => ({
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
        }));
        initialPagination = responseData.pagination;
      }
    }
  } catch (error) {
    console.error("Failed to pre-fetch products on server for ISR:", error);
  }

  // console.log("Initial products for ShopPage:", initialProducts);

  return (
    <ShopClient
      initialProducts={initialProducts}
      initialPagination={initialPagination}
    />
  );
}
