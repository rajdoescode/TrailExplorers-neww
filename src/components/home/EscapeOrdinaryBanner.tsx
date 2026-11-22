import React from "react";

export const EscapeOrdinaryBanner: React.FC = () => {
  return (
    <section className="w-full py-8 sm:py-12 bg-transparent">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="video-banner relative rounded-[24px] sm:rounded-[28px] overflow-hidden h-[clamp(240px,42vw,520px)] flex items-center justify-center text-center text-white shadow-xl bg-[#14140f]">
          {/* Background Animated Video Banner */}
          <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
            <picture className="w-full h-full block">
              <source srcSet="/assets/images/home/untitled-design.webp" type="image/webp" />
              <img
                src="/assets/images/home/untitled-design.webp"
                alt="Escape the ordinary"
                className="w-full h-full object-cover block"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>

          {/* Dark Overlay for title contrast */}
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
