"use client";

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
} from "lucide-react";
import type { InventoryItem } from "@/types/inventory";

type SortField =
  | "sku"
  | "productName"
  | "category"
  | "stockQuantity"
  | "price"
  | "lastUpdated";

type InventoryTableProps = {
  inventory: InventoryItem[];
  sort: string;
  onSortChange: (value: string) => void;
};

export default function InventoryTable({
  inventory,
  sort,
  onSortChange,
}: InventoryTableProps) {

  function handleSort(field: SortField) {
    const nextSort = sort === `-${field}` ? field : `-${field}`;
    onSortChange(nextSort);
  }

  function renderHeader(label: string, field: SortField, alignRight = false) {
    const isAscending = sort === field;
    const isDescending = sort === `-${field}`;

    return (
      <th
        key={field}
        className={`sticky top-0 z-20 bg-[#15181d] px-5 py-3 ${
          alignRight ? "text-right" : "text-left"
        }`}
      >
        <button
          type="button"
          onClick={() => handleSort(field)}
          className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white/45 transition hover:text-white/90"
          aria-label={`Sort by ${label}`}
        >
          {label}
          {isAscending ? (
            <ArrowUp size={12} />
          ) : isDescending ? (
            <ArrowDown size={12} />
          ) : (
            <ArrowUpDown size={12} className="opacity-40" />
          )}
        </button>
      </th>
    );
  }

  return (
    <div className="mt-4 rounded-xl border border-white/[0.07] bg-[#111419]">
      <div className="max-h-[calc(100vh-280px)] min-h-[300px] overflow-auto rounded-xl">
        <table className="w-full min-w-[900px] text-left">
          <thead>
            <tr>
              {renderHeader("SKU", "sku")}
              {renderHeader("Product", "productName")}
              {renderHeader("Category", "category")}
              {renderHeader("Stock", "stockQuantity", true)}
              {renderHeader("Price", "price", true)}
              {renderHeader("Last Updated", "lastUpdated", true)}
            </tr>
          </thead>

          <tbody className="divide-y divide-white/[0.05]">
            {inventory.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-[12px] text-white/40"
                >
                  No inventory items to display.
                </td>
              </tr>
            ) : (
              inventory.map((item) => (
                <tr
                  key={item.sku}
                  className="transition hover:bg-white/[0.025]"
                >
                  <td className="px-5 py-4 text-[12px] font-medium text-white/70">
                    {item.sku}
                  </td>
                  <td className="px-5 py-4 text-[12px] text-white/85">
                    {item.productName}
                  </td>
                  <td className="px-5 py-4 text-[12px] text-white/50">
                    {item.category}
                  </td>
                  <td
                    className={`px-5 py-4 text-right text-[12px] font-medium ${
                      item.stockQuantity === 0
                        ? "text-red-400"
                        : item.stockQuantity < 20
                          ? "text-amber-400"
                          : "text-white/70"
                    }`}
                  >
                    {item.stockQuantity}
                  </td>
                  <td className="px-5 py-4 text-right text-[12px] text-white/70">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-5 py-4 text-right text-[12px] text-white/35">
                    {item.lastUpdated}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}