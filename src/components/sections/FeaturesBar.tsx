// components/FeaturesBar.tsx
import Image from "next/image";

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeaturesBar() {
  const features: FeatureItem[] = [
    {
      icon: <Image src="/icon-check.png" alt="check" width={40} height={40} />,
      title: "Pure Quality",
      description:
        "Every batch is clinically tested and verified for absolute purity and nutrient density.",
    },
    {
      icon: <Image src="/icon-organic.png" alt="leaf" width={40} height={40} />,
      title: "Sustainably Sourced",
      description:
        "We work directly with small-scale farmers who respect the land and its ancient cycles.",
    },
    {
      icon: (
        <Image src="/icon-health.png" alt="health" width={40} height={40} />
      ), // Replaces with health cross look smoothly
      title: "Health-Focused",
      description:
        "Crafted for those who view food as medicine and quality as a non-negotiable standard.",
    },
  ];

  return (
    <section className="w-full bg-black text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* Responsive Grid layouts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 text-center">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center max-w-sm mx-auto"
            >
              {/* Icon Container */}
              <div className="mb-5 p-3  bg-zinc-950  shadow-inner">
                {feature.icon}
              </div>

              {/* Title */}
              <h4 className="text-2xl  tracking-wide text-zinc-100 mb-3">
                {feature.title}
              </h4>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed text-balance">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
