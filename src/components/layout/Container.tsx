import React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "full";
}

export const Container: React.FC<ContainerProps> = ({
  className,
  size = "default",
  children,
  ...props
}) => {
  const sizeClasses = {
    default: "max-w-[1280px]",
    narrow: "max-w-[960px]",
    full: "max-w-full",
  };

  return (
    <div
      className={cn("w-full mx-auto px-4 sm:px-6 lg:px-8", sizeClasses[size], className)}
      {...props}
    >
      {children}
    </div>
  );
};
