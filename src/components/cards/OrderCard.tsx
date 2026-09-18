// components/account/order-card.tsx
import Image from "next/image";

export interface PastOrder {
  id: string;
  name: string;
  price: number;
  dateOrdered: string;
  status: string;
  imageSrc: string;
  slug?: string;
}

interface OrderCardProps {
  order: PastOrder;
  onViewDetails?: (id: string) => void;
  onBuyAgain?: (id: string) => void;
}

export function OrderCard({
  order,
  onViewDetails,
  onBuyAgain,
}: OrderCardProps) {
  return (
    <div className="bg-white border border-zinc-200/60 rounded-xl overflow-hidden flex flex-col justify-between group transition-shadow duration-300 hover:shadow-xs text-left">
      {/* Media Window Container */}
      <div className="relative aspect-[16/9] w-full bg-[#f6f6f6]">
        <Image
          src={order.imageSrc}
          alt={order.name}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
        />
        {/* Status Chip Overlay */}
        <span className="absolute top-3 right-3 text-[9px] font-semibold tracking-wider uppercase px-2.5 py-1 bg-white/95 backdrop-blur-xs text-zinc-800 rounded-sm border border-zinc-200/30 shadow-3xs">
          {order.status}
        </span>
      </div>

      {/* Typography and Meta Description Content */}
      <div className="p-5 space-y-4">
        <div className="space-y-0.5">
          <div className="flex justify-between items-baseline gap-4">
            <h3 className="font-serif text-lg text-zinc-900 tracking-wide font-normal truncate">
              {order.name}
            </h3>
            <span className="font-serif text-lg text-stone-500 font-light shrink-0">
              Rs. {order.price}
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 font-light">
            Ordered: {order.dateOrdered}
          </p>
        </div>

        {/* Dual Actions Control Bar */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={() => onViewDetails?.(order.id)}
            data-hover-bg="#D3A172"
            data-hover-text="#312117"
            className="py-2.5 rounded-md bg-white border border-stone-300 text-[#312117] hover:text-[#312117] text-[10px] font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-2xs"
          >
            Order Details
          </button>
          <button
            onClick={() => onBuyAgain?.(order.id)}
            data-hover-bg="#D3A172"
            data-hover-text="#312117"
            className="py-2.5 rounded-md bg-[#312117] text-white hover:text-[#312117] text-[10px] font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-2xs"
          >
            Buy Again
          </button>
        </div>
      </div>
    </div>
  );
}
