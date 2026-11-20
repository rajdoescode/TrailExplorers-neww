"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1.5 text-xs text-[#6b6b63]", className)}>
      <Link href="/" className="hover:text-[#14140f] transition-colors flex items-center">
        <Home className="w-3.5 h-3.5" />
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-[#6b6b63]/60 flex-shrink-0" />
            {item.href && !isLast ? (
              <Link href={item.href} className="font-semibold hover:text-[#14140f] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="font-extrabold text-[#14140f] select-none">
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
