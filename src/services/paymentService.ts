import axiosInstance from "@/lib/axios";
import { PaymentMethod } from "@/components/sections/PaymentForm";

export interface BackendPaymentResponse {
  success: boolean;
  provider?: string;
  method?: PaymentMethod;
  paymentId?: string;
  orderId?: string;
  paymentStatus?: string;
  transactionId?: string | null;
  providerReference?: string | null;
  sessionId?: string | null;
  requiresRedirect?: boolean;
  redirectUrl?: string | null;
  gatewayUrl?: string | null;
  payload?: Record<string, string | number | null | undefined> | null;
  message?: string;
}

export interface CheckoutOrderDetails {
  _id: string;
  orderNo?: string;
  status?: string;
  totalAmount?: number;
  paymentScreenshot?: string;
  paymentId?: {
    _id?: string;
    status?: string;
    method?: PaymentMethod;
    paymentScreenshot?: string;
  };
}

interface CreateOrderPayload {
  customerId?: string;
  paymentMethod: PaymentMethod;
  shippingInfo: {
    fullName: string;
    address: string;
    city: string;
    zipCode: string;
    phone: string;
  };
  orderItems: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
    category: string;
  }>;
}

export const createCheckoutOrder = async (payload: FormData | CreateOrderPayload) => {
  const response = await axiosInstance.post("/orders/", payload, {
    headers:
      payload instanceof FormData
        ? { "Content-Type": "multipart/form-data" }
        : undefined,
  });
  return response.data;
};

export const initiatePayment = async (orderId: string, method: PaymentMethod) => {
  const response = await axiosInstance.post("/payments/initiate", {
    orderId,
    method,
  });

  return response.data?.data as BackendPaymentResponse;
};

export const getOrderDetails = async (orderId: string) => {
  const response = await axiosInstance.get(`/orders/single/${orderId}`);
  return response.data?.order as CheckoutOrderDetails;
};

export const verifyStripeSession = async ({
  sessionId,
  paymentId,
  orderId,
}: {
  sessionId: string;
  paymentId?: string;
  orderId?: string;
}) => {
  const response = await axiosInstance.post("/payments/verify/stripe-session", {
    sessionId,
    paymentId,
    orderId,
  });

  return response.data?.data as BackendPaymentResponse;
};
