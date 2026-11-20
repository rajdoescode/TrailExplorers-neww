"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { LeadStatus } from "@/types";

export interface StatusBadgeProps {
  status: LeadStatus | string;
  size?: "sm" | "md";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = "sm" }) => {
  const norm = status?.toLowerCase() || "";

  let label = status;
  let style = "bg-gray-100 text-gray-700 border-gray-200";

  switch (norm) {
    case "new":
      label = "New Lead";
      style = "bg-[#d6ff3f] text-[#14140f] border-[#14140f] font-bold shadow-xs";
      break;
    case "contacted":
      label = "In Touch";
      style = "bg-blue-50 text-blue-700 border-blue-200 font-semibold";
      break;
    case "quoted":
      label = "Quoted";
      style = "bg-amber-50 text-amber-700 border-amber-200 font-semibold";
      break;
    case "confirmed":
      label = "Confirmed";
      style = "bg-[#e8f7ed] text-[#2fa84f] border-[#2fa84f]/40 font-bold";
      break;
    case "cancelled":
      label = "Cancelled";
      style = "bg-[#fdeeed] text-[#e0455a] border-[#e0455a]/40 font-semibold";
      break;
    case "active":
      label = "Active";
      style = "bg-[#e8f7ed] text-[#2fa84f] border-[#2fa84f]/40 font-bold";
      break;
    case "draft":
      label = "Draft";
      style = "bg-gray-100 text-gray-700 border-gray-300 font-semibold";
      break;
    case "sold_out":
    case "sold out":
      label = "Sold Out";
      style = "bg-red-50 text-red-600 border-red-200 font-bold";
      break;
    case "filling_fast":
    case "filling fast":
      label = "Filling Fast";
      style = "bg-orange-50 text-orange-600 border-orange-200 font-bold";
      break;
    case "available":
      label = "Available";
      style = "bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold";
      break;
    case "approved":
      label = "Approved";
      style = "bg-[#e8f7ed] text-[#2fa84f] border-[#2fa84f]/40 font-bold";
      break;
    case "pending":
      label = "Pending";
      style = "bg-amber-50 text-amber-700 border-amber-300 font-semibold";
      break;
    default:
      label = status;
      style = "bg-gray-100 text-[#14140f] border-gray-200";
  }

  const sizeClass =
    size === "sm"
      ? "text-[11px] px-2.5 py-0.5"
      : "text-xs px-3 py-1";

  return (
    <span
      className={cn(
        "inline-flex items-center uppercase tracking-wider rounded-full border transition-all whitespace-nowrap",
        sizeClass,
        style
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-80" />
      {label}
    </span>
  );
};
