"use client";

import React from "react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

export interface HighlightItem {
  icon: React.ReactNode;
  label: React.ReactNode;
}

export interface PageHeroSectionProps {
  title: React.ReactNode;
  subtitle?: string;
  highlights?: HighlightItem[];
  desktopImage?: string;
  mobileImage?: string;
  altText?: string;
  className?: string;
  imageClassName?: string;
  children?: React.ReactNode;
}

export const PageHeroSection: React.FC<PageHeroSectionProps> = ({
  title,
  className = "",
  children,
}) => {
  return (
    <section
      className={cn(
        "relative w-full bg-transparent z-10 flex flex-col justify-start pt-4 sm:pt-5 md:pt-6 pb-2 sm:pb-3",
        className
      )}
    >
      {/* Hero Content (Positioned over page-level fixed background) */}
      <Container className="relative z-10 w-full">
        <div className="w-full">
          {/* Main Heading */}
          <div className="max-w-2xl lg:max-w-4xl">
            <h1 className="text-[32px] sm:text-[42px] md:text-[50px] lg:text-[56px] font-extrabold text-[#14140f] tracking-tight font-heading leading-[1.08]">
              {title}
            </h1>
          </div>

          {/* Search & Filter Bar on the Hero */}
          {children && (
            <div className="mt-3.5 sm:mt-5 md:mt-6 w-full">
              {children}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};
