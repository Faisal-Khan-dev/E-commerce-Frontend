import TermsAndPoliciesContent from "@/components/sections/TermsAndPoliciesContent";

export const metadata = {
  title: "Terms & Policies - Healthy Basket Organic Dry Fruits",
  description:
    "Comprehensive terms of service, privacy policy, shipping rates, and return policy for Healthy Basket.",
};

export default function TermsAndPoliciesPage() {
  return <TermsAndPoliciesContent initialTab="terms" />;
}
