"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Download,
  SlidersHorizontal,
  Check,
  X,
  FileSpreadsheet,
  Inbox,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { Badge } from "./Badge";

export interface ColumnDef<T> {
  id?: string;
  header: string | React.ReactNode;
  accessorKey?: keyof T | string;
  accessorFn?: (row: T) => any;
  cell?: (info: { row: T; value: any; index: number }) => React.ReactNode;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  width?: string;
  className?: string;
  hideable?: boolean;
  isVisibleDefault?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  keyExtractor: (item: T) => string | number;
  searchPlaceholder?: string;
  searchableKeys?: (keyof T | string)[];
  initialPageSize?: number;
  pageSizeOptions?: number[];
  enableSelection?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  bulkActions?: (selectedRows: T[], clearSelection: () => void) => React.ReactNode;
  exportFileName?: string;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: React.ReactNode;
  onRowClick?: (row: T) => void;
  toolbarRight?: React.ReactNode;
  className?: string;
}

type SortDirection = "asc" | "desc" | null;

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  keyExtractor,
  searchPlaceholder = "Search records...",
  searchableKeys,
  initialPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  enableSelection = false,
  onSelectionChange,
  bulkActions,
  exportFileName = "trailexplorers-export",
  isLoading = false,
  emptyTitle = "No records found",
  emptyDescription = "Try adjusting your search query or filters.",
  emptyIcon,
  onRowClick,
  toolbarRight,
  className,
}: DataTableProps<T>) {
  // 1. Search Query
  const [searchQuery, setSearchQuery] = useState("");

  // 2. Sorting
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // 3. Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // 4. Selection
  const [selectedKeys, setSelectedKeys] = useState<Set<string | number>>(new Set());

  // 5. Column Visibility
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    columns.forEach((col, idx) => {
      const colId = col.id || (typeof col.accessorKey === "string" ? col.accessorKey : `col-${idx}`);
      initial[colId] = col.isVisibleDefault ?? true;
    });
    return initial;
  });

  const [showColumnDropdown, setShowColumnDropdown] = useState(false);

  // Helper to extract value from a row
  const getCellValue = (row: T, col: ColumnDef<T>) => {
    if (col.accessorFn) return col.accessorFn(row);
    if (col.accessorKey) {
      const key = col.accessorKey as string;
      return row[key];
    }
    return undefined;
  };

  // Filter Data by Search Query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const query = searchQuery.toLowerCase().trim();

    return data.filter((row) => {
      if (searchableKeys && searchableKeys.length > 0) {
        return searchableKeys.some((k) => {
          const val = row[k as string];
          if (val === null || val === undefined) return false;
          return String(val).toLowerCase().includes(query);
        });
      }

      // Default: Search across all column values
      return columns.some((col) => {
        const val = getCellValue(row, col);
        if (val === null || val === undefined) return false;
        if (typeof val === "object") return false;
        return String(val).toLowerCase().includes(query);
      });
    });
  }, [data, searchQuery, searchableKeys, columns]);

  // Sort Filtered Data
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return filteredData;

    const col = columns.find(
      (c, idx) => (c.id || c.accessorKey || `col-${idx}`) === sortColumn
    );
    if (!col) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = getCellValue(a, col);
      const bVal = getCellValue(b, col);

      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      let comparison = 0;
      if (typeof aVal === "number" && typeof bVal === "number") {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [filteredData, sortColumn, sortDirection, columns]);

  // Paginate Sorted Data
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, safeCurrentPage, pageSize]);

  // Visible Columns
  const visibleColumns = useMemo(() => {
    return columns.filter((col, idx) => {
      const colId = col.id || (typeof col.accessorKey === "string" ? col.accessorKey : `col-${idx}`);
      return columnVisibility[colId] !== false;
    });
  }, [columns, columnVisibility]);

  // Handle Sort Toggle
  const handleSort = (colId: string, isSortable?: boolean) => {
    if (!isSortable) return;
    if (sortColumn !== colId) {
      setSortColumn(colId);
      setSortDirection("asc");
    } else {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortColumn(null);
        setSortDirection(null);
      } else {
        setSortDirection("asc");
      }
    }
  };

  // Selection Handlers
  const handleSelectRow = (key: string | number, row: T) => {
    const next = new Set(selectedKeys);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    setSelectedKeys(next);

    if (onSelectionChange) {
      const selected = data.filter((item) => next.has(keyExtractor(item)));
      onSelectionChange(selected);
    }
  };

  const isAllPageSelected =
    paginatedData.length > 0 &&
    paginatedData.every((row) => selectedKeys.has(keyExtractor(row)));

  const handleSelectAllPage = () => {
    const next = new Set(selectedKeys);
    if (isAllPageSelected) {
      paginatedData.forEach((row) => next.delete(keyExtractor(row)));
    } else {
      paginatedData.forEach((row) => next.add(keyExtractor(row)));
    }
    setSelectedKeys(next);

    if (onSelectionChange) {
      const selected = data.filter((item) => next.has(keyExtractor(item)));
      onSelectionChange(selected);
    }
  };

  const clearSelection = () => {
    setSelectedKeys(new Set());
    if (onSelectionChange) onSelectionChange([]);
  };

  const selectedRowsList = useMemo(() => {
    return data.filter((item) => selectedKeys.has(keyExtractor(item)));
  }, [data, selectedKeys, keyExtractor]);

  // Export to CSV Function
  const exportToCSV = () => {
    const exportRows = selectedRowsList.length > 0 ? selectedRowsList : sortedData;
    const headers = visibleColumns
      .map((c) => (typeof c.header === "string" ? c.header : c.id || "Column"))
      .join(",");

    const rows = exportRows.map((row) => {
      return visibleColumns
        .map((c) => {
          const val = getCellValue(row, c);
          if (val === null || val === undefined) return '""';
          const clean = String(val).replace(/"/g, '""');
          return `"${clean}"`;
        })
        .join(",");
    });

    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${exportFileName}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* 1. Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-[20px] border-2 border-[#e2e2dc] shadow-card">
        {/* Left: Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#6b6b63] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
            className="w-full bg-[#f6f6f1] border-2 border-[#e2e2dc] rounded-full pl-10 pr-9 py-2 text-xs sm:text-sm text-[#14140f] placeholder:text-[#6b6b63] focus:border-[#14140f] focus:bg-white outline-none transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b63] hover:text-[#14140f]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right: Controls & Actions */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto flex-wrap">
          {toolbarRight}

          {/* Export Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={exportToCSV}
            leftIcon={<Download className="w-3.5 h-3.5" />}
            title="Export filtered records to CSV"
          >
            <span className="hidden sm:inline">Export</span> CSV
          </Button>

          {/* Column Visibility Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowColumnDropdown(!showColumnDropdown)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border-2 border-[#e2e2dc] bg-white hover:border-[#14140f] text-xs font-bold text-[#14140f] transition-all"
              title="Customize columns"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#6b6b63]" />
              <span className="hidden sm:inline">Columns</span>
            </button>

            {showColumnDropdown && (
              <div
                className="absolute right-0 mt-2 w-52 bg-white rounded-2xl border-2 border-[#14140f] shadow-card p-3 z-50 animate-fade-in space-y-1.5"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-1.5 border-b border-[#e2e2dc] text-[10px] font-extrabold uppercase tracking-wider text-[#6b6b63]">
                  <span>Toggle Columns</span>
                  <button
                    onClick={() => setShowColumnDropdown(false)}
                    className="p-1 hover:text-[#14140f]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>

                <div className="max-h-56 overflow-y-auto space-y-1">
                  {columns.map((col, idx) => {
                    const colId =
                      col.id ||
                      (typeof col.accessorKey === "string" ? col.accessorKey : `col-${idx}`);
                    const isVisible = columnVisibility[colId] !== false;
                    const label =
                      typeof col.header === "string" ? col.header : colId;

                    return (
                      <label
                        key={colId}
                        className="flex items-center gap-2 px-2 py-1.5 text-xs font-semibold hover:bg-[#f6f6f1] rounded-lg cursor-pointer text-[#14140f]"
                      >
                        <input
                          type="checkbox"
                          checked={isVisible}
                          onChange={(e) =>
                            setColumnVisibility({
                              ...columnVisibility,
                              [colId]: e.target.checked,
                            })
                          }
                          className="rounded w-3.5 h-3.5 accent-[#14140f]"
                        />
                        <span className="truncate">{label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Bulk Action Bar (When rows are selected) */}
      {enableSelection && selectedKeys.size > 0 && (
        <div className="p-3.5 px-5 rounded-[18px] bg-[#14140f] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-card animate-fade-in border-2 border-[#14140f]">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#d6ff3f] text-[#14140f] font-black text-xs flex items-center justify-center">
              {selectedKeys.size}
            </span>
            <span className="text-xs font-bold text-white">
              {selectedKeys.size === 1 ? "1 item selected" : `${selectedKeys.size} items selected`}
            </span>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            {bulkActions && bulkActions(selectedRowsList, clearSelection)}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSelection}
              className="text-white hover:bg-white/10 text-xs"
            >
              Deselect All
            </Button>
          </div>
        </div>
      )}

      {/* 3. Table Container */}
      <div className="bg-white rounded-[22px] border-2 border-[#e2e2dc] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f6f6f1] border-b-2 border-[#e2e2dc] text-[11px] font-extrabold text-[#6b6b63] uppercase tracking-wider select-none">
                {enableSelection && (
                  <th className="py-4 px-4 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={isAllPageSelected}
                      onChange={handleSelectAllPage}
                      className="rounded w-4 h-4 accent-[#14140f] cursor-pointer"
                      title="Select all on this page"
                    />
                  </th>
                )}

                {visibleColumns.map((col, idx) => {
                  const colId =
                    col.id ||
                    (typeof col.accessorKey === "string" ? col.accessorKey : `col-${idx}`);
                  const isSorted = sortColumn === colId;
                  const alignClass =
                    col.align === "right"
                      ? "text-right"
                      : col.align === "center"
                      ? "text-center"
                      : "text-left";

                  return (
                    <th
                      key={colId}
                      style={{ width: col.width }}
                      onClick={() => handleSort(colId, col.sortable)}
                      className={cn(
                        "py-4 px-4 sm:px-6 transition-colors",
                        col.sortable && "cursor-pointer hover:bg-[#e4e4dd]/70",
                        alignClass,
                        col.className
                      )}
                    >
                      <div
                        className={cn(
                          "inline-flex items-center gap-1.5",
                          col.align === "right" && "justify-end",
                          col.align === "center" && "justify-center"
                        )}
                      >
                        <span>{col.header}</span>
                        {col.sortable && (
                          <span className="text-[#6b6b63]">
                            {isSorted ? (
                              sortDirection === "asc" ? (
                                <ChevronUp className="w-3.5 h-3.5 text-[#14140f]" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5 text-[#14140f]" />
                              )
                            ) : (
                              <ChevronsUpDown className="w-3 h-3 opacity-40 hover:opacity-100" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#e2e2dc] text-sm">
              {isLoading ? (
                Array.from({ length: pageSize > 5 ? 5 : pageSize }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {enableSelection && <td className="py-4 px-4 text-center" />}
                    {visibleColumns.map((_, cIdx) => (
                      <td key={cIdx} className="py-4 px-6">
                        <div className="h-4 bg-gray-200 rounded-md w-3/4" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={visibleColumns.length + (enableSelection ? 1 : 0)}
                    className="py-14 text-center text-[#6b6b63]"
                  >
                    <div className="flex flex-col items-center justify-center gap-2.5 max-w-sm mx-auto">
                      <div className="w-12 h-12 rounded-full bg-[#f6f6f1] border border-[#e2e2dc] flex items-center justify-center text-[#6b6b63]">
                        {emptyIcon || <Inbox className="w-6 h-6" />}
                      </div>
                      <h4 className="font-extrabold text-[#14140f] text-sm">
                        {emptyTitle}
                      </h4>
                      <p className="text-xs text-[#6b6b63]">{emptyDescription}</p>
                      {searchQuery && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSearchQuery("")}
                        >
                          Clear Search
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, rowIdx) => {
                  const key = keyExtractor(row);
                  const isSelected = selectedKeys.has(key);

                  return (
                    <tr
                      key={key}
                      onClick={() => onRowClick && onRowClick(row)}
                      className={cn(
                        "transition-colors group",
                        onRowClick && "cursor-pointer",
                        isSelected
                          ? "bg-[#d6ff3f]/10 hover:bg-[#d6ff3f]/20"
                          : "hover:bg-[#f6f6f1]/60"
                      )}
                    >
                      {enableSelection && (
                        <td
                          className="py-4 px-4 text-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectRow(key, row)}
                            className="rounded w-4 h-4 accent-[#14140f] cursor-pointer"
                          />
                        </td>
                      )}

                      {visibleColumns.map((col, colIdx) => {
                        const colId =
                          col.id ||
                          (typeof col.accessorKey === "string"
                            ? col.accessorKey
                            : `col-${colIdx}`);
                        const rawValue = getCellValue(row, col);
                        const alignClass =
                          col.align === "right"
                            ? "text-right"
                            : col.align === "center"
                            ? "text-center"
                            : "text-left";

                        return (
                          <td
                            key={colId}
                            className={cn(
                              "py-4 px-4 sm:px-6 align-middle",
                              alignClass,
                              col.className
                            )}
                          >
                            {col.cell
                              ? col.cell({ row, value: rawValue, index: rowIdx })
                              : rawValue !== undefined && rawValue !== null
                              ? String(rawValue)
                              : "—"}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 4. Pagination & Records Info Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 px-6 border-t-2 border-[#e2e2dc] bg-[#fdfdfc] text-xs">
          {/* Records Counter & Page Size Selector */}
          <div className="flex items-center gap-3">
            <span className="text-[#6b6b63] font-semibold">
              Showing{" "}
              <strong className="text-[#14140f]">
                {totalItems === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1}
              </strong>{" "}
              to{" "}
              <strong className="text-[#14140f]">
                {Math.min(safeCurrentPage * pageSize, totalItems)}
              </strong>{" "}
              of <strong className="text-[#14140f]">{totalItems}</strong> entries
            </span>

            <div className="flex items-center gap-1.5 pl-2 border-l border-[#e2e2dc]">
              <span className="text-[#6b6b63] hidden sm:inline">Per page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-[#f6f6f1] border border-[#e2e2dc] rounded-lg px-2 py-1 text-xs font-bold text-[#14140f] outline-none focus:border-[#14140f]"
              >
                {pageSizeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Page Navigation Controls */}
          {totalPages > 1 && (
            <div className="flex items-center gap-1 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safeCurrentPage === 1}
                className="p-1.5 rounded-lg border border-[#e2e2dc] hover:bg-[#f6f6f1] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Previous page"
              >
                <ChevronLeft className="w-4 h-4 text-[#14140f]" />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pNum = idx + 1;
                  // Show current page, edges, and adjacent
                  if (
                    pNum === 1 ||
                    pNum === totalPages ||
                    (pNum >= safeCurrentPage - 1 && pNum <= safeCurrentPage + 1)
                  ) {
                    const isActive = pNum === safeCurrentPage;
                    return (
                      <button
                        key={pNum}
                        type="button"
                        onClick={() => setCurrentPage(pNum)}
                        className={cn(
                          "w-7 h-7 rounded-lg text-xs font-bold transition-all",
                          isActive
                            ? "bg-[#14140f] text-[#d6ff3f] shadow-xs"
                            : "border border-[#e2e2dc] hover:bg-[#f6f6f1] text-[#14140f]"
                        )}
                      >
                        {pNum}
                      </button>
                    );
                  }
                  if (
                    pNum === safeCurrentPage - 2 ||
                    pNum === safeCurrentPage + 2
                  ) {
                    return (
                      <span key={pNum} className="px-1 text-gray-400 text-xs">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safeCurrentPage === totalPages}
                className="p-1.5 rounded-lg border border-[#e2e2dc] hover:bg-[#f6f6f1] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Next page"
              >
                <ChevronRight className="w-4 h-4 text-[#14140f]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
