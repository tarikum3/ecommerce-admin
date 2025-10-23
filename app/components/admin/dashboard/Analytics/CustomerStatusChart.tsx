// components/dashboard/CustomerStatusChart.tsx
"use client";

import { Card, CardContent } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CustomerStatusData } from "app/types/dashboard";

interface CustomerStatusChartProps {
  data: CustomerStatusData;
}

const COLORS = ["#0ea5e9", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444"];

export default function CustomerStatusChart({
  data,
}: CustomerStatusChartProps) {
  const chartData = [
    { name: "One-Time Customers", value: data.one_time_customers },
    { name: "Returning Customers", value: data.returning_customers },
    { name: "VIP Customers", value: data.vip_customers },
    { name: "Active Customers", value: data.active_customers },
    {
      name: "Inactive Customers",
      value: data.total_customers - data.active_customers,
    },
  ].filter((item) => item.value > 0);

  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-primary-900 mb-4">
          Customer Status
        </h3>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value, percent }) =>
                  `${name}: ${value} (${(percent * 100).toFixed(1)}%)`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [value, "Customers"]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
