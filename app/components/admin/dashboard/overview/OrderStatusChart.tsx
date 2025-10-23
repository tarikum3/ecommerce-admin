"use client";

import React, { useState, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useGetOrdersStatusQuery } from "@/lib/admin/store/services/dashboard/overview.service";
import DateRangeSelector from "@/app/components/admin/ui/mui/DateRange";

const getDefaultDateRange = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 1);
  return {
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
  };
};

const OrderStatusChart = () => {
  const [dateRange, setDateRange] = useState(getDefaultDateRange());

  const handleDateChange = (
    dateRange: { startDate: string; endDate: string } | null
  ) => {
    if (dateRange) {
      setDateRange(dateRange);
    }
  };

  const { data: ordersStatusData, isLoading } = useGetOrdersStatusQuery(
    {
      fromDate: dateRange.startDate,
      toDate: dateRange.endDate,
    },
    { skip: !dateRange.startDate }
  );

  const pieData = useMemo(() => {
    if (!ordersStatusData?.data) return [];

    const lastData = ordersStatusData.data[ordersStatusData.data.length - 1];
    if (!lastData) return [];

    return [
      {
        status: "Completed",
        count: lastData.completed_orders || 0,
        color: "#10B981",
      },
      {
        status: "Pending",
        count: lastData.pending_orders || 0,
        color: "#F59E0B",
      },
      {
        status: "Confirmed",
        count: lastData.confirmed_orders || 0,
        color: "#3B82F6",
      },
      {
        status: "Canceled",
        count: lastData.canceled_orders || 0,
        color: "#EF4444",
      },
      {
        status: "Refunded",
        count: lastData.refunded_orders || 0,
        color: "#6B7280",
      },
    ].filter((item) => item.count > 0);
  }, [ordersStatusData]);

  if (isLoading) {
    return (
      <div className="bg-primary-0 rounded-xl shadow-sm p-6 border border-primary-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-primary-900">
            Order Status Distribution
          </h3>
          <DateRangeSelector onChange={handleDateChange} />
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="text-primary-500">Loading order status...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary-0 rounded-xl shadow-sm p-6 border border-primary-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-primary-900">
          Order Status Distribution
        </h3>
        <DateRangeSelector onChange={handleDateChange} />
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="count"
              label={({ status, count }) => `${status}: ${count}`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [value, name]} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrderStatusChart;
