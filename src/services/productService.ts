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
}

export const productService = {
  async getAllProducts(params: FetchProductsParams = {}): Promise<ProductsResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params.page) queryParams.append("page", params.page.toString());
      if (params.limit) queryParams.append("limit", params.limit.toString());
      if (params.category) queryParams.append("category", params.category);
      if (params.search) queryParams.append("search", params.search);
      if (params.minPrice) queryParams.append("minPrice", params.minPrice.toString());
      if (params.maxPrice) queryParams.append("maxPrice", params.maxPrice.toString());
      if (params.sort) queryParams.append("sort", params.sort);

      const response = await axiosInstance.get<ProductsResponse>(
        `/products?${queryParams.toString()}`
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  async getCategories(): Promise<{ success: boolean; categories: string[] }> {
    try {
      const response = await axiosInstance.get("/products/categories");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  async getProductBySlug(slug: string): Promise<{ success: boolean; product: Product }> {
    try {
      const response = await axiosInstance.get(`/products/${slug}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },
};
