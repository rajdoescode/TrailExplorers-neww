import React, { forwardRef } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      checked,
      defaultChecked,
      onCheckedChange,
      onChange,
      label,
      description,
      error,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (typeof label === "string" ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onCheckedChange?.(e.target.checked);
    };

    return (
      <div className={cn("flex flex-col gap-1", className)}>
        <label
          htmlFor={inputId}
          className={cn(
            "inline-flex items-start gap-3 select-none transition-opacity",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer group"
          )}
        >
          <div className="relative flex items-center justify-center shrink-0 mt-0.5">
            <input
              id={inputId}
              ref={ref}
              type="checkbox"
              checked={checked}
              defaultChecked={defaultChecked}
              onChange={handleChange}
              disabled={disabled}
              className="peer sr-only"
              {...props}
            />
            {/* Custom Styled Checkbox Square */}
            <div
              className={cn(
                "w-5 h-5 rounded-[6px] border-2 transition-all duration-200 flex items-center justify-center",
                "border-[#14140f] bg-white group-hover:border-black",
                "peer-checked:bg-[#14140f] peer-checked:border-[#14140f] peer-checked:text-[#d6ff3f]",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-[#d6ff3f] peer-focus-visible:ring-offset-2",
                error && "border-red-500 peer-checked:border-red-500 peer-checked:bg-red-500",
                disabled && "bg-[#f6f6f1] border-[#e2e2dc]"
              )}
            >
              <Check className="w-3.5 h-3.5 stroke-[3] scale-0 peer-checked:scale-100 transition-transform duration-150" />
            </div>
          </div>

          {(label || description) && (
            <div className="flex flex-col gap-0.5 min-w-0">
              {label && (
                <span className="text-xs sm:text-sm font-bold text-[#14140f] leading-snug">
                  {label}
                </span>
              )}
              {description && (
                <span className="text-[11px] sm:text-xs text-[#6b6b63] leading-snug">
                  {description}
                </span>
              )}
            </div>
          )}
        </label>

        {error && <span className="text-xs font-semibold text-red-500 ml-8">{error}</span>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
