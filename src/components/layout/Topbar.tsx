
"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const isInventory = pathname.startsWith("/inventory");
  const pageTitle = isInventory ? "Inventory" : "Command Center";

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if (event.key === "/" && !isTyping && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        setSearchOpen(true);
        requestAnimationFrame(() => searchRef.current?.focus());
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
        searchRef.current?.blur();
      }
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = search.trim();
    if (!query) return;

    router.push(`/inventory?search=${encodeURIComponent(query)}`);
    setSearchOpen(false);
  }

  return (
    <header className="flex min-h-[72px] items-center justify-between gap-4 border-b border-white/[0.07] px-8">
      <div>
        <p className="text-[12px] text-white/35">
          Aura Engine / {pageTitle}
        </p>

        <h1 className="mt-1 text-[20px] font-semibold tracking-[-0.02em]">
          {pageTitle}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {searchOpen ? (
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-[320px] items-center gap-2 rounded-lg border border-white/[0.12] bg-[#15181d] px-3 py-2 md:w-[320px]"
          >
            <Search size={15} className="shrink-0 text-white/40" />

            <input
              ref={searchRef}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by product name or SKU..."
              aria-label="Search inventory by product name or SKU"
              className="min-w-0 flex-1 bg-transparent text-[12px] text-white outline-none placeholder:text-white/30"
            />

            <button
              type="button"
              onClick={() => {
                setSearchOpen(false);
                setSearch("");
              }}
              className="text-[11px] text-white/40 hover:text-white"
              aria-label="Close search"
            >
              Esc
            </button>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => {
              setSearchOpen(true);
              requestAnimationFrame(() => searchRef.current?.focus());
            }}
            className="hidden items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-left md:flex"
          >
            <Search size={15} className="text-white/30" />

            <span className="text-[12px] text-white/30">
              Search inventory
            </span>

            <kbd className="ml-5 rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-white/30">
              /
            </kbd>
          </button>
        )}

        <div className="flex items-center gap-2 border-l border-white/[0.08] pl-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#252a31] text-[11px] font-semibold">
            OP
          </div>

          <div className="hidden leading-none sm:block">
            <p className="text-[12px] font-medium">Operations Lead</p>
            <p className="mt-1 text-[10px] text-white/30">Operations</p>
          </div>

          <ChevronDown size={14} className="text-white/30" />
        </div>
      </div>
    </header>
  );
}
