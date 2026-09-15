// components/account/tracking-timeline.tsx
interface Milestone {
  label: string;
  isCompleted: boolean;
}

interface TrackingTimelineProps {
  orderId: string;
  status: string;
  estimatedDelivery: string;
  milestones: Milestone[];
}

export function TrackingTimeline({
  orderId,
  status,
  estimatedDelivery,
  milestones,
}: TrackingTimelineProps) {
  return (
    <div className="bg-white border border-zinc-200/50 rounded-xl p-6 sm:p-8 shadow-xs text-left">
      {/* Top Meta Details Row */}
      <div className="space-y-1 mb-10">
        <span className="inline-block text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 bg-amber-100 text-amber-800 rounded-sm">
          {status}
        </span>
        <h2 className="text-xl font-serif text-zinc-900 tracking-wide font-normal pt-1">
          Latest Order{" "}
          <span className="text-zinc-500 font-sans text-lg font-light ml-1">
            #{orderId}
          </span>
        </h2>
        <p className="text-xs text-zinc-400 font-light">
          Estimated Delivery: {estimatedDelivery}
        </p>
      </div>

      {/* Progress Milestone Graph Grid */}
      <div className="relative w-full pt-4 pb-2">
        {/* Horizontal Background Track Line */}
        <div className="absolute top-[23px] left-0 w-full h-[2px] bg-zinc-100 z-0" />

        {/* Dynamic Connected Fill Progress Track Line */}
        <div
          className="absolute top-[23px] left-0 h-[2px] bg-[#c1aba0] z-0 transition-all duration-500"
          style={{ width: "60%" }} // Dynamically bound based on step array indices
        />

        <div className="relative z-10 flex justify-between items-top">
          {milestones.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center max-w-[80px] sm:max-w-[100px] text-center space-y-3 group"
            >
              {/* Node Indicator Dot */}
              <div
                className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                  step.isCompleted
                    ? "bg-[#c1aba0] border-[#c1aba0] scale-110 shadow-xs"
                    : "bg-white border-zinc-200"
                }`}
              />
              {/* Milestone Label Content */}
              <span
                className={`text-[10px] tracking-tight leading-tight transition-colors duration-200 ${
                  step.isCompleted
                    ? "text-zinc-800 font-medium"
                    : "text-zinc-400 font-light"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
