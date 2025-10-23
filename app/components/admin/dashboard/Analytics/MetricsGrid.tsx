// components/dashboard/MetricsGrid.tsx
"use client";

import {
  ShoppingCart,
  AttachMoney,
  People,
  Inventory,
} from "@mui/icons-material";
import { DashboardMetrics } from "app/types/dashboard";
import MetricCard from "./MetricCard";

interface MetricsGridProps {
  metrics: DashboardMetrics;
}

export default function MetricsGrid({ metrics }: MetricsGridProps) {
  const cards = [
    {
      title: "Total Orders",
      value: metrics.totalOrders.toLocaleString(),
      growth: metrics.orderGrowth,
      icon: <ShoppingCart />,
      color: "primary" as const,
    },
    {
      title: "Revenue",
      value: `$${metrics.totalRevenue.toLocaleString()}`,
      growth: metrics.revenueGrowth,
      icon: <AttachMoney />,
      color: "green" as const,
    },
    {
      title: "Customers",
      value: metrics.totalCustomers.toLocaleString(),
      growth: metrics.customerGrowth,
      icon: <People />,
      color: "blue" as const,
    },
    {
      title: "Products",
      value: metrics.totalProducts.toLocaleString(),
      growth: metrics.productGrowth,
      icon: <Inventory />,
      color: "purple" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {cards.map((card, index) => (
        <MetricCard
          key={index}
          title={card.title}
          value={card.value}
          growth={card.growth}
          icon={card.icon}
          color={card.color}
        />
      ))}
    </div>
  );
}
