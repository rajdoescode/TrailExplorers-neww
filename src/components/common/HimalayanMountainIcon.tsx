import React from "react";

export interface HimalayanMountainIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const HimalayanMountainIcon: React.FC<HimalayanMountainIconProps> = ({
  className = "w-5 h-5",
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Ground Base Line */}
      <path d="M1.5 21.5H22.5" />
      {/* Front Left Mountain Peak */}
      <path d="M1.5 21.5L8 8L14 21.5" />
      {/* Back Right Taller Peak */}
      <path d="M11.5 12L15.5 2L22.5 21.5" />
      {/* Snowcap Zigzag Line on Back Peak */}
      <path d="M13 9.2L14.8 11L17 8L19.8 11.2" />
      {/* Ridge Line Detail */}
      <path d="M16 14.5L18 17.5" />
    </svg>
  );
};

export default HimalayanMountainIcon;
