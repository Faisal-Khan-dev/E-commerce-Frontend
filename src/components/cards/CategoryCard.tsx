// components/CategoryCard.tsx
import Image from "next/image";
import Link from "next/link";

export interface CategoryCardProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  href: string;
}

export default function CategoryCard({
  title,
  subtitle,
  imageSrc,
  href,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative block w-full aspect-[4/5] rounded-xl overflow-hidden bg-zinc-900 shadow-xl border border-zinc-800/20"
    >
      {/* Target Container for Image Scale Effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={`Explore our premium selection of ${title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Beautiful linear gradient bottom shadow to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Text Context Content Bottom-Left */}
      <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 z-10 flex flex-col items-start">
        <h3 className="text-2xl sm:text-3xl font-serif text-zinc-100 mb-1 tracking-wide group-hover:text-amber-100 transition-colors duration-300">
          {title}
        </h3>
        <span className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-zinc-400 group-hover:text-amber-500/90 transition-colors duration-300">
          {subtitle}
        </span>
      </div>
    </Link>
  );
}
