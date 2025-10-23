"use client";

import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
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

const RevenueOverviewChart = () => {
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

  const chartData = useMemo(() => {
    if (!ordersStatusData?.data) return [];

    return ordersStatusData.data.map((item: any) => ({
      date: new Date(item.day).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      revenue: item.completed_revenue || 0,
      orders: item.total_orders || 0,
    }));
  }, [ordersStatusData]);

  if (isLoading) {
    return (
      <div className="bg-primary-0 rounded-xl shadow-sm p-6 border border-primary-100 lg:col-span-2">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-primary-900">
            Revenue & Orders Overview
          </h3>
          <DateRangeSelector onChange={handleDateChange} />
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="text-primary-500">Loading revenue data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary-0 rounded-xl shadow-sm p-6 border border-primary-100 lg:col-span-2">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-primary-900">
          Revenue & Orders Overview
        </h3>
        <DateRangeSelector onChange={handleDateChange} />
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8B5CF6"
              fill="#8B5CF6"
              fillOpacity={0.1}
              name="Revenue ($)"
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#3B82F6"
              strokeWidth={2}
              name="Orders"
              dot={{ fill: "#3B82F6" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueOverviewChart;
