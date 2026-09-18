import TermsAndPoliciesContent from "@/components/sections/TermsAndPoliciesContent";

export const metadata = {
  title: "Privacy Policy - Healthy Basket Organic Provisions",
  description:
    "Discover how Healthy Basket protects your personal details, transaction information, and payment proof data.",
};

export default function PrivacyPage() {
  return <TermsAndPoliciesContent initialTab="privacy" />;
}
