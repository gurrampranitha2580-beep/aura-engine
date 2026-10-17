import { Download, Search } from "lucide-react";

type InventoryToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  stockLevel: number | undefined;
  onStockLevelChange: (value: number) => void;
  onExport: () => void;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  onMinPriceChange: (value: number | undefined) => void;
  onMaxPriceChange: (value: number | undefined) => void;
  onResetFilters: () => void;
};

export default function InventoryToolbar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  stockLevel,
  onStockLevelChange,
  onExport,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
   onResetFilters,
}: InventoryToolbarProps) {
  return (
    <div className="mt-6 rounded-xl border border-white/[0.07] bg-[#111419] p-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex min-w-[260px] flex-1 items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2.5">
          <Search size={16} className="text-white/30" />

          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search inventory..."
            className="w-full bg-transparent text-[12px] text-white outline-none placeholder:text-white/25"
          />
        </div>

        <select
  value={category}
  onChange={(event) => onCategoryChange(event.target.value)}
  className="rounded-lg border border-white/[0.08] bg-[#15181d] px-3 py-2.5 text-[12px] text-white/60 outline-none"
>
  <option value="">All Categories</option>
  <option value="Electronics">Electronics</option>
  <option value="Apparel">Apparel</option>
  <option value="Home & Kitchen">Home &amp; Kitchen</option>
  <option value="Sports">Sports</option>
  <option value="Beauty">Beauty</option>
</select>
        <div className="flex min-w-[150px] flex-col gap-2 rounded-lg border border-white/[0.08] px-3 py-2">
  <div className="flex items-center justify-between gap-3">
    <label className="text-[11px] text-white/60">
      Stock Level
    </label>

    <span className="text-[11px] text-white/80">
      Below {stockLevel}
    </span>
  </div>

  <input
    type="range"
    min="0"
    max="100"

    value={stockLevel ?? 20}


    onChange={(event) =>
      onStockLevelChange(Number(event.target.value))
    }
    className="w-full accent-emerald-400"
    aria-label="Maximum stock level"
  />
</div>


<div className="flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2.5">
  <span className="text-[11px] text-white/45">Price $</span>

  <input
    type="number"
    min="0"
    value={minPrice ?? ""}
    onChange={(event) =>
      onMinPriceChange(
        event.target.value === "" ? undefined : Number(event.target.value),
      )
    }
    placeholder="Min"
    aria-label="Minimum price"
    className="w-14 bg-transparent text-[12px] text-white outline-none placeholder:text-white/25"
  />

  <span className="text-white/25">–</span>

  <input
    type="number"
    min="0"
    value={maxPrice ?? ""}
    onChange={(event) =>
      onMaxPriceChange(
        event.target.value === "" ? undefined : Number(event.target.value),
      )
    }
    placeholder="Max"
    aria-label="Maximum price"
    className="w-14 bg-transparent text-[12px] text-white outline-none placeholder:text-white/25"
  />
</div>
       <button
  type="button"
  onClick={onResetFilters}
  className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/5"
>
  Reset Filters
</button>

        <button
  type="button"
  onClick={onExport}
  className="flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2.5 text-[12px] text-white/60 hover:bg-white/[0.04]"
>
  <Download size={14} />
  Export CSV
</button>
      </div>
    </div>
  );
}