"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { OrderCard } from "@/components/cards/OrderCard";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";
import OrderDetailsModal from "@/components/modals/OrderDetailsModal";
import { Loader2, AlertCircle, ShoppingBag } from "lucide-react";

// Standard formatting interface map mirroring Backend database document schema frameworks
export interface PastOrder {
  id: string;
  name: string;
  price: number;
  dateOrdered: string;
  status: string;
  imageSrc: string;
  slug?: string;
}

export default function CustomerOrdersPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  // Primary component tracking hook definitions
  const [orders, setOrders] = useState<PastOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Target context references for structural modals
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedOrderData, setSelectedOrderData] = useState<any>(null);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [modalError, setModalError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Core background tracking hook verifying systemic user details
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login?redirect=/account/orders");
    }
  }, [isAuthenticated, authLoading, router]);

  // Transform backend multi-item payloads down into flat readable layout formats
  const fetchCustomerOrders = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError("");

    try {
      const userId = user._id;
      const response = await axiosInstance.get(`/orders/customer/${userId}`);

      if (response.data && response.data.success) {
        const parsedOrders: PastOrder[] = [];

        // Flatten multi-tiered systemic layout array trees safely down into flat client lists
        response.data.orders.forEach((rawOrder: any) => {
          if (rawOrder.orderItems && rawOrder.orderItems.length > 0) {
            rawOrder.orderItems.forEach((item: any) => {
              // Extract data parameters from item arrays or nested product profiles
              const itemProductSlug = item.productId?.slug || item.slug || "";

              parsedOrders.push({
                id: rawOrder._id, // Set the original system order ID reference
                name: item.name || "Organic Product Specimen",
                price: item.price || 0,
                status: rawOrder.status || "processing",
                dateOrdered: rawOrder.createdAt
                  ? new Date(rawOrder.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                  : "Recent Order",
                imageSrc: item.productId?.images?.[0] || "/order-card-pic.png",
                slug: itemProductSlug,
              });
            });
          }
        });

        setOrders(parsedOrders);
      } else {
        setError(
          "Could not trace client orders records mapping payload templates.",
        );
      }
    } catch (err: any) {
      console.error("Error matching transaction indexes:", err);
      setError(
        err?.response?.data?.message ||
        "Failed to establish communication connections.",
      );
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchCustomerOrders();
    }
  }, [isAuthenticated, user, fetchCustomerOrders]);

  // Fetch unique item attributes safely by referencing the exact active object key
  const handleViewOrderDetails = async (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
    setModalLoading(true);
    setModalError("");
    setSelectedOrderData(null);

    try {
      const response = await axiosInstance.get(`/orders/single/${orderId}`);
      if (response.data && response.data.success) {
        setSelectedOrderData(response.data.order);
      } else {
        setModalError("Unable to open matching order parameters sheet layout.");
      }
    } catch (err: any) {
      console.error(
        "Error indexing targeted single transaction mapping row:",
        err,
      );
      setModalError(
        err?.response?.data?.message || "Internal transmission system fault.",
      );
    } finally {
      setModalLoading(false);
    }
  };

  // Safe fallback pipeline to resolve slug properties matching explicit layout contexts
  const handleBuyAgainRouting = (orderItem: PastOrder) => {
    const activeRouteSlug =
      orderItem.slug || orderItem.name.toLowerCase().replace(/ /g, "-");
    router.push(`/shop/${activeRouteSlug}`);
  };

  if (authLoading || loading) {
    return (
      <main className="md:col-span-9 lg:col-span-9 flex flex-col items-center justify-center py-24 space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-700" />
        <p className="text-xs uppercase tracking-widest text-zinc-400 font-medium">
          Bringing up your purchase history...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="md:col-span-9 lg:col-span-9 py-16 px-4 text-center">
        <div className="bg-white border border-zinc-200 max-w-md mx-auto p-8 rounded-xl shadow-xs">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
          <h3 className="font-serif text-lg text-zinc-900 mb-2">
            Failed to Sync Purchases
          </h3>
          <p className="text-xs text-zinc-400 font-light mb-6">{error}</p>
          <button
            onClick={fetchCustomerOrders}
            className="px-5 py-2.5 bg-[#312117] hover:bg-[#432f22] text-white text-xs font-semibold uppercase tracking-widest rounded-md cursor-pointer transition-colors"
          >
            Retry Connection Request
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="md:col-span-9 lg:col-span-9 space-y-6">
      <h2 className="text-xl font-serif text-zinc-900 tracking-wide text-left pb-1.5">
        Past Orders
      </h2>

      {orders.length === 0 ? (
        <div className="text-center py-16 px-4 bg-[#fffdfb] border border-dashed border-zinc-200 rounded-xl max-w-2xl mx-auto flex flex-col items-center justify-center shadow-xs">
          <div className="p-4 bg-[#f5efe9] rounded-full mb-4 text-[#312117]">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg text-zinc-900 mb-2">
            Your basket is empty
          </h3>
          <p className="text-sm text-zinc-500 font-light max-w-sm mb-8 leading-relaxed">
            You haven't placed any orders yet. Explore our collection of premium
            organic products to start filling your healthy basket!
          </p>
          <button
            onClick={() => router.push("/shop")}
            className="px-6 py-3 bg-[#312117] hover:bg-[#432f22] text-white text-xs font-semibold uppercase tracking-widest rounded-md shadow-md transition-all duration-200 hover:shadow-lg active:scale-98 cursor-pointer flex items-center gap-2"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {orders.map((order, idx) => (
            <OrderCard
              key={`${order.id}-${idx}`}
              order={order}
              onViewDetails={() => handleViewOrderDetails(order.id)}
              onBuyAgain={() => handleBuyAgainRouting(order)}
            />
          ))}
        </div>
      )}



      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        orderId={selectedOrderId}
        orderData={selectedOrderData}
        loading={modalLoading}
        error={modalError}
      />
    </main>
  );
}
