"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CustomCalendarPickerProps {
  value: string;
  onChange: (dateStr: string, dateObj?: Date) => void;
  label?: string;
  placeholder?: string;
  availableBatches?: string[];
  minDate?: Date;
  maxDate?: Date;
  format?: "ordinal" | "iso" | "readable";
  includeYear?: boolean;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  align?: "left" | "right";
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SHORT_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

/**
 * Parses diverse date string representations:
 * - "8th December", "8th December 2026", "8 Dec 2026", "2026-12-08"
 */
function parseDateString(str: string): Date | null {
  if (!str || str.toLowerCase().includes("request") || str.toLowerCase().includes("select")) {
    return null;
  }

  // ISO Format YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    const [y, m, d] = str.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  // Regex for "8th December" or "8 December 2026"
  const match = str.match(/(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]+)(?:\s+(\d{4}))?/i);
  if (match) {
    const day = parseInt(match[1], 10);
    const monthStr = match[2].toLowerCase();
    const monthIdx = MONTH_NAMES.findIndex(
      (m) => m.toLowerCase().startsWith(monthStr.slice(0, 3))
    );
    if (monthIdx !== -1) {
      const now = new Date();
      let year = match[3] ? parseInt(match[3], 10) : now.getFullYear();
      // If month has already passed in current year, advance to next year
      if (!match[3] && monthIdx < now.getMonth()) {
        year += 1;
      }
      return new Date(year, monthIdx, day);
    }
  }

  const parsed = new Date(str);
  return isNaN(parsed.getTime()) ? null : parsed;
}

export function CustomCalendarPicker({
  value,
  onChange,
  label,
  placeholder = "Select Date",
  availableBatches = [],
  minDate = new Date(),
  maxDate,
  format = "ordinal",
  includeYear = false,
  className,
  inputClassName,
  disabled = false,
  required = false,
  name,
  id,
  align = "left",
}: CustomCalendarPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedDate = useMemo(() => parseDateString(value), [value]);

  // Calendar view month state
  const [viewDate, setViewDate] = useState<Date>(() => {
    if (selectedDate) return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  // When selectedDate changes externally, sync viewDate
  useEffect(() => {
    if (selectedDate) {
      setViewDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
    }
  }, [selectedDate]);

  // Close calendar on click outside or ESC
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown, { passive: true });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  const prevMonth = useCallback(() => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const nextMonth = useCallback(() => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  // Compute calendar grid
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  const handleSelectDay = (day: number) => {
    const newDate = new Date(viewYear, viewMonth, day);

    let formatted = "";
    if (format === "iso") {
      const mm = String(viewMonth + 1).padStart(2, "0");
      const dd = String(day).padStart(2, "0");
      formatted = `${viewYear}-${mm}-${dd}`;
    } else if (format === "readable") {
      formatted = `${day} ${MONTH_NAMES[viewMonth].slice(0, 3)} ${viewYear}`;
    } else {
      // "ordinal" format e.g. "8th December" or "8th December 2026"
      const ordinal = getOrdinalSuffix(day);
      const mName = MONTH_NAMES[viewMonth];
      formatted = includeYear ? `${ordinal} ${mName} ${viewYear}` : `${ordinal} ${mName}`;
    }

    onChange(formatted, newDate);
    setIsOpen(false);
  };

  const handleBatchClick = (batch: string) => {
    onChange(batch, parseDateString(batch) || undefined);
    setIsOpen(false);
  };

  // Check if a day has a departure batch
  const hasBatchOnDay = (day: number): boolean => {
    if (!availableBatches || availableBatches.length === 0) return false;
    const mName = MONTH_NAMES[viewMonth].toLowerCase();
    const dayStr = String(day);
    return availableBatches.some((b) => {
      const lower = b.toLowerCase();
      return (
        lower.includes(mName.slice(0, 3)) &&
        (lower.includes(`${dayStr}th`) ||
          lower.includes(`${dayStr}st`) ||
          lower.includes(`${dayStr}nd`) ||
          lower.includes(`${dayStr}rd`) ||
          lower.includes(` ${dayStr} `) ||
          lower.startsWith(`${dayStr} `))
      );
    });
  };

  // Check if a day is in the past
  const isPastDay = (day: number): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const cellDate = new Date(viewYear, viewMonth, day);
    cellDate.setHours(0, 0, 0, 0);
    return cellDate < today;
  };

  // Check if a day is today
  const isTodayDay = (day: number): boolean => {
    const today = new Date();
    return (
      today.getFullYear() === viewYear &&
      today.getMonth() === viewMonth &&
      today.getDate() === day
    );
  };

  // Check if day is selected
  const isSelectedDay = (day: number): boolean => {
    if (!selectedDate) return false;
    return (
      selectedDate.getFullYear() === viewYear &&
      selectedDate.getMonth() === viewMonth &&
      selectedDate.getDate() === day
    );
  };

  // Display text in input
  const displayValue = value || placeholder;

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-bold text-[#14140f] mb-1.5"
        >
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        ref={triggerRef}
        id={id}
        name={name}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        className={cn(
          "w-full flex items-center justify-between gap-2 text-left bg-white border-[1.5px] border-[#e2e8f0] rounded-[12px] px-3.5 py-3 text-[14px] font-medium text-[#14140f] outline-none transition-all cursor-pointer hover:border-[#14140f] focus:border-[#14140f] focus:ring-2 focus:ring-[#d6ff3f]/40 min-h-[46px]",
          isOpen && "border-[#14140f] ring-2 ring-[#d6ff3f]/40",
          !value && "text-[#707068]",
          disabled && "opacity-60 cursor-not-allowed bg-[#f8fafc]",
          inputClassName
        )}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className="truncate font-semibold text-[#14140f]">
          {displayValue}
        </span>
        <CalendarIcon className="w-4 h-4 text-[#707068] shrink-0" />
      </button>

      {/* Hidden input for standard form submission compatibility */}
      <input
        type="hidden"
        name={name}
        value={value}
        required={required}
      />

      {/* Calendar Popover Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Calendar date picker"
          className={cn(
            "absolute z-[9999] mt-2 bg-white border border-[#14140f]/15 rounded-[22px] p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.22)] w-[300px] sm:w-[330px] animate-in fade-in zoom-in-95 duration-150 text-[#14140f]",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {/* Available Departure Batches Shortcuts */}
          {availableBatches.length > 0 && (
            <div className="mb-3.5 pb-3 border-b border-[#ecece6]">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#707068] uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#2fa84f]" />
                <span>Available Trip Batches</span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto no-scrollbar">
                {availableBatches.map((batch, bIdx) => {
                  const isCur = value === batch;
                  return (
                    <button
                      key={bIdx}
                      type="button"
                      onClick={() => handleBatchClick(batch)}
                      className={cn(
                        "text-[11.5px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer whitespace-nowrap",
                        isCur
                          ? "bg-[#d6ff3f] text-[#14140f] border-[#14140f] shadow-xs"
                          : "bg-[#f8f8f5] text-[#14140f] border-[#e2e2dc] hover:bg-[#e8e8e2] hover:border-[#14140f]"
                      )}
                    >
                      {batch}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Month & Year Navigation Header */}
          <div className="flex items-center justify-between mb-3 px-1">
            <button
              type="button"
              onClick={prevMonth}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f4f4ee] active:scale-90 transition-all text-[#14140f] cursor-pointer"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-heading font-extrabold text-[15px] text-[#14140f] tracking-tight">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>

            <button
              type="button"
              onClick={nextMonth}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f4f4ee] active:scale-90 transition-all text-[#14140f] cursor-pointer"
              aria-label="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
            {SHORT_DAYS.map((d, dIdx) => (
              <span
                key={dIdx}
                className="text-[11px] font-bold text-[#8c8c82] uppercase tracking-wider py-1"
              >
                {d}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Empty slots before first day */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <span key={`empty-${i}`} className="w-8 h-8" />
            ))}

            {/* Days in Month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isPast = isPastDay(day);
              const isSelected = isSelectedDay(day);
              const isToday = isTodayDay(day);
              const hasBatch = hasBatchOnDay(day);

              return (
                <button
                  key={day}
                  type="button"
                  disabled={isPast}
                  onClick={() => handleSelectDay(day)}
                  className={cn(
                    "relative w-8 h-8 sm:w-9 sm:h-9 mx-auto rounded-[10px] text-[13px] font-semibold flex flex-col items-center justify-center transition-all cursor-pointer",
                    isPast && "text-[#c2c2b8] cursor-not-allowed pointer-events-none",
                    !isPast && !isSelected && "hover:bg-[#d6ff3f]/30 hover:text-[#14140f]",
                    isToday && !isSelected && "border border-[#14140f] font-bold",
                    isSelected &&
                      "bg-[#d6ff3f] text-[#14140f] font-black border-1.5 border-[#14140f] shadow-xs scale-105"
                  )}
                >
                  <span>{day}</span>
                  {hasBatch && !isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2fa84f] absolute bottom-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Actions Footer */}
          <div className="mt-4 pt-3 border-t border-[#ecece6] flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => {
                const now = new Date();
                handleSelectDay(now.getDate());
              }}
              className="font-bold text-[#14140f] hover:underline cursor-pointer"
            >
              Today
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3.5 py-1.5 rounded-lg bg-[#14140f] text-white font-bold hover:bg-[#2c2c24] active:scale-95 transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
