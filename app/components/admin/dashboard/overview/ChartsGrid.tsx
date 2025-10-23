"use client";

import React from "react";
import RevenueOverviewChart from "@/app/components/admin/dashboard/overview/RevenueOverviewChart";
import OrderStatusChart from "@/app/components/admin/dashboard/overview/OrderStatusChart";
import CustomerGrowthChart from "@/app/components/admin/dashboard/overview/CustomerGrowthChart";

const ChartsGrid = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
    <RevenueOverviewChart />
    <OrderStatusChart />
    <CustomerGrowthChart />
  </div>
);

export default ChartsGrid;
