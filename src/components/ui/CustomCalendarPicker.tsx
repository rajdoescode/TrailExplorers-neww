"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  ChevronDown,
  ArrowLeft,
} from "lucide-react";
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
  align?: "left" | "right" | "auto";
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

const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
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
  align = "auto",
}: CustomCalendarPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<"calendar" | "months" | "years">("calendar");

  const selectedDate = useMemo(() => parseDateString(value), [value]);

  // Calendar view month & year state
  const [viewDate, setViewDate] = useState<Date>(() => {
    if (selectedDate) return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [yearSelectorBase, setYearSelectorBase] = useState<number>(() => viewDate.getFullYear());
  const [yearRangeStart, setYearRangeStart] = useState<number>(() => Math.floor(viewDate.getFullYear() / 12) * 12);

  // Viewport-based Portal Coordinates
  const [coords, setCoords] = useState<{
    top: number;
    left: number;
    placement: "top" | "bottom";
    isMobile: boolean;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      setViewDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
      setYearSelectorBase(selectedDate.getFullYear());
      setYearRangeStart(Math.floor(selectedDate.getFullYear() / 12) * 12);
    }
  }, [selectedDate]);

  // SMART COLLISION DETECTION & PORTAL COORDINATE CALCULATION
  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const vw = window.innerWidth || document.documentElement.clientWidth;

    const isMobile = vw < 640;
    if (isMobile) {
      setCoords({ top: 0, left: 0, placement: "bottom", isMobile: true });
      return;
    }

    const popoverWidth = Math.min(335, vw - 24);
    const renderedHeight = popoverRef.current?.offsetHeight;
    const estimatedHeight = viewMode === "calendar"
      ? (availableBatches.length > 0 ? 410 : 360)
      : 290;
    const popoverHeight = renderedHeight && renderedHeight > 100 ? renderedHeight : estimatedHeight;

    const spaceBelow = vh - rect.bottom;
    const spaceAbove = rect.top;

    let placement: "top" | "bottom" = "bottom";
    let top = rect.bottom + 8;

    // Check if bottom has insufficient space and top has more room
    if (spaceBelow < popoverHeight + 16 && spaceAbove > spaceBelow) {
      placement = "top";
      top = Math.max(12, rect.top - popoverHeight - 8);
    } else {
      // Opening below: ensure it doesn't push off the screen bottom
      if (top + popoverHeight > vh - 12) {
        top = Math.max(12, vh - popoverHeight - 12);
      }
    }

    // Horizontal alignment
    let left = rect.left;
    if (align === "right" || (align === "auto" && left + popoverWidth > vw - 16)) {
      left = Math.max(12, rect.right - popoverWidth);
    }
    // Clamp to viewport
    if (left + popoverWidth > vw - 12) {
      left = Math.max(12, vw - popoverWidth - 12);
    }
    if (left < 12) {
      left = 12;
    }

    setCoords({ top, left, placement, isMobile: false });
  }, [align, availableBatches.length, viewMode]);

  // Update coords on open, resize, scroll, or viewMode change
  useEffect(() => {
    if (!isOpen) {
      setViewMode("calendar");
      return;
    }

    updatePosition();
    const frameId = requestAnimationFrame(() => {
      updatePosition();
    });

    const handleScrollOrResize = () => {
      updatePosition();
    };

    window.addEventListener("resize", handleScrollOrResize, { passive: true });
    window.addEventListener("scroll", handleScrollOrResize, { passive: true, capture: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleScrollOrResize);
      window.removeEventListener("scroll", handleScrollOrResize, { capture: true });
    };
  }, [isOpen, viewMode, updatePosition]);

  // Click outside listener
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      const inTrigger = triggerRef.current && triggerRef.current.contains(target);
      const inPopover = popoverRef.current && popoverRef.current.contains(target);

      if (!inTrigger && !inPopover) {
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
      const ordinal = getOrdinalSuffix(day);
      const mName = MONTH_NAMES[viewMonth];
      formatted = includeYear ? `${ordinal} ${mName} ${viewYear}` : `${ordinal} ${mName}`;
    }

    onChange(formatted, newDate);
    setIsOpen(false);
    setViewMode("calendar");
  };

  const handleBatchClick = (batch: string) => {
    onChange(batch, parseDateString(batch) || undefined);
    setIsOpen(false);
    setViewMode("calendar");
  };

  const handleSelectMonth = (mIdx: number) => {
    setViewDate(new Date(yearSelectorBase, mIdx, 1));
    setViewMode("calendar");
  };

  const handleSelectYear = (y: number) => {
    setYearSelectorBase(y);
    setViewDate(new Date(y, viewMonth, 1));
    setViewMode("months");
  };

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

  const isPastDay = (day: number): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const cellDate = new Date(viewYear, viewMonth, day);
    cellDate.setHours(0, 0, 0, 0);
    if (minDate) {
      const minD = new Date(minDate);
      minD.setHours(0, 0, 0, 0);
      if (cellDate < minD) return true;
    }
    return cellDate < today;
  };

  const isFutureRestricted = (day: number): boolean => {
    if (!maxDate) return false;
    const maxD = new Date(maxDate);
    maxD.setHours(23, 59, 59, 999);
    const cellDate = new Date(viewYear, viewMonth, day);
    return cellDate > maxD;
  };

  const isTodayDay = (day: number): boolean => {
    const today = new Date();
    return (
      today.getFullYear() === viewYear &&
      today.getMonth() === viewMonth &&
      today.getDate() === day
    );
  };

  const isSelectedDay = (day: number): boolean => {
    if (!selectedDate) return false;
    return (
      selectedDate.getFullYear() === viewYear &&
      selectedDate.getMonth() === viewMonth &&
      selectedDate.getDate() === day
    );
  };

  const selectToday = () => {
    const now = new Date();
    setViewDate(new Date(now.getFullYear(), now.getMonth(), 1));
    handleSelectDay(now.getDate());
  };

  const selectTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setViewDate(new Date(tomorrow.getFullYear(), tomorrow.getMonth(), 1));
    handleSelectDay(tomorrow.getDate());
  };

  const selectNextWeekend = () => {
    const d = new Date();
    const dayOfWeek = d.getDay();
    const daysUntilSaturday = (6 - dayOfWeek + 7) % 7 || 7;
    d.setDate(d.getDate() + daysUntilSaturday);
    setViewDate(new Date(d.getFullYear(), d.getMonth(), 1));
    handleSelectDay(d.getDate());
  };

  const displayValue = value || placeholder;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  // Calendar Dialog Inner Content
  const calendarContent = (
    <div
      ref={popoverRef}
      role="dialog"
      aria-label="Advanced Date Picker"
      className="bg-white border border-[#e2e2dc] rounded-[24px] p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.22)] w-[315px] sm:w-[335px] max-w-[calc(100vw-24px)] max-h-[calc(100vh-24px)] overflow-y-auto no-scrollbar text-[#14140f] overscroll-contain touch-pan-y animate-in fade-in zoom-in-95 duration-150 relative select-none"
    >
      {/* VIEW MODE 1: DAY CALENDAR */}
      {viewMode === "calendar" && (
        <>
          {/* TOP PREVIEW BAR */}
          <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#ecece6]">
            <div className="flex items-center gap-1.5 min-w-0 pr-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d6ff3f] border border-[#14140f]/20 shrink-0" />
              <span className="text-[12.5px] font-extrabold text-[#14140f] truncate font-heading">
                {selectedDate
                  ? `${getOrdinalSuffix(selectedDate.getDate())} ${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
                  : "Pick Departure Date"}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#f2f2eb] active:scale-90 text-[#707068] hover:text-[#14140f] transition-all cursor-pointer"
              aria-label="Close calendar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* AVAILABLE TRIP BATCHES SHORTCUTS */}
          {availableBatches.length > 0 && (
            <div className="mb-3 pb-3 border-b border-[#ecece6]">
              <div className="flex items-center justify-between text-[11px] font-extrabold text-[#707068] uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#2fa84f]" />
                  Available Trip Batches
                </span>
                <span className="text-[10px] text-[#2fa84f] font-bold bg-[#e8f7ee] px-2 py-0.5 rounded-full">
                  Confirmed
                </span>
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
                        "text-[11.5px] font-extrabold px-3 py-1.5 rounded-[10px] border transition-all cursor-pointer whitespace-nowrap",
                        isCur
                          ? "bg-[#d6ff3f] text-[#14140f] border-[#14140f]/20 shadow-[0_2px_8px_rgba(214,255,63,0.45)] scale-105"
                          : "bg-[#f8f8f5] text-[#14140f] border-[#e2e2dc] hover:bg-[#d6ff3f]/25 hover:border-[#14140f]/30"
                      )}
                    >
                      {batch}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* MONTH & YEAR HEADER WITH QUICK-SELECTOR TOGGLE */}
          <div className="flex items-center justify-between mb-3 px-0.5">
            <button
              type="button"
              onClick={prevMonth}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f4f4ee] active:scale-90 transition-all text-[#14140f] cursor-pointer"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              type="button"
              onClick={() => {
                setYearSelectorBase(viewYear);
                setViewMode("months");
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#f8f8f5] hover:bg-[#ecece6] text-[#14140f] font-heading font-extrabold text-[14.5px] tracking-tight transition-all cursor-pointer border border-[#ecece6] hover:border-[#14140f]/30 group"
              title="Click to jump to another month or year"
            >
              <span>
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#707068] group-hover:text-[#14140f] transition-transform duration-200" />
            </button>

            <button
              type="button"
              onClick={nextMonth}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f4f4ee] active:scale-90 transition-all text-[#14140f] cursor-pointer"
              aria-label="Next month"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* DAYS OF WEEK HEADER */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
            {SHORT_DAYS.map((d, dIdx) => (
              <span
                key={dIdx}
                className="text-[11px] font-extrabold text-[#8c8c82] uppercase tracking-wider py-1 select-none"
              >
                {d}
              </span>
            ))}
          </div>

          {/* DAYS GRID */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <span key={`empty-${i}`} className="w-8 h-8" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isPast = isPastDay(day);
              const isFuture = isFutureRestricted(day);
              const isDisabled = isPast || isFuture;
              const isSelected = isSelectedDay(day);
              const isToday = isTodayDay(day);
              const hasBatch = hasBatchOnDay(day);

              return (
                <button
                  key={day}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleSelectDay(day)}
                  className={cn(
                    "relative w-8 h-8 sm:w-9 sm:h-9 mx-auto rounded-[11px] text-[13px] font-bold flex flex-col items-center justify-center transition-all cursor-pointer select-none",
                    isDisabled && "text-[#c2c2b8] cursor-not-allowed pointer-events-none opacity-40",
                    !isDisabled && !isSelected && "hover:bg-[#d6ff3f]/35 hover:text-[#14140f]",
                    isToday && !isSelected && "border border-[#14140f]/40 font-black",
                    isSelected &&
                      "bg-[#d6ff3f] text-[#14140f] font-black border border-[#14140f]/25 shadow-[0_2px_10px_rgba(214,255,63,0.55)] scale-105 z-10"
                  )}
                >
                  <span>{day}</span>
                  {hasBatch && !isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2fa84f] ring-1 ring-white absolute bottom-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* QUICK SHORTCUT PRESETS & DONE BUTTON */}
          <div className="mt-3.5 pt-3 border-t border-[#ecece6] flex flex-wrap items-center justify-between gap-1.5 text-xs">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={selectToday}
                className="px-2.5 py-1 rounded-lg bg-[#f8f8f5] hover:bg-[#ecece6] text-[#14140f] font-extrabold text-[11px] border border-[#e2e2dc] cursor-pointer transition-all active:scale-95"
              >
                Today
              </button>
              <button
                type="button"
                onClick={selectTomorrow}
                className="px-2.5 py-1 rounded-lg bg-[#f8f8f5] hover:bg-[#ecece6] text-[#14140f] font-extrabold text-[11px] border border-[#e2e2dc] cursor-pointer transition-all active:scale-95"
              >
                Tomorrow
              </button>
              <button
                type="button"
                onClick={selectNextWeekend}
                className="hidden sm:inline-flex px-2.5 py-1 rounded-lg bg-[#f8f8f5] hover:bg-[#ecece6] text-[#14140f] font-extrabold text-[11px] border border-[#e2e2dc] cursor-pointer transition-all active:scale-95"
              >
                Weekend
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-1.5 rounded-[10px] bg-[#d6ff3f] text-[#14140f] border-none font-heading font-black text-[12px] hover:bg-[#cbf033] shadow-[0_2px_8px_rgba(214,255,63,0.4)] active:scale-95 transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </>
      )}

      {/* VIEW MODE 2: MONTH SELECTION GRID */}
      {viewMode === "months" && (
        <div className="animate-in fade-in zoom-in-95 duration-150">
          {/* TOP BAR */}
          <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#ecece6]">
            <button
              type="button"
              onClick={() => setViewMode("calendar")}
              className="flex items-center gap-1.5 text-[12px] font-extrabold text-[#14140f] hover:text-[#707068] transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Calendar</span>
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#f2f2eb] active:scale-90 text-[#707068] hover:text-[#14140f] transition-all cursor-pointer"
              aria-label="Close calendar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* YEAR NAVIGATION BAR */}
          <div className="flex items-center justify-between mb-3.5 px-1 py-1.5 bg-[#f8f8f5] rounded-xl border border-[#ecece6]">
            <button
              type="button"
              onClick={() => setYearSelectorBase((prev) => prev - 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white active:scale-90 transition-all text-[#14140f] cursor-pointer"
              aria-label="Previous year"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              type="button"
              onClick={() => {
                setYearRangeStart(Math.floor(yearSelectorBase / 12) * 12);
                setViewMode("years");
              }}
              className="px-3 py-1 rounded-lg hover:bg-white text-[14px] font-black font-heading text-[#14140f] transition-all cursor-pointer flex items-center gap-1.5 group"
              title="Click to browse years"
            >
              <span>Year {yearSelectorBase}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#707068] group-hover:text-[#14140f] transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => setYearSelectorBase((prev) => prev + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white active:scale-90 transition-all text-[#14140f] cursor-pointer"
              aria-label="Next year"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* 12 MONTH GRID */}
          <div className="grid grid-cols-3 gap-2 py-1">
            {MONTH_SHORT.map((mShort, mIdx) => {
              const isCurrent = viewMonth === mIdx && viewYear === yearSelectorBase;
              const isSelected =
                selectedDate &&
                selectedDate.getMonth() === mIdx &&
                selectedDate.getFullYear() === yearSelectorBase;

              return (
                <button
                  key={mShort}
                  type="button"
                  onClick={() => handleSelectMonth(mIdx)}
                  className={cn(
                    "py-2.5 px-2 rounded-[12px] text-[13px] font-extrabold transition-all cursor-pointer border text-center flex flex-col items-center justify-center gap-0.5",
                    isCurrent || isSelected
                      ? "bg-[#d6ff3f] text-[#14140f] border-[#14140f]/25 shadow-[0_2px_8px_rgba(214,255,63,0.4)] font-black scale-102"
                      : "bg-white text-[#14140f] border-[#e2e2dc] hover:bg-[#f4f4ee] hover:border-[#14140f]/30"
                  )}
                >
                  <span className="font-heading font-black">{mShort}</span>
                  <span className="text-[10px] font-semibold opacity-60">
                    {MONTH_NAMES[mIdx]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* BOTTOM QUICK BUTTON */}
          <div className="mt-3.5 pt-2.5 border-t border-[#ecece6] text-center">
            <button
              type="button"
              onClick={() => setViewMode("calendar")}
              className="text-[12px] font-bold text-[#707068] hover:text-[#14140f] transition-colors cursor-pointer"
            >
              Cancel and Return to Calendar
            </button>
          </div>
        </div>
      )}

      {/* VIEW MODE 3: YEAR SELECTION GRID */}
      {viewMode === "years" && (
        <div className="animate-in fade-in zoom-in-95 duration-150">
          {/* TOP BAR */}
          <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#ecece6]">
            <button
              type="button"
              onClick={() => setViewMode("months")}
              className="flex items-center gap-1.5 text-[12px] font-extrabold text-[#14140f] hover:text-[#707068] transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Months</span>
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#f2f2eb] active:scale-90 text-[#707068] hover:text-[#14140f] transition-all cursor-pointer"
              aria-label="Close calendar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* YEAR RANGE HEADER */}
          <div className="flex items-center justify-between mb-3.5 px-1 py-1.5 bg-[#f8f8f5] rounded-xl border border-[#ecece6]">
            <button
              type="button"
              onClick={() => setYearRangeStart((prev) => prev - 12)}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white active:scale-90 transition-all text-[#14140f] cursor-pointer"
              aria-label="Previous 12 years"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>

            <span className="text-[14px] font-black font-heading text-[#14140f]">
              {yearRangeStart} – {yearRangeStart + 11}
            </span>

            <button
              type="button"
              onClick={() => setYearRangeStart((prev) => prev + 12)}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white active:scale-90 transition-all text-[#14140f] cursor-pointer"
              aria-label="Next 12 years"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* 12 YEAR GRID */}
          <div className="grid grid-cols-3 gap-2 py-1">
            {Array.from({ length: 12 }).map((_, i) => {
              const y = yearRangeStart + i;
              const isCurrent = y === yearSelectorBase;
              return (
                <button
                  key={y}
                  type="button"
                  onClick={() => handleSelectYear(y)}
                  className={cn(
                    "py-2.5 rounded-[12px] text-[13px] font-heading font-black transition-all cursor-pointer border text-center",
                    isCurrent
                      ? "bg-[#d6ff3f] text-[#14140f] border-[#14140f]/25 shadow-[0_2px_8px_rgba(214,255,63,0.4)] scale-102"
                      : "bg-white text-[#14140f] border-[#e2e2dc] hover:bg-[#f4f4ee] hover:border-[#14140f]/30"
                  )}
                >
                  {y}
                </button>
              );
            })}
          </div>

          {/* BOTTOM QUICK BUTTON */}
          <div className="mt-3.5 pt-2.5 border-t border-[#ecece6] text-center">
            <button
              type="button"
              onClick={() => setViewMode("calendar")}
              className="text-[12px] font-bold text-[#707068] hover:text-[#14140f] transition-colors cursor-pointer"
            >
              Cancel and Return to Calendar
            </button>
          </div>
        </div>
      )}
    </div>
  );

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

      {/* Trigger Button Field */}
      <button
        ref={triggerRef}
        id={id}
        name={name}
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setIsOpen((prev) => !prev);
          }
        }}
        className={cn(
          "w-full flex items-center justify-between gap-2 text-left bg-white border-[1.5px] border-[#e2e8f0] rounded-[12px] px-3.5 py-3 text-[14px] font-medium text-[#14140f] outline-none transition-all cursor-pointer hover:border-[#cbd5e1] focus:border-[#14140f] focus:ring-2 focus:ring-[#d6ff3f]/40 min-h-[46px]",
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
        <div className="flex items-center gap-1.5 shrink-0 text-[#707068]">
          <CalendarIcon className="w-4 h-4 text-[#14140f]" />
          <ChevronDown
            className={cn(
              "w-3.5 h-3.5 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </button>

      {/* Hidden input for form submission */}
      <input
        type="hidden"
        name={name}
        value={value}
        required={required}
      />

      {/* REACT PORTAL OVERLAY - UNCLIPPED & SMART POSITIONED (TOP OR BOTTOM) */}
      {isOpen && mounted && coords && createPortal(
        coords.isMobile ? (
          // Mobile View: Center dialog with subtle touch-friendly backdrop
          <div
            className="fixed inset-0 z-[999999] bg-black/45 backdrop-blur-[3px] flex items-center justify-center p-3 touch-none overscroll-contain animate-in fade-in duration-150"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            {calendarContent}
          </div>
        ) : (
          // Desktop View: Viewport-fixed floating popover placed Top or Bottom
          <div
            style={{
              position: "fixed",
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              zIndex: 999999,
            }}
          >
            {calendarContent}
          </div>
        ),
        document.body
      )}
    </div>
  );
}
