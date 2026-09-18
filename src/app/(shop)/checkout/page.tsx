"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckoutSteps } from "@/components/sections/CheckoutSteps";
import { ShippingForm, ShippingData } from "@/components/sections/ShippingForm";
import { PaymentForm, PaymentMethod } from "@/components/sections/PaymentForm";
import {
  OrderSummary,
  CheckoutProduct,
} from "@/components/sections/CheckoutOrderSummary";
import { CartItem, useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ShoppingBag, Loader2 } from "lucide-react";
import {
  BackendPaymentResponse,
  createCheckoutOrder,
  initiatePayment,
} from "@/services/paymentService";
import { productService } from "@/services/productService";

interface CardData {
  cardNumber: string;
  expiry: string;
  cvc: string;
}

type CheckoutCartItem = CartItem & {
  databaseId?: string;
  category?: string;
};

const getErrorMessage = (error: unknown) => {
  if (typeof error === "object" && error !== null) {
    const maybeError = error as {
      response?: { data?: { message?: string } };
      message?: string;
    };

    return maybeError.response?.data?.message || maybeError.message;
  }

  return undefined;
};

const isMongoObjectId = (value?: string) => /^[a-f\d]{24}$/i.test(value || "");

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD");
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const [shippingInfo, setShippingInfo] = useState<ShippingData>({
    fullName: "",
    address: "",
    houseNo: "",
    area: "",
    city: "",
    zipCode: "",
    phone: "",
    whatsapp: "",
  });

  const [cardInfo, setCardInfo] = useState<CardData>({
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  // Protect route based on current auth loading state
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login?redirect=/checkout");
    }
  }, [authLoading, isAuthenticated, router]);

  // Auto-restore saved shipping details for logged-in user on load
  useEffect(() => {
    if (user?._id) {
      const savedData = localStorage.getItem(`user_shipping_${user._id}`);
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          if (parsed && typeof parsed === "object") {
            setShippingInfo((prev) => ({ ...prev, ...parsed }));
          }
        } catch (err) {
          console.error("Failed to load saved shipping details:", err);
        }
      } else {
        // Pre-fill user's name from account profile if available
        const nameFromAuth = [user.firstName, user.lastName].filter(Boolean).join(" ");
        if (nameFromAuth) {
          setShippingInfo((prev) => ({ ...prev, fullName: nameFromAuth }));
        }
      }
    }
  }, [user?._id]);

  // Auto-save shipping details whenever user edits them
  useEffect(() => {
    if (user?._id && (shippingInfo.fullName || shippingInfo.address || shippingInfo.phone)) {
      localStorage.setItem(`user_shipping_${user._id}`, JSON.stringify(shippingInfo));
    }
  }, [user?._id, shippingInfo]);

  // Transform cart context data structures safely to visual components specs
  const checkoutItems: CheckoutProduct[] = items.map((item) => ({
    name: item.name,
    variant: item.variant,
    quantity: item.quantity,
    price: item.price,
    imageSrc: item.imageSrc,
  }));

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    setCheckoutError("");

    if (paymentMethod !== "COD" && !screenshotFile) {
      setCheckoutError(
        `Please upload a screenshot of your ${paymentMethod} payment before submitting your order.`
      );
      return;
    }

    setIsSubmitting(true);

    try {
      if (!user?._id) {
        throw new Error("Please sign in again before placing your order.");
      }

      const resolvedOrderItems = await Promise.all(
        items.map(async (cartItem) => {
          const item = cartItem as CheckoutCartItem;
          let productId = item._id || item.databaseId;

          if (!isMongoObjectId(productId)) {
            const productResponse = await productService.getProductBySlug(item.id);
            productId = productResponse.product?._id;
          }

          if (!isMongoObjectId(productId)) {
            throw new Error(
              `Unable to resolve product reference for "${item.name}". Please remove it from cart and add it again.`,
            );
          }

          return {
            productId: productId!,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.imageSrc || "",
            category: item.category || "",
          };
        }),
      );

      const formData = new FormData();
      formData.append("customerId", user._id);
      formData.append("paymentMethod", paymentMethod);
      formData.append("shippingInfo", JSON.stringify(shippingInfo));
      formData.append("orderItems", JSON.stringify(resolvedOrderItems));

      if (screenshotFile) {
        formData.append("paymentScreenshot", screenshotFile);
      }

      const response = await createCheckoutOrder(formData);
      const { success, orderId, paymentId } = response;

      if (success) {
        sessionStorage.setItem(
          "lastCheckout",
          JSON.stringify({
            orderId,
            paymentId,
            paymentMethod,
          }),
        );
        clearCart();
        router.push(
          `/checkout/success?orderId=${orderId}&paymentId=${paymentId || ""}`
        );
      } else {
        throw new Error(response.message || "Failed to place order.");
      }
    } catch (error: unknown) {
      console.error("Checkout submission processing halted:", error);
      setCheckoutError(
        getErrorMessage(error) ||
        "An unexpected error occurred while placing your order. Please check your fields and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitHostedGatewayForm = (paymentResponse: BackendPaymentResponse) => {
    if (!paymentResponse.gatewayUrl || !paymentResponse.payload) {
      throw new Error(
        `${paymentResponse.provider || paymentMethod} did not return a valid gateway request.`,
      );
    }

    const form = document.createElement("form");
    form.method = "POST";
    form.action = paymentResponse.gatewayUrl;
    form.style.display = "none";

    Object.entries(paymentResponse.payload).forEach(([name, value]) => {
      if (value === undefined || value === null) return;
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = String(value);
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  const handlePaymentResponse = async (paymentResponse?: BackendPaymentResponse) => {
    if (!paymentResponse) {
      throw new Error("Payment initialization response was missing.");
    }

    const query = `orderId=${paymentResponse.orderId}&paymentId=${paymentResponse.paymentId || ""}`;

    if (paymentMethod === "COD" || paymentResponse.paymentStatus === "cod") {
      router.push(`/checkout/success?${query}`);
      return;
    }

    if (paymentResponse.redirectUrl) {
      window.location.href = paymentResponse.redirectUrl;
      return;
    }

    if (paymentResponse.gatewayUrl && paymentResponse.payload) {
      submitHostedGatewayForm(paymentResponse);
      return;
    }

    throw new Error(
      paymentResponse.message ||
      "Payment gateway failed to provide a valid checkout URL.",
    );
  };

  // 1. Initial Authentication Lifecycle Verification Spinner UI
  if (authLoading) {
    return (
      <div className="w-full bg-[#fcf9f6] min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
        <p className="text-xs text-zinc-500 font-light mt-4 tracking-widest uppercase">
          Verifying Session...
        </p>
      </div>
    );
  }

  // Soft fallback layout block wrapper preventing render flickers during redirection cycles
  if (!isAuthenticated) return null;

  // 2. Empty Cart State Fallback View UI
  if (items.length === 0) {
    return (
      <div className="w-full bg-[#fcf9f6] min-h-screen flex flex-col items-center justify-center pb-24 px-4">
        <div className="max-w-sm w-full text-center">
          <div className="w-16 h-16 rounded-full bg-[#f5efe9] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-7 h-7 text-zinc-400" />
          </div>
          <h2 className="text-2xl font-serif text-zinc-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-sm text-zinc-500 font-light mb-8">
            Add some products before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="px-6 py-3 bg-[#312117] text-white text-xs font-semibold tracking-widest uppercase rounded-md hover:bg-[#473224] transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  // 3. Main Form Context Layout holding single nested form submit pipeline tracking components
  return (
    <div className="w-full bg-[#fcf9f6] min-h-screen text-zinc-900 pb-24">
      <CheckoutSteps />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleCheckoutSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12"
        >
          {/* Form Fields UI wrappers */}
          <div className="lg:col-span-2 space-y-12">
            {checkoutError && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-xs text-red-700 font-light text-left">
                {checkoutError}
              </div>
            )}

            <ShippingForm data={shippingInfo} onChange={setShippingInfo} />

            <PaymentForm
              method={paymentMethod}
              onMethodChange={setPaymentMethod}
              cardInfo={cardInfo}
              onCardInfoChange={setCardInfo}
              screenshotFile={screenshotFile}
              onScreenshotChange={setScreenshotFile}
            />
          </div>

          {/* Cart Sidebar Order Summary UI containing single button trigger */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 z-30">
              <OrderSummary
                items={checkoutItems}
                subtotal={totalPrice}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
