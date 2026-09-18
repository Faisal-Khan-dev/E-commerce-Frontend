"use client";

import { use, useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  Shield,
  Truck,
  CheckCircle2,
  Leaf,
  Zap,
  Brain,
  Activity,
  ArrowLeft,
  ShoppingBag,
  Zap as ZapIcon,
  ChevronRight,
  Sparkles,
  Award,
} from "lucide-react";
import { productService, Product } from "@/services/productService";
import { useCart } from "@/context/CartContext";
// 1. Import useAuth to pull user details directly from the global application state sandbox
import { useAuth } from "@/context/AuthContext";
import FlyToCart from "@/components/common/FlyToCart";
import ReviewModal from "@/components/modals/AddReviewModal";
import axiosInstance from "@/lib/axios";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [addedToCart, setAddedToCart] = useState(false);

  // Modal display states
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

  // Cart Context parameters
  const { addItem, cartIconRef } = useCart();
  const addToCartBtnRef = useRef<HTMLButtonElement>(null);
  const [flyTrigger, setFlyTrigger] = useState(0);

  // 2. Destructure active user identity profile variables and authentication flags from context matrix
  const { user, isAuthenticated } = useAuth();

  const fetchProductDetails = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await productService.getProductBySlug(slug);
      if (response.success && response.product) {
        setProduct(response.product);
        if (response.product.images && response.product.images.length > 0) {
          setActiveImage(response.product.images[0]);
        } else {
          setActiveImage("/product-page-pic.png");
        }
      } else {
        setError("Product details could not be loaded.");
      }
    } catch (err: unknown) {
      console.error("Error fetching product details:", err);
      if (err && typeof err === "object" && "response" in err) {
        const errorResponse = (err as any).response;
        setError(
          errorResponse?.data?.message ||
            "Failed to load product. Please check your network connection.",
        );
      } else {
        setError(
          "Failed to load product. Please check your network connection.",
        );
      }
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    addItem({
      id: product.slug,
      _id: product._id,
      name: product.name,
      price: product.salePrice || product.originalPrice,
      imageSrc: product.images?.[0] || "/product-page-pic.png",
      quantity,
    });
    setFlyTrigger((t) => t + 1);

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  }, [product, addItem, quantity]);

  const handleBuyNow = useCallback(() => {
    if (!product) return;
    addItem({
      id: product.slug,
      _id: product._id,
      name: product.name,
      price: product.salePrice || product.originalPrice,
      imageSrc: product.images?.[0] || "/product-page-pic.png",
      quantity,
    });
    router.push("/cart");
  }, [product, addItem, quantity, router]);

  // Handle Auth Gate validation checks before rendering Modal Matrix using state context parameters
  const handleWriteReviewClick = () => {
    if (!isAuthenticated || !user) {
      // Direct context routing to pass redirection parameters seamlessly back down to this slug
      router.push(`/login?redirect=/shop/${slug}`);
      return;
    }

    setIsReviewModalOpen(true);
  };

  // Interfacing the structured Multipart / JSON Formdata submissions directly to API endpoint
  const handleReviewSubmit = async (formData: FormData) => {
    if (!product) return;

    if (!isAuthenticated || !user) {
      throw new Error("Your session has timed out. Please sign in again.");
    }

    // Safely parse identifier fallbacks from user profile context object model
    const userId = user._id;
    if (!userId) {
      throw new Error(
        "Authentication profiling details missing. Please sign back in.",
      );
    }

    // Inject mandatory data structures defined by your backend specification architecture
    formData.append("productId", product._id);
    formData.append("userId", userId);

    const response = await axiosInstance.post("/reviews", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = await response.data;

    if (!data.success) {
      throw new Error(
        data.message || "Failed to dispatch review content parameters.",
      );
    }

    // Refresh layout data sandbox context to view the shiny newly published client review
    fetchProductDetails();
  };

  if (loading) {
    return (
      <div className="w-full bg-[#fcf9f6] min-h-screen text-zinc-900 flex flex-col items-center justify-center py-24">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
          <div className="space-y-4 animate-pulse">
            <div className="w-full aspect-square bg-zinc-200/80 rounded-2xl" />
            <div className="grid grid-cols-5 gap-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="aspect-square bg-zinc-200/80 rounded-xl" />
              ))}
            </div>
          </div>
          <div className="space-y-6 animate-pulse pt-2">
            <div className="h-6 w-36 bg-zinc-200/80 rounded-full" />
            <div className="h-12 w-4/5 bg-zinc-200/80 rounded-lg" />
            <div className="h-4 w-28 bg-zinc-200/80 rounded" />
            <div className="h-10 w-32 bg-zinc-200/80 rounded-md" />
            <div className="h-28 w-full bg-zinc-200/80 rounded-xl" />
            <div className="h-14 w-full bg-zinc-200/80 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="w-full bg-[#fcf9f6] min-h-screen text-zinc-900 flex flex-col items-center justify-center py-24 px-4">
        <div className="max-w-md w-full bg-white border border-zinc-200 p-8 rounded-2xl shadow-sm text-center">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-red-600 mx-auto mb-4 font-bold text-lg">
            !
          </div>
          <h2 className="text-xl font-serif text-zinc-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-xs text-zinc-500 font-light mb-6 leading-relaxed">
            {error ||
              "The requested organic product does not exist or has been removed."}
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#312117] hover:bg-[#432f22] text-white text-xs font-semibold uppercase tracking-widest rounded-md shadow-md transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : ["/product-page-pic.png"];

  const isSale =
    product.salePrice > 0 && product.salePrice < product.originalPrice;
  const discountPercent = isSale
    ? Math.round(
        ((product.originalPrice - product.salePrice) / product.originalPrice) *
          100,
      )
    : 0;

  const premiumBenefits = [
    {
      icon: <Zap className="w-5 h-5 text-[#312117]" />,
      title: "Sustained Vitality",
      desc: "Naturally boosts ATP production, providing a clean energy lift without the jitters associated with caffeine or synthetic stimulants.",
    },
    {
      icon: <Brain className="w-5 h-5 text-[#312117]" />,
      title: "Cognitive Clarity",
      desc: "Rich in fulvic acid, known for its neuroprotective properties and ability to enhance mental focus and long-term memory.",
    },
    {
      icon: <Activity className="w-5 h-5 text-[#312117]" />,
      title: "Cellular Recovery",
      desc: "Contains over 85 trace minerals that support the body's natural healing processes and optimize nutrient absorption.",
    },
  ];

  return (
    <div className="w-full bg-[#fcf9f6] min-h-screen text-zinc-900 pb-24 text-left">
      <FlyToCart
        originEl={addToCartBtnRef.current}
        targetEl={cartIconRef.current}
        imageSrc={product.images?.[0] || "/product-page-pic.png"}
        trigger={flyTrigger}
      />

      {/* Main Product Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12">
        {/* Sleek Breadcrumb Header Bar */}
        <nav className="flex items-center gap-2 text-xs text-zinc-400 font-light mb-8">
          <Link href="/" className="hover:text-zinc-800 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-zinc-300" />
          <Link href="/shop" className="hover:text-zinc-800 transition-colors">
            Shop
          </Link>
          {product.category && (
            <>
              <ChevronRight className="w-3 h-3 text-zinc-300" />
              <span className="text-zinc-500 font-medium">
                {product.category}
              </span>
            </>
          )}
          <ChevronRight className="w-3 h-3 text-zinc-300" />
          <span className="text-zinc-800 font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-start">
          {/* Left Media Gallery Column */}
          <div className="space-y-4">
            <div className="relative w-full aspect-square bg-[#f5efe9]/40 rounded-2xl overflow-hidden border border-zinc-200/70 shadow-xs group">
              <Image
                src={activeImage || galleryImages[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Floating Quality Overlay Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-white/90 backdrop-blur-md text-[#312117] text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-zinc-200/50 shadow-2xs flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-600 fill-amber-600" /> Premium Organic
                </span>
                {isSale && (
                  <span className="bg-[#312117] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-2xs">
                    Save {discountPercent}%
                  </span>
                )}
              </div>
            </div>

            {/* Gallery Thumbnails Strip */}
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {galleryImages.slice(0, 5).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative aspect-square bg-[#f5efe9]/30 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                      activeImage === img
                        ? "border-[#312117] ring-2 ring-[#312117]/20 scale-102"
                        : "border-zinc-200 hover:border-zinc-400"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="10vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Information Column */}
          <div className="flex flex-col pt-1">
            {/* Category & Stock Status Pill */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#4a6b36] bg-[#e2f0d9] border border-[#4a6b36]/20 px-3.5 py-1 rounded-full uppercase inline-flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${product.stock ? "bg-emerald-500 animate-pulse" : "bg-red-400"}`} />
                {product.category || "Organic"} • {product.stock ? "IN STOCK" : "OUT OF STOCK"}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-zinc-900 mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Rating Stars & Customer Review Count */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-200/60">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => {
                  const ratingValue = (product.numReviews && product.numReviews > 0) ? (product.ratings || 5) : 5;
                  const isFilled = i < Math.floor(ratingValue);
                  return (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        isFilled
                          ? "fill-[#312117] stroke-[#312117]"
                          : "fill-none stroke-zinc-300"
                      }`}
                    />
                  );
                })}
              </div>
              <span className="text-xs font-medium text-zinc-700">
                {product.ratings && product.numReviews ? product.ratings.toFixed(1) : "5.0"}
              </span>
              <span className="text-zinc-300">•</span>
              <span className="text-xs font-light text-zinc-500">
                {product.numReviews || 0} Customer Testimonials
              </span>
            </div>

            {/* Price Display Block */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-serif text-3xl sm:text-4xl font-semibold text-[#312117]">
                Rs. {Math.round(product.salePrice || product.originalPrice).toLocaleString()}
              </span>
              {isSale && (
                <span className="line-through text-base text-zinc-400 font-light">
                  Rs. {Math.round(product.originalPrice).toLocaleString()}
                </span>
              )}
            </div>

            {/* Description Paragraph */}
            <p className="text-zinc-600 text-sm sm:text-base font-light leading-relaxed mb-8 border-b border-zinc-200/60 pb-8 text-balance">
              {product.description ||
                "Handcrafted from pure, ethically sourced organic ingredients. Formulated to provide optimal health benefits with zero synthetic additives."}
            </p>

            {/* Quantity Selector Stepper */}
            <div className="mb-6">
              <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block mb-3">
                Select Quantity
              </label>
              <div className="flex items-center border border-zinc-300 rounded-lg w-fit bg-white p-1 shadow-2xs">
                <button
                  type="button"
                  data-no-ripple="true"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-9 h-9 flex items-center justify-center text-zinc-600 hover:text-zinc-950 text-base font-medium rounded-md transition-colors cursor-pointer select-none"
                >
                  -
                </button>
                <span className="w-10 text-center text-sm font-semibold select-none text-zinc-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  data-no-ripple="true"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-9 h-9 flex items-center justify-center text-zinc-600 hover:text-zinc-950 text-base font-medium rounded-md transition-colors cursor-pointer select-none"
                >
                  +
                </button>
              </div>
            </div>

            {/* Call To Action Buttons */}
            <div className="space-y-3 mb-8">
              <button
                ref={addToCartBtnRef}
                onClick={handleAddToCart}
                disabled={!product.stock}
                data-hover-bg="#d4a373"
                data-hover-text="#312117"
                className={`
                  w-full py-4 text-xs font-semibold uppercase tracking-widest rounded-lg shadow-md
                  transition-colors duration-200 cursor-pointer
                  flex items-center justify-center gap-2.5
                  ${
                    product.stock
                      ? "bg-[#312117] text-white shadow-zinc-800/10"
                      : "bg-zinc-300 text-zinc-500 cursor-not-allowed"
                  }
                `}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {addedToCart
                    ? "Added to Cart ✓"
                    : product.stock
                      ? "Add to Cart"
                      : "Out of Stock"}
                </span>
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.stock}
                data-hover-bg="#312117"
                data-hover-text="#ffffff"
                className={`
                  w-full py-4 border border-zinc-300/80 text-xs font-semibold uppercase tracking-widest
                  rounded-lg transition-colors duration-200 cursor-pointer
                  flex items-center justify-center gap-2.5
                  ${
                    product.stock
                      ? "bg-[#f5efe9]/60 text-[#312117]"
                      : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                  }
                `}
              >
                <ZapIcon className="w-4 h-4" />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Organic Trust Features Grid */}
            <div className="grid grid-cols-2 gap-3 border-t border-zinc-200/60 pt-6">
              {[
                {
                  icon: <Leaf className="w-4 h-4 text-[#4a6b36]" />,
                  title: "100% Organic",
                  subtitle: "Pure natural origin",
                },
                {
                  icon: <Truck className="w-4 h-4 text-[#4a6b36]" />,
                  title: "Fast Delivery",
                  subtitle: "Nationwide 24-48 Hours",
                },
                {
                  icon: <Shield className="w-4 h-4 text-[#4a6b36]" />,
                  title: "Lab Certified",
                  subtitle: "Rigorously tested",
                },
                {
                  icon: <Award className="w-4 h-4 text-[#4a6b36]" />,
                  title: "Ethically Sourced",
                  subtitle: "Fair harvest practices",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/80 border border-zinc-200/60 p-3.5 rounded-xl flex items-center gap-3 shadow-3xs"
                >
                  <div className="p-2 bg-[#f5efe9] rounded-lg shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-zinc-800 block">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-light block">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Middle Benefits Section */}
      <section className="w-full border-t border-zinc-200/60 mt-20 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#4a6b36] uppercase block mb-2">
            Why Choose Aureum Naturals
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-zinc-900 mb-12">
            Traditional Wisdom, Modern Purity
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {premiumBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white border border-zinc-200/60 p-8 rounded-2xl text-left shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col items-start hover:-translate-y-1"
              >
                <div className="p-3.5 bg-[#f5efe9] rounded-xl mb-6 shadow-3xs">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-serif text-zinc-900 mb-2 tracking-wide">
                  {benefit.title}
                </h3>
                <p className="text-zinc-500 text-xs sm:text-sm font-light leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Display Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-16 border-t border-zinc-200/60">
        <div className="mb-10 text-left">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#4a6b36] uppercase block mb-1">
            Verified Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-zinc-900 mb-1">
            Refined Testimony
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light">
            Read authentic reviews from our health-conscious community.
          </p>
        </div>

        {product.reviews && product.reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviews.map((review, idx) => {
              const authorName = review.user
                ? `${review.user.firstName} ${review.user.lastName || ""}`.trim()
                : "Verified Buyer";
              const authorInitials = review.user
                ? `${review.user.firstName[0]}${review.user.lastName?.[0] || ""}`.toUpperCase()
                : "VB";

              return (
                <div
                  key={review._id || idx}
                  className="bg-white border border-zinc-200/60 rounded-2xl p-6 sm:p-8 shadow-2xs flex flex-col justify-between text-left hover:border-zinc-300 transition-colors"
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < review.rating
                                ? "fill-amber-400 stroke-amber-400"
                                : "fill-none stroke-zinc-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-zinc-400 font-light">
                        {review.createdAt
                          ? new Date(review.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )
                          : "Recent"}
                      </span>
                    </div>
                    <p className="text-zinc-600 text-xs sm:text-sm font-light italic leading-relaxed mb-6">
                      "{review.comment}"
                    </p>

                    {(review as any).image && (
                      <div className="relative w-20 aspect-square rounded-xl overflow-hidden border border-zinc-200 mb-4 bg-zinc-50">
                        <Image
                          src={(review as any).image}
                          alt="Review image upload"
                          fill
                          sizes="10vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
                    <div className="w-8 h-8 rounded-full bg-[#f5efe9] text-[#312117] font-serif text-xs font-bold flex items-center justify-center shadow-3xs">
                      {authorInitials}
                    </div>
                    <div>
                      <span className="text-xs font-bold tracking-wider text-zinc-800 uppercase flex items-center gap-1.5">
                        {authorName}
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </span>
                      <span className="text-[10px] text-zinc-400 font-light">
                        Verified Organic Purchase
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white/60 border border-dashed border-zinc-200/80 rounded-2xl w-full">
            <p className="text-sm text-zinc-500 font-light mb-1">
              No testimonials yet for this product.
            </p>
            <p className="text-xs text-zinc-400 font-light">
              Reviews can be submitted by customers upon order completion.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
