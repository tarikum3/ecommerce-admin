// components/dashboard/OrderStatusSummary.tsx
"use client";

import { Card, CardContent } from "@mui/material";
import { OrderStatusData } from "app/types/dashboard";

interface OrderStatusSummaryProps {
  data: OrderStatusData[];
}

const statusConfig = {
  PENDING: { color: "bg-yellow-500", label: "Pending" },
  CONFIRMED: { color: "bg-blue-500", label: "Confirmed" },
  COMPLETED: { color: "bg-green-500", label: "Completed" },
  CANCELED: { color: "bg-red-500", label: "Canceled" },
  REFUNDED: { color: "bg-primary-500", label: "Refunded" },
};

export default function OrderStatusSummary({ data }: OrderStatusSummaryProps) {
  const totalOrders = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card className="bg-primary-0 shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-primary-900 mb-4">
          Order Status Summary
        </h3>

        <div className="space-y-4">
          {data.map((item) => {
            const config = statusConfig[item.status];
            const percentage =
              totalOrders > 0 ? (item.count / totalOrders) * 100 : 0;

            return (
              <div
                key={item.status}
                className="flex justify-between items-center"
              >
                <div className="flex items-center flex-1">
                  <div
                    className={`w-3 h-3 ${config.color} rounded-full mr-3`}
                  ></div>
                  <span className="text-sm font-medium text-primary-700">
                    {config.label}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-20 bg-primary-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${config.color.replace(
                        "bg-",
                        "bg-"
                      )}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>

                  <div className="text-right min-w-[80px]">
                    <span className="text-sm font-semibold">{item.count}</span>
                    <span className="text-xs text-primary-500 ml-1">
                      ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-primary-200">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-primary-700">
              Total Orders
            </span>
            <span className="text-lg font-bold text-primary-600">
              {totalOrders}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
