import React from "react";
import { cn } from "@/lib/utils";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

const headingStyles: Record<number, string> = {
  1: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#14140f] font-heading leading-[1.1]",
  2: "text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#14140f] font-heading leading-[1.2]",
  3: "text-lg sm:text-xl md:text-2xl font-bold text-[#14140f] font-heading leading-[1.25]",
  4: "text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider text-[#14140f] font-heading",
  5: "text-sm sm:text-base font-semibold text-[#14140f] font-heading",
  6: "text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#6b6b63] font-heading",
};

export const Heading: React.FC<HeadingProps> = ({
  level = 1,
  className,
  children,
  ...props
}) => {
  const cls = cn(headingStyles[level], className);
  switch (level) {
    case 1:
      return <h1 className={cls} {...props}>{children}</h1>;
    case 2:
      return <h2 className={cls} {...props}>{children}</h2>;
    case 3:
      return <h3 className={cls} {...props}>{children}</h3>;
    case 4:
      return <h4 className={cls} {...props}>{children}</h4>;
    case 5:
      return <h5 className={cls} {...props}>{children}</h5>;
    case 6:
      return <h6 className={cls} {...props}>{children}</h6>;
    default:
      return <h1 className={cls} {...props}>{children}</h1>;
  }
};

export const Paragraph: React.FC<
  React.HTMLAttributes<HTMLParagraphElement> & { variant?: "body" | "muted" | "lead" }
> = ({ className, variant = "body", children, ...props }) => {
  const variants = {
    body: "text-base text-[#14140f] leading-relaxed",
    muted: "text-sm sm:text-base text-[#6b6b63] leading-relaxed",
    lead: "text-lg sm:text-xl text-[#14140f] font-medium leading-relaxed",
  };

  return (
    <p className={cn(variants[variant], className)} {...props}>
      {children}
    </p>
  );
};

export const Eyebrow: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#14140f] bg-[#d6ff3f] px-3 py-1 rounded-full mb-3",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export const Caption: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <span className={cn("text-xs text-[#6b6b63] font-medium", className)} {...props}>
      {children}
    </span>
  );
};
