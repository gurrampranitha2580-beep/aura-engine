
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

type RestockItem = {
  sku: string;
  productName: string;
  stockQuantity: number;
};

type RestockChartProps = {
  data: RestockItem[];
};

export default function RestockChart({ data }: RestockChartProps) {
  return (
    <div className="min-h-[340px] rounded-xl border border-white/[0.07] bg-[#111419] p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[14px] font-medium">
            Restock Priority
          </p>

          <p className="mt-1 text-[11px] text-white/35">
            Products with the lowest stock quantities
          </p>
        </div>

        <span className="rounded-md border border-white/[0.07] px-2 py-1 text-[10px] text-white/35">
          Top 10
        </span>
      </div>

      <div className="mt-4 h-[245px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 54, bottom: 4, left: 4 }}
          >
            <CartesianGrid
              stroke="#ffffff12"
              strokeDasharray="3 3"
              horizontal={false}
            />

            <XAxis
              type="number"
              domain={[0, "auto"]}
              allowDecimals={false}
              tick={{ fill: "#ffffff60", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              type="category"
              dataKey="sku"
              width={82}
              tick={{ fill: "#ffffff80", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "#ffffff08" }}
              contentStyle={{
                backgroundColor: "#171b21",
                border: "1px solid #ffffff18",
                borderRadius: "8px",
                color: "#f4f5f6",
                fontSize: "11px",
              }}
              formatter={(value) => [
                `${value ?? 0} units`,
                "Available stock",
              ]}
              labelFormatter={(label, payload) => {
                const product = payload?.[0]?.payload as
                  | RestockItem
                  | undefined;

                return product
                  ? `${product.productName} (${product.sku})`
                  : `SKU: ${label}`;
              }}
            />

            <Bar
              dataKey="stockQuantity"
              name="Available stock"
              fill="#34d399"
              radius={[0, 4, 4, 0]}
              barSize={12}
              minPointSize={4}


            >
              <LabelList
                dataKey="stockQuantity"
                position="right"
                fill="#ffffff80"
                fontSize={10}
                formatter={(value) => `${value} units`}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
