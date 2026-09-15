// app/(shop)/contact/page.tsx
import { ContactHero } from "../../../components/sections/ContactHero";
import { ContactFormPanel } from "../../../components/sections/ContactFormPanel";
import { ContactFaqMap } from "../../../components/sections/ContactFaqMap";

export const metadata = {
  title: "Contact Concierge - Aureum Apothecary",
  description:
    "Reach out to the Aureum Apothecary customer concierge team for inquiries regarding organic sourcing, shipments, or premium products.",
};

export default function GlobalContactPage() {
  return (
    <div className="w-full bg-[#fcf9f6] min-h-screen text-zinc-900 overflow-x-hidden">
      {/* 1. Transparent Atmospheric Header Hero View */}
      <ContactHero />

      {/* 2. Unified Presence Matrix & Dynamic Form Block */}
      <ContactFormPanel />

      {/* 3. Footnote Interactive Geographic Alignment Grid */}
      <ContactFaqMap />
    </div>
  );
}
