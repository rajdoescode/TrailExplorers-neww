"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Map, MessageSquare, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();

  // Hide on trip detail pages and plan-your-trip (which have their own dedicated action bars/chat inputs)
  if (pathname.startsWith("/trips/") || pathname === "/plan-your-trip") {
    return null;
  }

  const handleOpenMenu = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-mobile-menu"));
    }
  };

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      label: "Trips",
      href: "/community-trips",
      icon: Compass,
      isActive: pathname === "/community-trips",
    },
    {
      label: "Plan Trip",
      href: "/plan-your-trip",
      icon: MessageSquare,
      isAction: true,
      isActive: pathname === "/plan-your-trip",
    },
    {
      label: "Packages",
      href: "/tour-packages",
      icon: Map,
      isActive: pathname === "/tour-packages",
    },
    {
      label: "Menu",
      onClick: handleOpenMenu,
      icon: Menu,
      isActive: false,
    },
  ];

  return (
    <nav
      aria-label="Mobile navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e6e6df] shadow-[0_-4px_20px_rgba(20,20,15,0.08)]"
      style={{
        paddingBottom: "max(8px, env(safe-area-inset-bottom, 8px))",
      }}
    >
      <div className="flex items-center justify-around px-2 pt-1.5 pb-1">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.isAction) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-3.5 group cursor-pointer"
                aria-label={item.label}
              >
                <div className="w-[46px] h-[46px] rounded-full bg-[#14140f] text-[#d6ff3f] border-2 border-white shadow-[0_4px_14px_rgba(20,20,15,0.25)] flex items-center justify-center transition-transform active:scale-90 group-hover:scale-105">
                  <Icon className="w-5 h-5 stroke-[2.4]" />
                </div>
                <span className="text-[10px] font-bold text-[#14140f] mt-1 tracking-tight">
                  {item.label}
                </span>
              </Link>
            );
          }

          if (item.onClick) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.onClick}
                className="flex flex-col items-center justify-center py-1 px-3 min-w-[54px] min-h-[44px] text-[#6b6b63] hover:text-[#14140f] active:scale-95 transition-all cursor-pointer rounded-xl"
                aria-label="Open full menu"
              >
                <Icon className="w-5 h-5 stroke-[2.1]" />
                <span className="text-[10.5px] font-semibold mt-1 tracking-tight">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href!}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-3 min-w-[54px] min-h-[44px] transition-all cursor-pointer rounded-xl relative active:scale-95",
                item.isActive
                  ? "text-[#14140f]"
                  : "text-[#6b6b63] hover:text-[#14140f]"
              )}
            >
              {item.isActive && (
                <span className="absolute -top-1 w-5 h-1 rounded-full bg-[#14140f]" />
              )}
              <Icon
                className={cn(
                  "w-5 h-5 transition-transform",
                  item.isActive ? "stroke-[2.5] scale-105 text-[#14140f]" : "stroke-[2]"
                )}
              />
              <span
                className={cn(
                  "text-[10.5px] mt-1 tracking-tight",
                  item.isActive ? "font-bold text-[#14140f]" : "font-semibold"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
