
"use client";

import { Suspense } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import InventoryToolbar from "@/components/inventory/InventoryToolbar";
import InventoryTable from "@/components/inventory/InventoryTable";
import InventoryPagination from "@/components/inventory/InventoryPagination";
import useInventory from "@/hooks/useInventory";

function InventoryContent() {
  const {
    inventory,
    pagination,
    search,
    setSearch,
    category,
    setCategory,
    page,
    setPage,
    loading,
    sort,
    setSort,
    stockLevel,
    setStockLevel,
    error,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    resetFilters,
  } = useInventory();

  function handleExportCSV() {
    const params = new URLSearchParams();

    if (search.trim()) params.set("search", search.trim());
    if (category) params.set("category", category);
    if (stockLevel !== undefined) {
      params.set("maxStock", String(stockLevel));
    }
    if (minPrice !== undefined) {
      params.set("minPrice", String(minPrice));
    }
    if (maxPrice !== undefined) {
      params.set("maxPrice", String(maxPrice));
    }
    if (sort) params.set("sort", sort);

    const query = params.toString();
    window.location.href = `/api/inventory/export${query ? `?${query}` : ""}`;
  }

  return (
    <main className="min-h-screen bg-[#0b0d10] text-[#f4f5f6]">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="min-w-0 flex-1">
          <Topbar />

          <div className="p-8">
            <div>
              <p className="text-[12px] text-white/35">
                Search and manage the complete SKU portfolio
              </p>
            </div>

            <InventoryToolbar
              search={search}
              onSearchChange={setSearch}
              category={category}
              onCategoryChange={setCategory}
              stockLevel={stockLevel}
              onStockLevelChange={setStockLevel}
              onExport={handleExportCSV}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onMinPriceChange={setMinPrice}
              onMaxPriceChange={setMaxPrice}
              onResetFilters={resetFilters}
            />

            {loading ? (
              <div className="mt-4 rounded-xl border border-white/[0.07] bg-[#111419] p-8 text-center">
                <p className="text-[12px] text-white/35">
                  Loading inventory...
                </p>
              </div>
            ) : error ? (
              <div className="mt-4 rounded-xl border border-red-400/10 bg-[#111419] p-8 text-center">
                <p className="text-[12px] text-red-400/80">{error}</p>
              </div>
            ) : (
              <>
                <InventoryTable
                  inventory={inventory}
                  sort={sort}
                  onSortChange={setSort}
                />

                <InventoryPagination
                  pagination={pagination}
                  onPageChange={setPage}
                />
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default function InventoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0b0d10] text-[#f4f5f6] p-8">
          <p className="text-[12px] text-white/35">
            Loading inventory...
          </p>
        </div>
      }
    >
      <InventoryContent />
    </Suspense>
  );
}
