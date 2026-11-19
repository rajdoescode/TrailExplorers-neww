import React from "react";
import { SkeletonImage } from "@/components/ui/SkeletonImage";

export const EscapeOrdinaryBanner: React.FC = () => {
  return (
    <section className="w-full py-8 sm:py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="relative rounded-[24px] sm:rounded-[28px] overflow-hidden h-[clamp(240px,42vw,520px)] flex items-center justify-center text-center text-white shadow-xl">
          {/* Background Image with Shimmer */}
          <div className="absolute inset-0 w-full h-full">
            <SkeletonImage
              src="/assets/images/home/escape-ordinary.webp"
              alt="Escape the ordinary"
              fill
              priority
              unoptimized
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
              skeletonClassName="rounded-[24px] sm:rounded-[28px]"
            />
          </div>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-[#14140f]/45 z-1" />

          {/* Banner Content */}
          <div className="relative z-2 px-4 sm:px-6">
            <h2 className="text-[clamp(26px,6vw,76px)] font-extrabold tracking-[-0.03em] m-0 text-white">
              Escape the ordinary.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};
