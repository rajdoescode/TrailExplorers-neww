"use client";

import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useId,
} from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  id?: string;
  name?: string;
  label?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  options?: SelectOption[];
  children?: React.ReactNode;
  onChange?: (e: { target: { value: string; name?: string } }) => void;
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
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;

    // Parse options from either `options` prop or `children` (<option> tags)
    const options: SelectOption[] = React.useMemo(() => {
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
            });
          }
        });
        return parsed;
      }
      return [];
    }, [providedOptions, children]);

    // Internal value state if uncontrolled
    const [internalValue, setInternalValue] = useState<string>(
      controlledValue !== undefined
        ? controlledValue
        : defaultValue !== undefined
        ? defaultValue
        : options[0]?.value || ""
    );

    const isControlled = controlledValue !== undefined;
    const selectedValue = isControlled ? controlledValue : internalValue;

    // Dropdown open/close state
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Selected option display text
    const selectedOption = options.find((opt) => opt.value === selectedValue);
    const displayText = selectedOption ? selectedOption.label : placeholder;

    // Handle outside clicks to close dropdown
    useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
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
      if (!isControlled) {
        setInternalValue(val);
      }
      if (onChange) {
        onChange({ target: { value: val, name } });
      }
      setIsOpen(false);
    };

    return (
      <div ref={containerRef} className="w-full flex flex-col gap-1.5 relative">
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs sm:text-sm font-bold text-[#14140f] select-none"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {/* Custom Select Button Trigger */}
          <button
            id={selectId}
            ref={ref}
            type="button"
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            onClick={() => !disabled && setIsOpen((prev) => !prev)}
            className={cn(
              "w-full flex items-center justify-between gap-2 text-left bg-[#fcfcf9] border-2 border-[#e2e2dc] rounded-xl px-4 py-2.5 text-sm font-bold text-[#14140f] transition-all duration-200 outline-none hover:border-[#14140f] focus:border-[#14140f] focus:bg-white focus:ring-2 focus:ring-[#d6ff3f]/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs",
              isOpen && "border-[#14140f] bg-white ring-2 ring-[#d6ff3f]/50",
              error && "border-red-500 focus:border-red-500",
              className
            )}
          >
            <span className="truncate">{displayText}</span>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-[#6b6b63] shrink-0 transition-transform duration-200",
                isOpen && "rotate-180 text-[#14140f]"
              )}
            />
          </button>

          {/* Styled Popover Dropdown Menu */}
          {isOpen && (
            <div
              role="listbox"
              aria-label={label || "Options"}
              className="absolute left-0 top-[calc(100%+6px)] w-full min-w-[200px] max-h-[280px] overflow-y-auto bg-white border-2 border-[#14140f] rounded-xl shadow-[0_12px_32px_rgba(20,20,15,0.14)] p-1.5 z-50 chat-scroll animate-in fade-in duration-150"
            >
              {options.length === 0 ? (
                <div className="px-3 py-2 text-xs text-[#6b6b63]">
                  No options available
                </div>
              ) : (
                options.map((opt) => {
                  const isSelected = opt.value === selectedValue;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelectOption(opt.value)}
                      className={cn(
                        "w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all text-left cursor-pointer select-none",
                        isSelected
                          ? "bg-[#14140f] text-white font-bold"
                          : "text-[#14140f] hover:bg-[#f4f4ec] hover:text-black"
                      )}
                    >
                      <span className="truncate">{opt.label}</span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-[#d6ff3f] shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>

        {error && (
          <span className="text-xs font-semibold text-red-500">{error}</span>
        )}
        {!error && helperText && (
          <span className="text-xs text-[#6b6b63]">{helperText}</span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
