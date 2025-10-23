// types/dashboard.ts
export interface DashboardMetrics {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalProducts: number;
  orderGrowth: number;
  revenueGrowth: number;
  customerGrowth: number;
  productGrowth: number;
}

export interface OrderStatusData {
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELED" | "REFUNDED";
  count: number;
  percentage: number;
}

export interface CustomerStatusData {
  day: string;
  total_customers: number;
  one_time_customers: number;
  returning_customers: number;
  vip_customers: number;
  active_customers: number;
}

export interface DailyOrdersData {
  day: string;
  new_orders: number;
  completed_orders: number;
  revenue: number;
}

export interface RecentActivity {
  id: string;
  type: "ORDER" | "CUSTOMER" | "PRODUCT" | "PAYMENT";
  title: string;
  description: string;
  timestamp: Date;
  userId: string;
}
