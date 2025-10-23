// "use client";

// import React, { Suspense } from "react";

// import CustomersOverMonths from "@/app/components/admin/dashboard/overview/CustomersOverMonths";
// import OrderStatusSummary from "@/app/components/admin/dashboard/overview/OrderStatusSummary";
// import OrdersOverMonths from "@/app/components/admin/dashboard/overview/OrdersOverMonths";

// export default function Overview() {
//   return (
//     <div className="flex flex-col gap-10 text-primary min-h-screen">
//       <Suspense>
//         <CustomersOverMonths />
//       </Suspense>
//       <Suspense>
//         <OrderStatusSummary />
//       </Suspense>
//       <Suspense>
//         <OrdersOverMonths />
//       </Suspense>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useMemo } from "react";
// import {
//   AreaChart,
//   Area,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Cell,
// } from "recharts";
// import {
//   TrendingUp,
//   TrendingDown,
//   ShoppingCart,
//   People,
//   BarChart as BarChartIcon,
//   AttachMoney,
// } from "@mui/icons-material";

// import {
//   useGetNewCustomersQuery,
//   useGetOrdersStatusQuery,
//   useGetDashboardOverviewQuery,
// } from "@/lib/admin/store/services/dashboard/overview.service";
// import DateRangeSelector from "@/app/components/admin/ui/mui/DateRange";
// import MetricCard from "@/app/components/admin/dashboard/overview/MetricCard";

// // Date utilities
// const getDefaultDateRange = () => {
//   const endDate = new Date();
//   const startDate = new Date();
//   startDate.setMonth(startDate.getMonth() - 1);
//   return {
//     startDate: startDate.toISOString().split("T")[0],
//     endDate: endDate.toISOString().split("T")[0],
//   };
// };

// // Header Component
// const DashboardHeader = () => {
//   return (
//     <div className="mb-8">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-primary-900">Overview</h1>
//           <p className="text-primary-600 mt-2">
//             Monitor your store performance and customer insights
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const MetricsGrid = () => {
//   const { data: overviewData, isLoading } = useGetDashboardOverviewQuery();

//   if (isLoading) return <div>Loading KPIs...</div>;

//   const overview = overviewData?.data;

//   const metrics = [
//     {
//       title: "Total Revenue",
//       value: overview?.realTimeStats?.totalRevenue || 0,
//       prevalue: overview?.realTimeStats?.totalRevenue
//         ? overview.realTimeStats.totalRevenue * 0.875
//         : undefined, // 12.5% less for demo
//       icon: <AttachMoney className="text-primary-600" />,
//     },
//     {
//       title: "Total Orders",
//       value: overview?.realTimeStats?.totalOrders || 0,
//       prevalue: overview?.realTimeStats?.totalOrders
//         ? Math.round(overview.realTimeStats.totalOrders * 0.918)
//         : undefined, // 8.2% less for demo
//       icon: <ShoppingCart className="text-primary-600" />,
//     },
//     {
//       title: "Total Customers",
//       value: overview?.realTimeStats?.totalCustomers || 0,
//       prevalue: overview?.realTimeStats?.totalCustomers
//         ? Math.round(overview.realTimeStats.totalCustomers * 0.943)
//         : undefined, // 5.7% less for demo
//       icon: <People className="text-primary-600" />,
//     },
//     {
//       title: "Active Products",
//       value: overview?.realTimeStats?.totalProducts || 0,
//       prevalue: overview?.realTimeStats?.totalProducts
//         ? Math.round(overview.realTimeStats.totalProducts * 0.966)
//         : undefined, // 3.4% less for demo
//       icon: <TrendingUp className="text-primary-600" />,
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//       {metrics.map((metric, index) => (
//         <MetricCard
//           key={index}
//           title={metric.title}
//           value={metric.value}
//           prevalue={metric.prevalue}
//           icon={metric.icon}
//         />
//       ))}
//     </div>
//   );
// };

// // Revenue Overview Chart Component
// const RevenueOverviewChart = () => {
//   const [dateRange, setDateRange] = useState(getDefaultDateRange());

//   const handleDateChange = (
//     dateRange: { startDate: string; endDate: string } | null
//   ) => {
//     if (dateRange) {
//       setDateRange(dateRange);
//     }
//   };

//   const { data: ordersStatusData, isLoading } = useGetOrdersStatusQuery(
//     {
//       fromDate: dateRange.startDate,
//       toDate: dateRange.endDate,
//     },
//     { skip: !dateRange.startDate }
//   );

//   const chartData = useMemo(() => {
//     if (!ordersStatusData?.data) return [];

//     return ordersStatusData.data.map((item: any) => ({
//       date: new Date(item.day).toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//       }),
//       revenue: item.completed_revenue || 0,
//       orders: item.total_orders || 0,
//     }));
//   }, [ordersStatusData]);

//   if (isLoading) {
//     return (
//       <div className="bg-primary-0 rounded-xl shadow-sm p-6 border border-primary-100 lg:col-span-2">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-lg font-semibold text-primary-900">
//             Revenue & Orders Overview
//           </h3>
//           <DateRangeSelector onChange={handleDateChange} />
//         </div>
//         <div className="h-80 flex items-center justify-center">
//           <div className="text-primary-500">Loading revenue data...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-primary-0 rounded-xl shadow-sm p-6 border border-primary-100 lg:col-span-2">
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-lg font-semibold text-primary-900">
//           Revenue & Orders Overview
//         </h3>
//         <DateRangeSelector onChange={handleDateChange} />
//       </div>
//       <div className="h-80">
//         <ResponsiveContainer width="100%" height="100%">
//           <AreaChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Area
//               type="monotone"
//               dataKey="revenue"
//               stroke="#8B5CF6"
//               fill="#8B5CF6"
//               fillOpacity={0.1}
//               name="Revenue ($)"
//             />
//             <Line
//               type="monotone"
//               dataKey="orders"
//               stroke="#3B82F6"
//               strokeWidth={2}
//               name="Orders"
//               dot={{ fill: "#3B82F6" }}
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// // Order Status Chart Component
// const OrderStatusChart = () => {
//   const [dateRange, setDateRange] = useState(getDefaultDateRange());

//   const handleDateChange = (
//     dateRange: { startDate: string; endDate: string } | null
//   ) => {
//     if (dateRange) {
//       setDateRange(dateRange);
//     }
//   };

//   const { data: ordersStatusData, isLoading } = useGetOrdersStatusQuery(
//     {
//       fromDate: dateRange.startDate,
//       toDate: dateRange.endDate,
//     },
//     { skip: !dateRange.startDate }
//   );

//   const pieData = useMemo(() => {
//     if (!ordersStatusData?.data) return [];

//     const lastData = ordersStatusData.data[ordersStatusData.data.length - 1];
//     if (!lastData) return [];

//     return [
//       {
//         status: "Completed",
//         count: lastData.completed_orders || 0,
//         color: "#10B981",
//       },
//       {
//         status: "Pending",
//         count: lastData.pending_orders || 0,
//         color: "#F59E0B",
//       },
//       {
//         status: "Confirmed",
//         count: lastData.confirmed_orders || 0,
//         color: "#3B82F6",
//       },
//       {
//         status: "Canceled",
//         count: lastData.canceled_orders || 0,
//         color: "#EF4444",
//       },
//       {
//         status: "Refunded",
//         count: lastData.refunded_orders || 0,
//         color: "#6B7280",
//       },
//     ].filter((item) => item.count > 0);
//   }, [ordersStatusData]);

//   if (isLoading) {
//     return (
//       <div className="bg-primary-0 rounded-xl shadow-sm p-6 border border-primary-100">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-lg font-semibold text-primary-900">
//             Order Status Distribution
//           </h3>
//           <DateRangeSelector onChange={handleDateChange} />
//         </div>
//         <div className="h-80 flex items-center justify-center">
//           <div className="text-primary-500">Loading order status...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-primary-0 rounded-xl shadow-sm p-6 border border-primary-100">
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-lg font-semibold text-primary-900">
//           Order Status Distribution
//         </h3>
//         <DateRangeSelector onChange={handleDateChange} />
//       </div>
//       <div className="h-80">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={pieData}
//               cx="50%"
//               cy="50%"
//               innerRadius={60}
//               outerRadius={100}
//               paddingAngle={2}
//               dataKey="count"
//               label={({ status, count }) => `${status}: ${count}`}
//             >
//               {pieData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={entry.color} />
//               ))}
//             </Pie>
//             <Tooltip formatter={(value, name) => [value, name]} />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// // Customer Growth Chart Component
// const CustomerGrowthChart = () => {
//   const [dateRange, setDateRange] = useState(getDefaultDateRange());

//   const handleDateChange = (
//     dateRange: { startDate: string; endDate: string } | null
//   ) => {
//     if (dateRange) {
//       setDateRange(dateRange);
//     }
//   };

//   const { data: newCustomersData, isLoading } = useGetNewCustomersQuery(
//     {
//       fromDate: dateRange.startDate,
//       toDate: dateRange.endDate,
//     },
//     { skip: !dateRange.startDate }
//   );

//   const chartData = useMemo(() => {
//     if (!newCustomersData?.data) return [];

//     return newCustomersData.data.map((item: any) => ({
//       month: item.month,
//       customers: item.new_customers || 0,
//     }));
//   }, [newCustomersData]);

//   if (isLoading) {
//     return (
//       <div className="bg-primary-0 rounded-xl shadow-sm p-6 border border-primary-100">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-lg font-semibold text-primary-900">
//             Customer Growth
//           </h3>
//           <DateRangeSelector type="year" onChange={handleDateChange} />
//         </div>
//         <div className="h-80 flex items-center justify-center">
//           <div className="text-primary-500">Loading customer data...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-primary-0 rounded-xl shadow-sm p-6 border border-primary-100">
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-lg font-semibold text-primary-900">
//           Customer Growth
//         </h3>
//         <DateRangeSelector type="year" onChange={handleDateChange} />
//       </div>
//       <div className="h-80">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Bar
//               dataKey="customers"
//               radius={[4, 4, 0, 0]}
//               fill="#8B5CF6"
//               name="New Customers"
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// // Charts Grid Component
// const ChartsGrid = () => (
//   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//     <RevenueOverviewChart />
//     <OrderStatusChart />
//     <CustomerGrowthChart />
//   </div>
// );

// // Main Dashboard Component
// const OverviewPage = () => {
//   return (
//     <div className="min-h-screen bg-primary-50 p-6">
//       <DashboardHeader />
//       <MetricsGrid />
//       <ChartsGrid />
//     </div>
//   );
// };

// export default OverviewPage;

"use client";

import React from "react";

import MetricsGrid from "@/app/components/admin/dashboard/overview/MetricsGrid";
import ChartsGrid from "@/app/components/admin/dashboard/overview/ChartsGrid";
const DashboardHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Overview</h1>
          <p className="text-primary-600 mt-2">
            Monitor your store performance and customer insights
          </p>
        </div>
      </div>
    </div>
  );
};

const OverviewPage = () => {
  return (
    <div className="min-h-screen bg-primary-50 p-6">
      <DashboardHeader />
      <MetricsGrid />
      <ChartsGrid />
    </div>
  );
};

export default OverviewPage;
