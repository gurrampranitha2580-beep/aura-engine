
import { NextRequest, NextResponse } from "next/server";
import { queryMockInventory } from "@/lib/queryMockInventory";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const page = Math.max(1, Number(params.get("page")) || 1);
  const limit = Math.min(
    50,
    Math.max(1, Number(params.get("limit")) || 50),
  );

  const results = queryMockInventory(params);

  const totalRecords = results.length;
  const totalPages = Math.ceil(totalRecords / limit);
  const startIndex = (page - 1) * limit;
  const data = results.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    data,
    totalRecords,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
  });
}
