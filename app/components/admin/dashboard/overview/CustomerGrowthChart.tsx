"use client";

import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetNewCustomersQuery } from "@/lib/admin/store/services/dashboard/overview.service";
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

const CustomerGrowthChart = () => {
  const [dateRange, setDateRange] = useState(getDefaultDateRange());

  const handleDateChange = (
    dateRange: { startDate: string; endDate: string } | null
  ) => {
    if (dateRange) {
      setDateRange(dateRange);
    }
  };

  const { data: newCustomersData, isLoading } = useGetNewCustomersQuery(
    {
      fromDate: dateRange.startDate,
      toDate: dateRange.endDate,
    },
    { skip: !dateRange.startDate }
  );

  const chartData = useMemo(() => {
    if (!newCustomersData?.data) return [];

    return newCustomersData.data.map((item: any) => ({
      month: item.month,
      customers: item.new_customers || 0,
    }));
  }, [newCustomersData]);

  if (isLoading) {
    return (
      <div className="bg-primary-0 rounded-xl shadow-sm p-6 border border-primary-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-primary-900">
            Customer Growth
          </h3>
          <DateRangeSelector type="year" onChange={handleDateChange} />
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="text-primary-500">Loading customer data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary-0 rounded-xl shadow-sm p-6 border border-primary-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-primary-900">
          Customer Growth
        </h3>
        <DateRangeSelector type="year" onChange={handleDateChange} />
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="customers"
              radius={[4, 4, 0, 0]}
              fill="#8B5CF6"
              name="New Customers"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomerGrowthChart;
