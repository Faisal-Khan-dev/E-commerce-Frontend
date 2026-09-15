// app/(shop)/story/page.tsx
import { AboutUsHero } from "../../../components/sections/AboutUsHero";
import { StorySourcing } from "../../../components/sections/Sourcing";
import { StoryStandards } from "../../../components/sections/StoryStandards";
import { StoryTrustBadges } from "../../../components/sections/TrustBadges";
import { StoryNewsletter } from "../../../components/sections/StoryNewsletter";

export const metadata = {
  title: "Our Heritage - Aureum Apothecary",
  description:
    "Discover our sourcing philosophy, extraction principles, and our unwavering commitment to pure, organic health provisions.",
};

export default function BrandStoryPage() {
  return (
    <div className="w-full bg-[#fcf9f6] min-h-screen text-zinc-900 overflow-x-hidden">
      {/* 1. Immersive Hero Block */}
      <AboutUsHero />

      {/* 2. Philosophy & Sourcing Core Context Component Block */}
      <StorySourcing />

      {/* 3. Meticulous Production Pillars Matrix Component Grid */}
      <StoryStandards />

      {/* 4. Verification Badges Row Ribbon Stripe */}
      <StoryTrustBadges />

      {/* 5. Apothecary Circle Newsletter Subscription Frame Container */}
      <StoryNewsletter />
    </div>
  );
}
