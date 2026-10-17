
import { MOCK_INVENTORY } from "@/lib/mockInventory";
import type { InventoryItem } from "@/types/inventory";

export function queryMockInventory(
  params: URLSearchParams,
): InventoryItem[] {
  const search = (params.get("search") ?? "").trim().toLowerCase();
  const category = params.get("category") ?? "";
  const maxStock = params.get("maxStock");
  const minPrice = params.get("minPrice");
  const maxPrice = params.get("maxPrice");
  const sort = params.get("sort") ?? "-price";

  let results = MOCK_INVENTORY;

  if (search) {
    results = results.filter(
      (item) =>
        item.productName.toLowerCase().includes(search) ||
        item.sku.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search),
    );
  }

  if (category) {
    results = results.filter((item) => item.category === category);
  }

  if (maxStock !== null && maxStock !== "") {
    const stockLimit = Number(maxStock);

    if (Number.isFinite(stockLimit)) {
      results = results.filter(
        (item) => item.stockQuantity < stockLimit,
      );
    }
  }

  if (minPrice !== null && minPrice !== "") {
    const minimum = Number(minPrice);

    if (Number.isFinite(minimum)) {
      results = results.filter((item) => item.price >= minimum);
    }
  }

  if (maxPrice !== null && maxPrice !== "") {
    const maximum = Number(maxPrice);

    if (Number.isFinite(maximum)) {
      results = results.filter((item) => item.price <= maximum);
    }
  }

  const sortableFields = [
    "sku",
    "productName",
    "category",
    "price",
    "stockQuantity",
    "lastUpdated",
  ] as const;

  const descending = sort.startsWith("-");
  const sortField = descending ? sort.slice(1) : sort;

  if (
    sortableFields.includes(
      sortField as (typeof sortableFields)[number],
    )
  ) {
    const field = sortField as (typeof sortableFields)[number];
    const direction = descending ? -1 : 1;

    results = [...results].sort((a, b) => {
      const first = a[field];
      const second = b[field];

      if (typeof first === "number" && typeof second === "number") {
        return (first - second) * direction;
      }

      return (
        String(first).localeCompare(String(second), undefined, {
          numeric: true,
        }) * direction
      );
    });
  }

  return results;
}
