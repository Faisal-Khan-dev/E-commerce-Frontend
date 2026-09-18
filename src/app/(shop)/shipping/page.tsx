import TermsAndPoliciesContent from "@/components/sections/TermsAndPoliciesContent";

export const metadata = {
  title: "Shipping & Delivery Policy - Healthy Basket",
  description:
    "Learn about our nationwide shipping rates, transit times, air-tight packaging, and courier delivery policies.",
};

export default function ShippingPage() {
  return <TermsAndPoliciesContent initialTab="shipping" />;
}
