import axiosInstance from "@/lib/axios";

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  originalPrice: number;
  salePrice: number;
  category: string;
  stock: boolean;
  images: string[];
  ratings?: number;
  numReviews?: number;
  reviews?: Array<{
    _id: string;
    rating: number;
    comment: string;
    user?: {
      firstName: string;
      lastName?: string;
      email: string;
    };
    createdAt?: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsResponse {
  success: boolean;
  message: string;
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
  filters: {
    search: string | null;
    category: string | null;
    priceRange: {
      min: number | null;
      max: number | null;
    };
    sort: string;
  };
  products: Product[];
}

interface FetchProductsParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  signal?: AbortSignal;
}

// In-Memory Cache Store with TTL & Request Deduplication
const cache = new Map<string, { timestamp: number; data: any }>();
const inFlightRequests = new Map<string, Promise<any>>();

const CACHE_TTL_PRODUCT_LIST = 60 * 1000; // 1 minute
const CACHE_TTL_SINGLE_PRODUCT = 120 * 1000; // 2 minutes
const CACHE_TTL_CATEGORIES = 300 * 1000; // 5 minutes

export const productService = {
  async getAllProducts(params: FetchProductsParams = {}): Promise<ProductsResponse> {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.category) queryParams.append("category", params.category);
    if (params.search) queryParams.append("search", params.search);
    if (params.minPrice) queryParams.append("minPrice", params.minPrice.toString());
    if (params.maxPrice) queryParams.append("maxPrice", params.maxPrice.toString());
    if (params.sort) queryParams.append("sort", params.sort);

    const cacheKey = `products_${queryParams.toString()}`;

    // Return cached response if valid
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_PRODUCT_LIST) {
      return cached.data;
    }

    // Deduplicate in-flight identical requests
    if (inFlightRequests.has(cacheKey) && !params.signal) {
      return inFlightRequests.get(cacheKey)!;
    }

    const requestPromise = (async () => {
      try {
        const response = await axiosInstance.get<ProductsResponse>(
          `/products?${queryParams.toString()}`,
          { signal: params.signal }
        );
        cache.set(cacheKey, { timestamp: Date.now(), data: response.data });
        return response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      } finally {
        inFlightRequests.delete(cacheKey);
      }
    })();

    if (!params.signal) {
      inFlightRequests.set(cacheKey, requestPromise);
    }

    return requestPromise;
  },

  async getCategories(): Promise<{ success: boolean; categories: string[] }> {
    const cacheKey = "product_categories";

    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_CATEGORIES) {
      return cached.data;
    }

    if (inFlightRequests.has(cacheKey)) {
      return inFlightRequests.get(cacheKey)!;
    }

    const requestPromise = (async () => {
      try {
        const response = await axiosInstance.get("/products/categories");
        cache.set(cacheKey, { timestamp: Date.now(), data: response.data });
        return response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
      } finally {
        inFlightRequests.delete(cacheKey);
      }
    })();

    inFlightRequests.set(cacheKey, requestPromise);
    return requestPromise;
  },

  async getProductBySlug(slug: string): Promise<{ success: boolean; product: Product }> {
    const cacheKey = `product_slug_${slug}`;

    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_SINGLE_PRODUCT) {
      return cached.data;
    }

    if (inFlightRequests.has(cacheKey)) {
      return inFlightRequests.get(cacheKey)!;
    }

    const requestPromise = (async () => {
      try {
        const response = await axiosInstance.get(`/products/${slug}`);
        cache.set(cacheKey, { timestamp: Date.now(), data: response.data });
        return response.data;
      } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
      } finally {
        inFlightRequests.delete(cacheKey);
      }
    })();

    inFlightRequests.set(cacheKey, requestPromise);
    return requestPromise;
  },

  clearCache() {
    cache.clear();
  },
};
