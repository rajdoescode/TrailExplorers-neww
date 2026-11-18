import React, { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-xs sm:text-sm font-bold text-[#14140f]">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={cn(
            "w-full bg-[#f6f6f1] border-2 border-[#e2e2dc] rounded-xl px-4 py-3 text-sm text-[#14140f] placeholder:text-[#6b6b63]/60 transition-all duration-200 outline-none focus:border-[#14140f] focus:bg-white focus:ring-2 focus:ring-[#d6ff3f]/50 disabled:opacity-50 disabled:cursor-not-allowed resize-y",
            error && "border-red-500 focus:border-red-500",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs font-semibold text-red-500">{error}</span>}
        {!error && helperText && (
          <span className="text-xs text-[#6b6b63]">{helperText}</span>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
