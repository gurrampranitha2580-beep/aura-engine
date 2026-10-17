
import { NextRequest } from "next/server";
import { queryMockInventory } from "@/lib/queryMockInventory";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const items = queryMockInventory(request.nextUrl.searchParams);

  const columns = [
    "sku",
    "productName",
    "category",
    "price",
    "cost",
    "stockQuantity",
    "reorderLevel",
    "lastUpdated",
  ] as const;

  const escapeCSV = (value: string | number) => {
    const text = String(value);
    return `"${text.replace(/"/g, '""')}"`;
  };

  const csvContent = [
    columns.join(","),
    ...items.map((item) =>
      columns.map((column) => escapeCSV(item[column])).join(","),
    ),
  ].join("\r\n");

  return new Response("\uFEFF" + csvContent, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="aura-inventory.csv"',
    },
  });
}
