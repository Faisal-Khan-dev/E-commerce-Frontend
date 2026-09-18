import TermsAndPoliciesContent from "@/components/sections/TermsAndPoliciesContent";

export const metadata = {
  title: "Terms & Conditions - Healthy Basket Organic Dry Fruits",
  description:
    "Read our terms of service, store policies, order conditions, and user agreement for Healthy Basket.",
};

export default function TermsPage() {
  return <TermsAndPoliciesContent initialTab="terms" />;
}
