import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import KpiCard from "@/components/dashboard/KpiCard";
import RestockChart from "@/components/dashboard/RestockChart";
import PortfolioChart from "@/components/dashboard/PortfolioChart";
import { MOCK_INVENTORY } from "@/lib/mockInventory";

export default function Home() {
  const totalSKUs = MOCK_INVENTORY.length;

  const inventoryValue = MOCK_INVENTORY.reduce(
    (total, item) => total + item.price * item.stockQuantity,
    0,
  );

  const outOfStock = MOCK_INVENTORY.filter(
    (item) => item.stockQuantity === 0,
  ).length;
  const restockPriority = [...MOCK_INVENTORY]
    .sort((a, b) => a.stockQuantity - b.stockQuantity)
    .slice(0, 10)
    .map((item) => ({
      sku: item.sku,
      productName: item.productName,
      stockQuantity: item.stockQuantity,
    }));

  const categoryValues = new Map<string, number>();

  for (const item of MOCK_INVENTORY) {
    const currentValue = categoryValues.get(item.category) ?? 0;

    categoryValues.set(
      item.category,
      currentValue + item.price * item.stockQuantity,
    );
  }

  const portfolioDistribution = Array.from(
    categoryValues,
    ([category, value]) => ({ category, value }),
  );

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <main className="min-h-screen bg-[#0b0d10] text-[#f4f5f6]">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="min-w-0 flex-1">
          <Topbar />

          <div className="p-8">
            <div className="mb-8">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-emerald-400/80">
                Overview
              </p>

              <div className="flex items-end justify-between gap-6">
                <div>
                  <h2 className="text-[28px] font-semibold tracking-[-0.03em]">
                    Inventory at a glance
                  </h2>

                  <p className="mt-2 max-w-xl text-[13px] leading-6 text-white/40">
                    Monitor inventory health, valuation, and restock priorities
                    across the portfolio.
                  </p>
                </div>

                <div className="hidden items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[11px] text-white/45 lg:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Mock data · 50,000 products
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <KpiCard
                label="Total SKUs"
                value={totalSKUs.toLocaleString("en-US")}
                description="Across all categories"
                descriptionClassName="text-emerald-400/80"
              />

              <KpiCard
                label="Inventory Value"
                value={formatCurrency(inventoryValue)}
                description="Price × available stock"
              />

              <KpiCard
                label="Out of Stock"
                value={outOfStock.toLocaleString("en-US")}
                description="Requires attention"
                descriptionClassName="text-amber-400/80"
              />
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
              <RestockChart data={restockPriority} />
              <PortfolioChart data={portfolioDistribution} />
            </div>

            <div className="mt-4 rounded-xl border border-white/[0.07] bg-[#111419] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-medium">Inventory</p>
                  <p className="mt-1 text-[11px] text-white/35">
                    Search and manage the complete SKU portfolio
                  </p>
                </div>

                <Link
                  href="/inventory"
                  className="rounded-lg border border-white/[0.08] px-3 py-2 text-[11px] text-white/60 transition hover:bg-white/[0.04]"
                >
                  View inventory
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}