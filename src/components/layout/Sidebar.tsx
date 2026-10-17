
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Boxes,
  CircleHelp,
  LayoutDashboard,
  Settings,
} from "lucide-react";

const navigationItems = [
  {
    label: "Command Center",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Inventory",
    href: "/inventory",
    icon: Boxes,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-[248px] flex-col border-r border-white/[0.07] bg-[#0f1115]">
      <div className="flex h-[72px] items-center border-b border-white/[0.07] px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#0b0d10]">
            <BarChart3 size={19} strokeWidth={2.4} />
          </div>

          <div>
            <p className="text-[15px] font-semibold tracking-[-0.01em]">
              Aura Engine
            </p>

            <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-white/35">
              Operations
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-3 py-6">
        <p className="px-3 pb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-white/30">
          Workspace
        </p>

        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] transition ${
                  active
                    ? "bg-white/[0.08] text-white"
                    : "text-white/45 hover:bg-white/[0.04] hover:text-white/80"
                }`}
              >
                <Icon size={17} strokeWidth={1.8} />

                <span>{item.label}</span>

                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-white/[0.07] p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-white/45 hover:bg-white/[0.04] hover:text-white/80">
          <CircleHelp size={17} strokeWidth={1.8} />
          Help &amp; Support
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-white/45 hover:bg-white/[0.04] hover:text-white/80">
          <Settings size={17} strokeWidth={1.8} />
          Settings
        </button>
      </div>
    </aside>
  );
}
