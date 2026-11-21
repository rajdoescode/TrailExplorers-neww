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
  options?: SelectOption[];
  children?: React.ReactNode;
  onChange?: (e: { target: { value: any; name?: string } }) => void;
  searchable?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  isLoading?: boolean;
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
      options: providedOptions,
      children,
      onChange,
      searchable = false,
      clearable = false,
      multiple = false,
      isLoading = false,
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
      return match ? match.label : placeholder;
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
        onChange?.({ target: { value: nextArr, name } });
      } else {
        if (!isControlled) setInternalValue(val);
        onChange?.({ target: { value: val, name } });
        setIsOpen(false);
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      const emptyVal = multiple ? [] : "";
      if (!isControlled) setInternalValue(emptyVal);
      onChange?.({ target: { value: emptyVal, name } });
    };

    const hasValue = multiple
      ? Array.isArray(selectedValue) && selectedValue.length > 0
      : Boolean(selectedValue);

    return (
      <div ref={containerRef} className="w-full flex flex-col gap-1.5 relative">
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
            className={cn(
              "w-full flex items-center justify-between gap-2 text-left bg-white border-2 border-[#e2e2dc] rounded-xl px-4 py-2.5 text-sm font-bold text-[#14140f] transition-all duration-200 outline-none hover:border-[#14140f] focus:border-[#14140f] focus:ring-2 focus:ring-[#d6ff3f]/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs",
              isOpen && "border-[#14140f] ring-2 ring-[#d6ff3f]/50",
              error && "border-red-500 focus:border-red-500",
              className
            )}
          >
            <span
              className={cn(
                "truncate",
                !hasValue && "text-[#6b6b63] font-normal"
              )}
            >
              {displayText}
            </span>

            <div className="flex items-center gap-1.5 shrink-0">
              {isLoading && <Loader2 className="w-4 h-4 text-[#6b6b63] animate-spin" />}

              {!isLoading && clearable && hasValue && (
                <span
                  role="button"
                  tabIndex={0}
                  onClick={handleClear}
                  className="p-0.5 rounded-full hover:bg-[#f6f6f1] text-[#6b6b63] hover:text-[#14140f] transition-colors"
                  title="Clear"
                >
                  <X className="w-3.5 h-3.5" />
                </span>
              )}

              <ChevronDown
                className={cn(
                  "w-4 h-4 text-[#6b6b63] transition-transform duration-200",
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
              className="absolute left-0 top-[calc(100%+6px)] w-full min-w-[200px] max-h-[300px] flex flex-col bg-white border-2 border-[#14140f] rounded-xl shadow-[0_12px_32px_rgba(20,20,15,0.14)] p-1.5 z-50 animate-in fade-in duration-150"
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
              <div className="flex-1 overflow-y-auto no-scrollbar space-y-0.5">
                {filteredOptions.length === 0 ? (
                  <div className="px-3 py-3 text-xs text-[#6b6b63] text-center">
                    No matching options
                  </div>
                ) : (
                  filteredOptions.map((opt) => {
                    const isSelected = multiple
                      ? Array.isArray(selectedValue) && selectedValue.includes(opt.value)
                      : opt.value === selectedValue;

                    return (
                      <button
                        key={opt.value}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        disabled={opt.disabled}
                        onClick={() => !opt.disabled && handleSelectOption(opt.value)}
                        className={cn(
                          "w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all text-left cursor-pointer select-none",
                          isSelected
                            ? "bg-[#14140f] text-white font-bold"
                            : "text-[#14140f] hover:bg-[#f6f6f1]",
                          opt.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
                        )}
                      >
                        <div className="flex items-center gap-2 truncate">
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
