// "use client";
// import React, { useEffect, useState, useMemo, useCallback } from "react";

// import GenericAreaChart from "@/app/components/admin/dashboard/charts/GenericAreachart";
// import { useGetAnalyticsQuery } from "@lib/admin/store/services/dashboard/analytics.service";
// import DateWrapper from "@/app/components/admin/dashboard/elements/DateWrapper";

// const colors = ["#8884d8", "#82ca9d", "#ffc658"];

// const OrdersOverMonths = () => {
//   const [dateRange, setDateRange] = useState<any>({
//     startDate: "",
//     endDate: "",
//   });
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [newOrders, setNewOrders] = useState<any>([]);
//   const { data: newOrdersData } = useGetAnalyticsQuery(
//     {
//       type: "newOrders",
//       fromDate: dateRange?.startDate,
//       toDate: dateRange?.endDate,
//     },
//     { skip: !dateRange?.startDate }
//   );

//   const onTableDateRangeChange = useCallback(
//     (value: any) => {
//       setDateRange(value);
//     },
//     [dateRange]
//   );
//   console.log("newOrdersData", newOrdersData?.data);
//   useEffect(() => {
//     let newOrders = (newOrdersData as any)?.data;
//     if (newOrders?.length >= 0) {
//       setNewOrders([
//         ...newOrders.map((data: any) => {
//           return {
//             category: data.month,
//             Orders: data.new_orders ?? 0,
//           };
//         }),
//       ]);
//     }
//   }, [newOrdersData]);

//   return (
//     <>
//       <div className="bg-primary-0 text-primary-900  p-8 mx-auto rounded-lg shadow-sm w-full max-w-5xl">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-2xl font-bold text-primary-900">New Orders</h2>
//           <div className="ml-auto">
//             <DateWrapper
//               type="year"
//               onTableDateRangeChange={onTableDateRangeChange}
//             />
//           </div>
//         </div>

//         <div className="flex flex-col gap-4">
//           <GenericAreaChart data={newOrders} height={400} smooth grid />
//         </div>
//       </div>
//     </>
//   );
// };

// export default OrdersOverMonths;

"use client";

import React, { useState, useCallback, useMemo } from "react";
import GenericAreaChart from "@/app/components/admin/dashboard/charts/GenericAreachart";
import { useGetAnalyticsQuery } from "@/lib/admin/store/services/dashboard/analytics.service";
import DateRangeSelector from "@/app/components/admin/ui/mui/DateRange";

const OrdersOverMonths = () => {
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  const { data: newOrdersData, isLoading } = useGetAnalyticsQuery(
    {
      type: "newOrders",
      fromDate: dateRange.startDate,
      toDate: dateRange.endDate,
    },
    { skip: !dateRange.startDate }
  );

  const handleDateChange = useCallback(
    (value: { startDate: string; endDate: string } | null) => {
      if (value) {
        setDateRange(value);
      }
    },
    []
  );

  const chartData = useMemo(() => {
    return (
      newOrdersData?.data?.map((data: any) => ({
        category: data.month,
        Orders: data.new_orders ?? 0,
      })) || []
    );
  }, [newOrdersData]);

  if (isLoading) {
    return (
      <div className="bg-primary-0 rounded-xl shadow-sm p-6 border border-primary-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-primary-900">New Orders</h3>
          <DateRangeSelector type="year" onChange={handleDateChange} />
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="text-primary-500">Loading order data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary-0 rounded-xl shadow-sm p-6 border border-primary-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-primary-900">New Orders</h3>
        <DateRangeSelector type="year" onChange={handleDateChange} />
      </div>
      <div className="h-80">
        <GenericAreaChart data={chartData} height={320} smooth grid />
      </div>
    </div>
  );
};

export default OrdersOverMonths;
