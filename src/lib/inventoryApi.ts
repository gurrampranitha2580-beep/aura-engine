import type { InventoryResponse } from "@/types/inventory";

type InventoryQuery = {
  page?: number;
  search?: string;
  category?: string;
  sort?: string;
  maxStock?: number;
  minPrice?: number;
  maxPrice?: number;
};

export async function getInventory(
  query: InventoryQuery = {},
): Promise<InventoryResponse> {
  const params = new URLSearchParams();

  params.set("page", String(query.page ?? 1));
  params.set("limit", "50");

  if (query.search) {
    params.set("search", query.search);
  }

  if (query.category) {
    params.set("category", query.category);

  }
  if (query.maxStock !== undefined) {
    params.set("maxStock", String(query.maxStock));
  }
  if (query.minPrice !== undefined) {
    params.set("minPrice", String(query.minPrice));
  }
  if (query.maxPrice !== undefined) {
    params.set("maxPrice", String(query.maxPrice));
  }

  if (query.sort) {
    params.set("sort", query.sort);
  }

  const response = await fetch(`/api/inventory?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch inventory");
  }

  return response.json();
}