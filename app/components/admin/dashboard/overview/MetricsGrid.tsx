"use client";

import React from "react";
import {
  TrendingUp,
  ShoppingCart,
  People,
  AttachMoney,
} from "@mui/icons-material";
import { useGetDashboardOverviewQuery } from "@/lib/admin/store/services/dashboard/overview.service";
import MetricCard from "@/app/components/admin/dashboard/overview/MetricCard";

const MetricsGrid = () => {
  const { data: overviewData, isLoading } = useGetDashboardOverviewQuery();

  if (isLoading) return <div>Loading KPIs...</div>;

  const overview = overviewData?.data;

  const metrics = [
    {
      title: "Total Revenue",
      value: overview?.realTimeStats?.totalRevenue || 0,
      prevalue: overview?.realTimeStats?.totalRevenue
        ? overview.realTimeStats.totalRevenue * 0.875
        : undefined,
      icon: <AttachMoney className="text-primary-600" />,
    },
    {
      title: "Total Orders",
      value: overview?.realTimeStats?.totalOrders || 0,
      prevalue: overview?.realTimeStats?.totalOrders
        ? Math.round(overview.realTimeStats.totalOrders * 0.918)
        : undefined,
      icon: <ShoppingCart className="text-primary-600" />,
    },
    {
      title: "Total Customers",
      value: overview?.realTimeStats?.totalCustomers || 0,
      prevalue: overview?.realTimeStats?.totalCustomers
        ? Math.round(overview.realTimeStats.totalCustomers * 0.943)
        : undefined,
      icon: <People className="text-primary-600" />,
    },
    {
      title: "Active Products",
      value: overview?.realTimeStats?.totalProducts || 0,
      prevalue: overview?.realTimeStats?.totalProducts
        ? Math.round(overview.realTimeStats.totalProducts * 0.966)
        : undefined,
      icon: <TrendingUp className="text-primary-600" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          prevalue={metric.prevalue}
          icon={metric.icon}
        />
      ))}
    </div>
  );
};

export default MetricsGrid;
