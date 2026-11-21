"use client";

import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useId,
  useMemo,
} from "react";
import { ChevronDown, Check, Search, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  color?: string;
  badgeVariant?: "default" | "lime" | "success" | "warning" | "danger" | "info";
}

export interface SelectProps {
  id?: string;
  name?: string;
  label?: string;
  value?: string | string[];
  defaultValue?: string | string[];
  placeholder?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  triggerClassName?: string;
  options?: SelectOption[];
  children?: React.ReactNode;
  onChange?: (e: any) => void;
  searchable?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "pill" | "badge" | "outline" | "ghost";
  align?: "left" | "right";
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      id,
      name,
      label,
      value: controlledValue,
      defaultValue,
      placeholder = "Select an option",
      error,
      helperText,
      disabled = false,
      required = false,
      className,
      triggerClassName,
      options: providedOptions,
      children,
      onChange,
      searchable = false,
      clearable = false,
      multiple = false,
      isLoading = false,
      size = "md",
      variant = "default",
      align = "left",
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;

    // Parse options from either `options` prop or `children` (<option> tags)
    const options: SelectOption[] = useMemo(() => {
      if (providedOptions && providedOptions.length > 0) {
        return providedOptions;
      }
      if (children) {
        const parsed: SelectOption[] = [];
        React.Children.forEach(children, (child) => {
          if (React.isValidElement(child) && child.props) {
            parsed.push({
              value: String(child.props.value ?? ""),
              label: String(child.props.children ?? child.props.value ?? ""),
              disabled: Boolean(child.props.disabled),
            });
          }
        });
        return parsed;
      }
      return [];
    }, [providedOptions, children]);

    // Internal value state if uncontrolled
    const [internalValue, setInternalValue] = useState<any>(() => {
      if (controlledValue !== undefined) return controlledValue;
      if (defaultValue !== undefined) return defaultValue;
      return multiple ? [] : options[0]?.value || "";
    });

    const isControlled = controlledValue !== undefined;
    const selectedValue = isControlled ? controlledValue : internalValue;

    // Dropdown open/close & search query state
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Filter options when searching
    const filteredOptions = useMemo(() => {
      if (!searchQuery.trim()) return options;
      const q = searchQuery.toLowerCase();
      return options.filter((opt) => opt.label.toLowerCase().includes(q));
    }, [options, searchQuery]);

    // Format display text
    const displayText = useMemo(() => {
      if (multiple && Array.isArray(selectedValue)) {
        if (selectedValue.length === 0) return placeholder;
        if (selectedValue.length === 1) {
          const match = options.find((o) => o.value === selectedValue[0]);
          return match ? match.label : selectedValue[0];
        }
        return `${selectedValue.length} items selected`;
      }
      const match = options.find((opt) => opt.value === selectedValue);
      return match ? match.label : (selectedValue ? String(selectedValue) : placeholder);
    }, [multiple, options, placeholder, selectedValue]);

    // Focus search input when opened
    useEffect(() => {
      if (isOpen && searchable) {
        setTimeout(() => searchInputRef.current?.focus(), 50);
      } else {
        setSearchQuery("");
      }
    }, [isOpen, searchable]);

    // Handle outside clicks to close dropdown
    useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);
      }

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [isOpen]);

    const handleSelectOption = (val: string) => {
      if (multiple) {
        const currentArr = Array.isArray(selectedValue) ? selectedValue : [];
        const exists = currentArr.includes(val);
        const nextArr = exists ? currentArr.filter((item) => item !== val) : [...currentArr, val];
        if (!isControlled) setInternalValue(nextArr);
        // Call onChange with standard synthetic-like event as well as direct value support
        onChange?.({
          target: { value: nextArr, name },
          currentTarget: { value: nextArr, name },
        });
      } else {
        if (!isControlled) setInternalValue(val);
        onChange?.({
          target: { value: val, name },
          currentTarget: { value: val, name },
        });
        setIsOpen(false);
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      const emptyVal = multiple ? [] : "";
      if (!isControlled) setInternalValue(emptyVal);
      onChange?.({
        target: { value: emptyVal, name },
        currentTarget: { value: emptyVal, name },
      });
    };

    const hasValue = multiple
      ? Array.isArray(selectedValue) && selectedValue.length > 0
      : Boolean(selectedValue);

    // Dynamic styling for pill/badge variant (e.g. Lead Pipeline status)
    const getPillStatusClasses = () => {
      const valStr = String(selectedValue || "").toLowerCase();
      if (valStr === "new" || valStr.includes("new lead")) {
        return "bg-[#d6ff3f]/25 border-[#d6ff3f] text-[#14140f] hover:bg-[#d6ff3f]/40";
      }
      if (valStr === "confirmed" || valStr.includes("confirmed") || valStr === "won" || valStr === "paid") {
        return "bg-[#e8f5e9] border-[#a5d6a7] text-[#2e7d32] hover:bg-[#c8e6c9]";
      }
      if (valStr === "contacted" || valStr.includes("in touch") || valStr === "active") {
        return "bg-[#e0f2fe] border-[#bae6fd] text-[#0369a1] hover:bg-[#bae6fd]";
      }
      if (valStr === "quoted" || valStr.includes("quoted") || valStr === "pending") {
        return "bg-[#fef9c3] border-[#fde047] text-[#854d0e] hover:bg-[#fef08a]";
      }
      if (valStr === "cancelled" || valStr.includes("cancelled") || valStr === "lost" || valStr === "failed") {
        return "bg-[#fdeeed] border-[#f7c8c5] text-[#b91c1c] hover:bg-[#fbdad7]";
      }
      return "bg-[#f6f6f1] border-[#e2e2dc] text-[#14140f] hover:border-[#14140f]";
    };

    // Size style classes
    const sizeClasses = {
      sm: "text-xs px-2.5 py-1.5 rounded-lg min-h-[32px]",
      md: "text-sm px-4 py-2.5 rounded-xl min-h-[42px]",
      lg: "text-base px-4 py-3 rounded-xl min-h-[48px]",
    };

    // Variant style classes for trigger
    const getTriggerClasses = () => {
      if (variant === "pill" || variant === "badge") {
        return cn(
          "inline-flex items-center justify-between gap-1.5 font-bold rounded-full px-3 py-1 text-xs border transition-all duration-200 outline-none shadow-xs select-none cursor-pointer",
          getPillStatusClasses(),
          isOpen && "ring-2 ring-[#d6ff3f]/50 scale-[1.02]",
          triggerClassName
        );
      }

      if (variant === "outline") {
        return cn(
          "w-full flex items-center justify-between gap-2 text-left bg-white border border-[#e2e2dc] rounded-lg px-2.5 py-1 text-xs font-semibold text-[#14140f] transition-all outline-none hover:border-[#14140f] focus:border-[#14140f] cursor-pointer shadow-xs",
          isOpen && "border-[#14140f] ring-1 ring-[#14140f]",
          triggerClassName
        );
      }

      if (variant === "ghost") {
        return cn(
          "w-full flex items-center justify-between gap-2 text-left bg-transparent border-0 px-2 py-1 text-xs font-bold text-[#14140f] hover:bg-[#f6f6f1] rounded-lg transition-all outline-none cursor-pointer",
          isOpen && "bg-[#f6f6f1]",
          triggerClassName
        );
      }

      // Default Standard Style
      return cn(
        "w-full flex items-center justify-between gap-2 text-left bg-white border-2 border-[#e2e2dc] font-bold text-[#14140f] transition-all duration-200 outline-none hover:border-[#14140f] focus:border-[#14140f] focus:ring-2 focus:ring-[#d6ff3f]/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs",
        sizeClasses[size],
        isOpen && "border-[#14140f] ring-2 ring-[#d6ff3f]/50",
        error && "border-red-500 focus:border-red-500",
        triggerClassName
      );
    };

    return (
      <div
        ref={containerRef}
        className={cn(
          "relative",
          variant === "pill" || variant === "badge" ? "inline-block" : "w-full flex flex-col gap-1.5",
          className
        )}
      >
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs sm:text-sm font-bold text-[#14140f] select-none flex items-center justify-between"
          >
            <span>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </span>
          </label>
        )}

        <div className="relative">
          {/* Custom Select Button Trigger */}
          <button
            id={selectId}
            ref={ref}
            type="button"
            disabled={disabled || isLoading}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            onClick={() => !disabled && !isLoading && setIsOpen((prev) => !prev)}
            className={getTriggerClasses()}
          >
            <span
              className={cn(
                "truncate",
                !hasValue && "text-[#6b6b63] font-normal"
              )}
            >
              {displayText}
            </span>

            <div className="flex items-center gap-1 shrink-0">
              {isLoading && <Loader2 className="w-3.5 h-3.5 text-[#6b6b63] animate-spin" />}

              {!isLoading && clearable && hasValue && (
                <span
                  role="button"
                  tabIndex={0}
                  onClick={handleClear}
                  className="p-0.5 rounded-full hover:bg-black/10 text-[#6b6b63] hover:text-[#14140f] transition-colors"
                  title="Clear"
                >
                  <X className="w-3 h-3" />
                </span>
              )}

              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 text-[#6b6b63] transition-transform duration-200",
                  isOpen && "rotate-180 text-[#14140f]"
                )}
              />
            </div>
          </button>

          {/* Styled Popover Dropdown Menu */}
          {isOpen && (
            <div
              role="listbox"
              aria-label={label || "Options"}
              className={cn(
                "absolute top-[calc(100%+6px)] min-w-[190px] max-h-[300px] flex flex-col bg-white border-2 border-[#14140f] rounded-2xl shadow-[0_12px_36px_rgba(20,20,15,0.18)] p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150",
                align === "right" ? "right-0" : "left-0",
                variant !== "pill" && variant !== "badge" && "w-full"
              )}
            >
              {/* Optional Search Input */}
              {searchable && (
                <div className="p-1.5 border-b border-[#e2e2dc] mb-1">
                  <div className="relative flex items-center">
                    <Search className="w-3.5 h-3.5 text-[#6b6b63] absolute left-2.5 pointer-events-none" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search options..."
                      className="w-full bg-[#f6f6f1] border border-[#e2e2dc] rounded-lg pl-8 pr-3 py-1.5 text-xs font-semibold outline-none focus:border-[#14140f]"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              )}

              {/* Options List */}
              <div className="flex-1 overflow-y-auto no-scrollbar space-y-0.5 max-h-[220px]">
                {filteredOptions.length === 0 ? (
                  <div className="px-3 py-3 text-xs text-[#6b6b63] text-center">
                    No matching options
                  </div>
                ) : (
                  filteredOptions.map((opt) => {
                    const isSelected = multiple
                      ? Array.isArray(selectedValue) && selectedValue.includes(opt.value)
                      : opt.value === selectedValue;

                    // Option dot color based on value for pipeline/status
                    const getOptionDotColor = () => {
                      const v = opt.value.toLowerCase();
                      if (v === "new") return "bg-[#d6ff3f] border-[#14140f]";
                      if (v === "confirmed" || v === "won") return "bg-[#2fa84f] border-[#2e7d32]";
                      if (v === "contacted" || v === "in_touch") return "bg-[#0ea5e9] border-[#0369a1]";
                      if (v === "quoted") return "bg-[#eab308] border-[#854d0e]";
                      if (v === "cancelled" || v === "lost") return "bg-[#e0455a] border-[#b91c1c]";
                      return null;
                    };

                    const dotColor = getOptionDotColor();

                    return (
                      <button
                        key={opt.value}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        disabled={opt.disabled}
                        onClick={() => !opt.disabled && handleSelectOption(opt.value)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left cursor-pointer select-none",
                          isSelected
                            ? "bg-[#14140f] text-white font-bold shadow-xs"
                            : "text-[#14140f] hover:bg-[#f6f6f1]",
                          opt.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
                        )}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {dotColor && (
                            <span
                              className={cn(
                                "w-2.5 h-2.5 rounded-full border shrink-0",
                                dotColor
                              )}
                            />
                          )}
                          {opt.icon && <span className="w-4 h-4 shrink-0">{opt.icon}</span>}
                          <span className="truncate">{opt.label}</span>
                        </div>
                        {isSelected && (
                          <Check className="w-4 h-4 text-[#d6ff3f] shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {error && <span className="text-xs font-semibold text-red-500">{error}</span>}
        {!error && helperText && (
          <span className="text-xs text-[#6b6b63]">{helperText}</span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
