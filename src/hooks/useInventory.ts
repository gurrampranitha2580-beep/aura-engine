
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getInventory } from "@/lib/inventoryApi";
import useDebounce from "@/hooks/useDebounce";
import type {
  InventoryItem,
  InventoryResponse,
} from "@/types/inventory";

export default function useInventory() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") ?? "";

  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [pagination, setPagination] = useState<
    Omit<InventoryResponse, "data">
  >({
    totalRecords: 0,
    totalPages: 0,
    currentPage: 1,
    hasNextPage: false,
  });

  const [page, setPage] = useState(1);
  const [search, setSearchState] = useState(initialSearch);
  const [category, setCategory] = useState("");
  const [stockLevel, setStockLevelState] = useState<number | undefined>(
    undefined,
  );
  const [minPrice, setMinPriceState] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPriceState] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("-price");

  const debouncedSearch = useDebounce(search, 500);

  function setSearch(value: string) {
    setSearchState(value);
    setPage(1);
  }

  useEffect(() => {
    const urlSearch = searchParams.get("search") ?? "";
    setSearchState(urlSearch);
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    async function loadInventory() {
      try {
        setLoading(true);
        setError("");

        const response = await getInventory({
          page,
          search: debouncedSearch,
          category,
          sort,
          maxStock: stockLevel,
          minPrice,
          maxPrice,
        });

        setInventory(response.data);
        setPagination({
          totalRecords: response.totalRecords,
          totalPages: response.totalPages,
          currentPage: response.currentPage,
          hasNextPage: response.hasNextPage,
        });
      } catch {
        setError("Unable to load inventory");
      } finally {
        setLoading(false);
      }
    }

    loadInventory();
  }, [page, debouncedSearch, category, sort, stockLevel, minPrice, maxPrice]);

  return {
    inventory,
    pagination,
    page,
    setPage,
    search,
    setSearch,
    category,
    setCategory,
    loading,
    error,
    stockLevel,
    setStockLevel: (value: number | undefined) => {
      setStockLevelState(value);
      setPage(1);
    },
    sort,
    setSort,
    minPrice,
    maxPrice,
    setMinPrice: (value: number | undefined) => {
      setMinPriceState(value);
      setPage(1);
    },
    setMaxPrice: (value: number | undefined) => {
      setMaxPriceState(value);
      setPage(1);
    },
    resetFilters: () => {
      setSearchState("");
      setCategory("");
      setStockLevelState(undefined);
      setMinPriceState(undefined);
      setMaxPriceState(undefined);
      setPage(1);
    },
  };
}
