import React from "react";

export const CorePillarsSection: React.FC = () => {
  const pillars = [
    {
      title: "SAFETY FIRST, ALWAYS",
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d6ff3f"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: "DEEP CULTURAL ROOTS & LOCAL SUPPORT",
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d6ff3f"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: "LEAVING NO TRACE BEHIND (ECO TRAVEL)",
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d6ff3f"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 16a3.5 3.5 0 0 0 3.5-3.5c0-1.8-1.5-3.5-3.5-6.5-2 3-3.5 4.7-3.5 6.5A3.5 3.5 0 0 0 12 16z" />
        </svg>
      ),
    },
    {
      title: "100% FINANCIAL TRANSPARENCY",
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d6ff3f"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      title: "24×7 SUPPORT ON EVERY TRIP",
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d6ff3f"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
          <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
        </svg>
      ),
    },
  ];

  return (
    <section className="section w-full py-12 sm:py-16 bg-transparent text-center" id="core-pillars">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Head */}
        <div className="section-head center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold text-[#14140f] tracking-tight m-0 mb-2">
            Core Pillars
          </h2>
          <p className="text-base sm:text-lg text-[#6b6b63] font-semibold mt-1">
            Why We Are Different
          </p>
        </div>

        {/* 5 Pillars Grid */}
        <div className="core-pillars-grid">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="pillar-card group">
              <div className="pillar-circle">
                {pillar.icon}
              </div>
              <h4>{pillar.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
