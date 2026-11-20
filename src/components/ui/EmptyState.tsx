"use client";

import React from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        "rounded-[22px] border-2 border-dashed border-[#e2e2dc] p-12 text-center flex flex-col items-center justify-center max-w-md mx-auto my-6 space-y-3",
        className
      )}
    >
      <div className="w-14 h-14 rounded-full bg-[#f6f6f1] border border-[#e2e2dc] text-[#6b6b63] flex items-center justify-center">
        {icon || <Inbox className="w-7 h-7" />}
      </div>
      <h3 className="text-base font-extrabold text-[#14140f] font-heading">
        {title}
      </h3>
      {description && (
        <p className="text-xs text-[#6b6b63] max-w-xs leading-relaxed">
          {description}
        </p>
      )}
      {actionText && onAction && (
        <div className="pt-2">
          <Button variant="primary" size="sm" onClick={onAction}>
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};
