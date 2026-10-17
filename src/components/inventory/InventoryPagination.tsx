
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { InventoryResponse } from "@/types/inventory";

type InventoryPaginationProps = {
  pagination: Omit<InventoryResponse, "data">;
  onPageChange: (page: number) => void;
};

export default function InventoryPagination({
  pagination,
  onPageChange,
}: InventoryPaginationProps) {
  const { totalRecords, totalPages, currentPage, hasNextPage } = pagination;

  const firstItem =
    totalRecords === 0 ? 0 : (currentPage - 1) * 50 + 1;

  const lastItem = Math.min(currentPage * 50, totalRecords);

  return (
    <div className="flex items-center justify-between border-t border-white/[0.07] px-5 py-3">
      <p className="text-[11px] text-white/35">
        Showing {firstItem}–{lastItem} of {totalRecords} items
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-white/[0.07] text-white/50 hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:text-white/20"
          aria-label="Previous page"
        >
          <ChevronLeft size={14} />
        </button>

        <span className="px-2 text-[11px] text-white/70">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-white/[0.07] text-white/50 hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:text-white/20"
          aria-label="Next page"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
