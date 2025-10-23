// import { serviceApi } from "@/lib/admin/store/services/serviceApi";

// export const overviewApi = serviceApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getOverviews: builder.query<any, any>({
//       query: ({ fromDate, toDate, type }) => {
//         const params = new URLSearchParams({
//           ...(fromDate && { fromDate }),
//           ...(toDate && { toDate }),
//           ...(type && { type }),
//         });

//         return {
//           url: `admin/dashboard/overview?${params.toString()}`,
//           method: "GET",
//         };
//       },
//      // providesTags: ["Overview"],
//     }),
//   }),
// });
// export const { useGetOverviewsQuery } = overviewApi;

import { serviceApi } from "@/lib/admin/store/services/serviceApi";

// Types for Dashboard Overview
export interface OrderStatusSummary {
  total_orders: number;
  pending_orders: number;
  confirmed_orders: number;
  completed_orders: number;
  canceled_orders: number;
  refunded_orders: number;
  completed_revenue: number;
}

export interface CustomerStatusSummary {
  total_customers: number;
  one_time_customers: number;
  returning_customers: number;
  vip_customers: number;
  normal_customers: number;
  active_customers: number;
  inactive_customers: number;
}

export interface RealTimeStats {
  totalProducts: number;
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
}

export interface RecentOrder {
  id: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
  };
  totalPrice: number;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELED" | "REFUNDED";
  createdAt: string;
  customerId: string;
  items: Array<{
    productName: string;
    quantity: number;
  }>;
}

export interface TopProduct {
  id: string;
  name: string;
  price: number;
  favoriteCount: number;
  totalSold: number;
  availableForSale: boolean;
  image: string | null;
  category: string | null;
}

export interface DashboardOverview {
  orderStatusSummary: OrderStatusSummary;
  customerStatusSummary: CustomerStatusSummary;
  realTimeStats: RealTimeStats;
  recentOrders: RecentOrder[];

  topProducts: TopProduct[];
}

export const dashboardOverviewApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get complete dashboard overview
    getNewCustomers: builder.query<any, any>({
      query: ({ fromDate, toDate }) => {
        const params = new URLSearchParams({
          ...(fromDate && { fromDate }),
          ...(toDate && { toDate }),
          type: "newCustomers",
        });

        return {
          url: `admin/dashboard/overview?${params.toString()}`,
          method: "GET",
        };
      },
      // providesTags: ['Overview'],
    }),
    getOrdersStatus: builder.query<any, any>({
      query: ({ fromDate, toDate }) => {
        const params = new URLSearchParams({
          ...(fromDate && { fromDate }),
          ...(toDate && { toDate }),
          type: "OrdersStatus",
        });

        return {
          url: `admin/dashboard/overview?${params.toString()}`,
          method: "GET",
        };
      },
      // providesTags: ['Overview'],
    }),
    getDashboardOverview: builder.query<{ data: DashboardOverview }, void>({
      query: () => {
        const params = new URLSearchParams({
          type: "overview",
        });

        return {
          url: `admin/dashboard/overview?${params.toString()}`,
          method: "GET",
        };
      },
      // providesTags: ["Dashboard"],
    }),
    getOverviews: builder.query<any, any>({
      query: ({ fromDate, toDate, type }) => {
        const params = new URLSearchParams({
          ...(fromDate && { fromDate }),
          ...(toDate && { toDate }),
          ...(type && { type }),
        });

        return {
          url: `admin/dashboard/overview?${params.toString()}`,
          method: "GET",
        };
      },
      // providesTags: ["Overview"],
    }),
    // Get only recent orders
    getRecentOrders: builder.query<{ data: RecentOrder[] }, { limit?: number }>(
      {
        query: ({ limit = 10 }) => {
          const params = new URLSearchParams({
            type: "recentOrders",
            ...(limit && { limit: limit.toString() }),
          });

          return {
            url: `admin/dashboard/overview?${params.toString()}`,
            method: "GET",
          };
        },
        // providesTags: ["Dashboard"],
      }
    ),

    // Get only top products
    getTopProducts: builder.query<{ data: TopProduct[] }, { limit?: number }>({
      query: ({ limit = 10 }) => {
        const params = new URLSearchParams({
          type: "topProducts",
          ...(limit && { limit: limit.toString() }),
        });

        return {
          url: `admin/dashboard/overview?${params.toString()}`,
          method: "GET",
        };
      },
      // providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetDashboardOverviewQuery,
  useGetRecentOrdersQuery,
  useGetTopProductsQuery,
  useGetOverviewsQuery,
  useGetNewCustomersQuery,
  useGetOrdersStatusQuery,
} = dashboardOverviewApi;
