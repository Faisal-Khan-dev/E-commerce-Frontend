"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { OrderCard, PastOrder } from "@/components/cards/OrderCard";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";
import OrderDetailsModal from "@/components/modals/OrderDetailsModal";
import { Loader2, AlertCircle, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";

function CustomerOrdersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const typeParam = searchParams.get("type") || "active";
  const isHistoryTab = typeParam === "history";
  const statusQuery = isHistoryTab ? "history" : "active";

  const [orders, setOrders] = useState<PastOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 1,
  });

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedOrderData, setSelectedOrderData] = useState<any>(null);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [modalError, setModalError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Reset page to 1 when switching tabs
  useEffect(() => {
    setCurrentPage(1);
  }, [typeParam]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login?redirect=/account/orders");
    }
  }, [isAuthenticated, authLoading, router]);

  // Server-side database pagination fetcher
  const fetchCustomerOrders = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError("");

    try {
      const userId = user._id;
      const response = await axiosInstance.get(`/orders/customer/${userId}`, {
        params: {
          page: currentPage,
          limit: 10,
          status: statusQuery,
        },
      });

      if (response.data && response.data.success) {
        const parsedOrders: PastOrder[] = response.data.orders.map((rawOrder: any) => {
          const firstItem = rawOrder.orderItems?.[0];
          const itemCount = rawOrder.orderItems?.length || 0;
          const itemName = firstItem?.name || "Organic Order";
          const displayName = itemCount > 1 ? `${itemName} (+${itemCount - 1} more)` : itemName;
          const itemImage = firstItem?.productId?.images?.[0] || firstItem?.image || "/order-card-pic.png";
          const itemSlug = firstItem?.productId?.slug || firstItem?.slug || "";

          return {
            id: rawOrder._id,
            name: displayName,
            price: rawOrder.totalAmount || firstItem?.price || 0,
            status: rawOrder.status || "processing",
            dateOrdered: rawOrder.createdAt
              ? new Date(rawOrder.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "Recent Order",
            imageSrc: itemImage,
            slug: itemSlug,
          };
        });

        setOrders(parsedOrders);
        if (response.data.pagination) {
          setPagination(response.data.pagination);
        }
      } else {
        setError("Could not load client orders.");
      }
    } catch (err: any) {
      console.error("Error fetching orders:", err);
      setError(
        err?.response?.data?.message || "Failed to establish communication connections."
      );
    } finally {
      setLoading(false);
    }
  }, [user, currentPage, statusQuery]);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchCustomerOrders();
    }
  }, [isAuthenticated, user, fetchCustomerOrders]);

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
        setModalError("Unable to load order details.");
      }
    } catch (err: any) {
      console.error("Error fetching order details:", err);
      setModalError(err?.response?.data?.message || "Internal server error.");
    } finally {
      setModalLoading(false);
    }
  };

  const handleBuyAgainRouting = (orderItem: PastOrder) => {
    const activeRouteSlug = orderItem.slug || orderItem.name.toLowerCase().replace(/ /g, "-");
    router.push(`/shop/${activeRouteSlug}`);
  };

  const handleOrderUpdated = () => {
    if (selectedOrderId) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === selectedOrderId ? { ...order, status: "cancelled" } : order
        )
      );
    }
    fetchCustomerOrders();
  };

  if (authLoading || loading) {
    return (
      <div className="flex-1 w-full flex flex-col items-center justify-center py-24 space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-700" />
        <p className="text-xs uppercase tracking-widest text-zinc-400 font-medium">
          Bringing up your orders...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 w-full py-16 px-4 text-center">
        <div className="bg-white border border-zinc-200 max-w-md mx-auto p-8 rounded-xl shadow-xs">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
          <h3 className="font-serif text-lg text-zinc-900 mb-2">
            Failed to Sync Purchases
          </h3>
          <p className="text-xs text-zinc-400 font-light mb-6">{error}</p>
          <button
            onClick={fetchCustomerOrders}
            data-hover-bg="#d4a373"
            data-hover-text="#312117"
            className="px-5 py-2.5 bg-[#312117] text-white text-xs font-semibold uppercase tracking-widest rounded-md cursor-pointer transition-colors"
          >
            Retry Connection Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full space-y-6">
      <div>
        <h2 className="text-xl font-serif text-zinc-900 tracking-wide text-left pb-1">
          {isHistoryTab ? "Order History" : "Orders"}
        </h2>
        <p className="text-xs text-zinc-400 font-light text-left">
          {isHistoryTab
            ? "View all past purchase records and order history placed to date"
            : "Track your active processing, confirmed, and shipped orders"}
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 px-4 bg-[#fffdfb] border border-dashed border-zinc-200 rounded-xl max-w-2xl mx-auto flex flex-col items-center justify-center shadow-xs">
          <div className="p-4 bg-[#f5efe9] rounded-full mb-4 text-[#312117]">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg text-zinc-900 mb-2">
            {isHistoryTab ? "Your Basket is Empty" : "No Active Orders in Progress"}
          </h3>
          <p className="text-sm text-zinc-500 font-light max-w-sm mb-8 leading-relaxed">
            {isHistoryTab
              ? "You haven't placed any orders yet. Explore our collection of premium organic products to start filling your healthy basket!"
              : "You currently have no processing, confirmed, or shipped orders. Check your Order History link in the sidebar to view all past orders."}
          </p>
          <button
            onClick={() => router.push("/shop")}
            data-hover-bg="#d4a373"
            data-hover-text="#312117"
            className="px-6 py-3 bg-[#312117] text-white text-xs font-semibold uppercase tracking-widest rounded-md shadow-md transition-all duration-200 hover:shadow-lg active:scale-98 cursor-pointer flex items-center gap-2"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
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

          {/* MongoDB Server-Side Pagination Bar */}
          {pagination.pages > 1 && (
            <nav
              className="flex justify-center items-center gap-2 mt-10 pt-6 border-t border-stone-200/60"
              aria-label="Orders Pagination"
            >
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border border-zinc-300 rounded-full text-zinc-600 hover:text-[#312117] hover:border-[#312117] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {[...Array(pagination.pages)].map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 flex items-center justify-center rounded-full text-xs font-medium transition-colors cursor-pointer ${
                      currentPage === page
                        ? "bg-[#312117] text-white font-semibold shadow-xs"
                        : "text-zinc-600 hover:text-[#312117]"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pagination.pages))}
                disabled={currentPage === pagination.pages}
                className="p-2 border border-zinc-300 rounded-full text-zinc-600 hover:text-[#312117] hover:border-[#312117] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </nav>
          )}
        </>
      )}

      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        orderId={selectedOrderId}
        orderData={selectedOrderData}
        loading={modalLoading}
        error={modalError}
        onOrderUpdated={handleOrderUpdated}
      />
    </div>
  );
}

export default function CustomerOrdersPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 w-full flex flex-col items-center justify-center py-24 space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-700" />
          <p className="text-xs uppercase tracking-widest text-zinc-400 font-medium">
            Bringing up your orders...
          </p>
        </div>
      }
    >
      <CustomerOrdersContent />
    </Suspense>
  );
}
