
"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type PortfolioCategory = {
  category: string;
  value: number;
};

type PortfolioChartProps = {
  data: PortfolioCategory[];
};

const COLORS = [
  "#34d399",
  "#60a5fa",
  "#fbbf24",
  "#a78bfa",
  "#fb7185",
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);

export default function PortfolioChart({ data }: PortfolioChartProps) {
  return (
    <div className="min-h-[340px] rounded-xl border border-white/[0.07] bg-[#111419] p-5">
      <div>
        <p className="text-[14px] font-medium">
          Portfolio Distribution
        </p>

        <p className="mt-1 text-[11px] text-white/35">
          Inventory valuation by category
        </p>
      </div>

      <div className="mt-4 h-[245px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="category"
              cx="50%"
              cy="46%"
              innerRadius={55}
              outerRadius={82}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.category}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#171b21",
                border: "1px solid #ffffff18",
                borderRadius: "8px",
                color: "#f4f5f6",
                fontSize: "11px",
              }}
              formatter={(value) => [
                formatCurrency(Number(value ?? 0)),
                "Inventory value",
              ]}
            />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
              iconSize={7}
              formatter={(value) => (
                <span style={{ color: "#ffffff80", fontSize: 10 }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
