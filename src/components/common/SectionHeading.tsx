import React from "react";
import { Eyebrow, Heading, Paragraph } from "@/components/ui/Heading";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  action?: React.ReactNode;
  className?: string;
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = "left",
  action,
  className,
  light = false,
}) => {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12",
        isCentered && "items-center text-center",
        className
      )}
    >
      <div className={cn("max-w-2xl", isCentered && "mx-auto")}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Heading
          level={2}
          className={cn(
            "text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight",
            light ? "text-white" : "text-[#14140f]"
          )}
        >
          {title}
        </Heading>
        {subtitle && (
          <Paragraph
            className={cn(
              "mt-2.5 text-sm sm:text-base",
              light ? "text-white/80" : "text-[#6b6b63]"
            )}
          >
            {subtitle}
          </Paragraph>
        )}
      </div>

      {action && <div className={cn("shrink-0", isCentered && "mt-4")}>{action}</div>}
    </div>
  );
};
