import CategorySection from "@/components/sections/Categories";
import Hero from "../../components/sections/hero";
import BestSellers from "@/components/sections/BestSellers";
import FeaturesBar from "@/components/sections/FeaturesBar";
import Testimonials from "@/components/sections/TestimonialsSlider";
import NewsletterBanner from "@/components/sections/Newsletter";
export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <BestSellers />
      <FeaturesBar />
      <Testimonials />
      <NewsletterBanner />
    </>
  );
}
