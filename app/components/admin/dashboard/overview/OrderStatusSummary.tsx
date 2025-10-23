// "use client";
// import React, { useEffect, useState, useCallback } from "react";
// import Card from "@/app/components/admin/dashboard/elements/Card";
// import { useGetAnalyticsQuery } from "@lib/admin/store/services/dashboard/analytics.service";
// import DateWrapper from "@/app/components/admin/dashboard/elements/DateWrapper";

// interface OrdersStatus {
//   totalorders: number;
//   pending: number;
//   confirmed: number;
//   completed: number;
//   canceled: number;
//   refunded: number;
// }

// interface DateRange {
//   startDate: string;
//   endDate: string;
// }

// const OrdersStatusSummary = () => {
//   const [dateRange, setDateRange] = useState<DateRange>({
//     startDate: "",
//     endDate: "",
//   });

//   const [ordersStatus, setOrdersStatus] = useState<OrdersStatus>({
//     totalorders: 0,
//     pending: 0,
//     confirmed: 0,
//     completed: 0,
//     canceled: 0,
//     refunded: 0,
//   });

//   const { data: OrdersStatusData, error } = useGetAnalyticsQuery(
//     {
//       type: "OrdersStatus",
//       fromDate: dateRange.startDate,
//       toDate: dateRange.endDate,
//     },
//     { skip: !dateRange.startDate }
//   );

//   const onTableDateRangeChange = useCallback((value: DateRange) => {
//     setDateRange(value);
//   }, []);

//   useEffect(() => {
//     if (OrdersStatusData?.data) {
//       const OrdersStatus = OrdersStatusData.data;
//       setOrdersStatus({
//         totalorders: OrdersStatus.totalorders,
//         pending: OrdersStatus.pending,
//         confirmed: OrdersStatus.confirmed,
//         completed: OrdersStatus.completed,
//         canceled: OrdersStatus.canceled,
//         refunded: OrdersStatus.refunded,
//       });
//     }
//   }, [OrdersStatusData]);

//   // <div className="w-full mt-6  grid grid-cols-2 gap-3 justify-items-center   sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 p-2">
//   return (
//     <div className="bg-primary-0 text-primary-900  p-8 mx-auto rounded-lg shadow-sm w-full max-w-5xl">
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-2xl font-bold text-primary-900">
//           Orders Status Summary
//         </h2>
//         <div className="ml-auto">
//           <DateWrapper
//             type="year"
//             onTableDateRangeChange={onTableDateRangeChange}
//           />
//         </div>
//       </div>

//       <div className="w-full mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 p-4">
//         <Card
//           title="Total Orders"
//           value={ordersStatus.totalorders}
//           total={ordersStatus.totalorders}
//           barColor="var(--primary-500)"
//           trend="rise"
//         />
//         <Card
//           title="Pending"
//           value={ordersStatus.pending}
//           total={ordersStatus.totalorders}
//           // value={4}
//           // total={10}
//           barColor="var(--primary-400)"
//           trend="decline"
//         />
//         <Card
//           title="Confirmed"
//           value={ordersStatus.confirmed}
//           total={ordersStatus.totalorders}
//           barColor="var(--primary-600)"
//           trend="rise"
//         />
//         <Card
//           title="Completed"
//           value={ordersStatus.completed}
//           total={ordersStatus.totalorders}
//           barColor="var(--primary-700)"
//           trend="rise"
//         />
//         <Card
//           title="Canceled"
//           value={ordersStatus.canceled}
//           total={ordersStatus.totalorders}
//           barColor="var(--primary-800)"
//           trend="decline"
//         />
//         <Card
//           title="Refunded"
//           value={ordersStatus.refunded}
//           total={ordersStatus.totalorders}
//           barColor="var(--primary-900)"
//           trend="decline"
//         />
//       </div>
//     </div>
//   );
// };

// export default OrdersStatusSummary;

"use client";

import React, { useState, useCallback, useEffect } from "react";
import Card from "@/app/components/admin/dashboard/elements/Card";
import { useGetAnalyticsQuery } from "@/lib/admin/store/services/dashboard/analytics.service";
import DateRangeSelector from "@/app/components/admin/ui/mui/DateRange";

interface OrdersStatus {
  totalorders: number;
  pending: number;
  confirmed: number;
  completed: number;
  canceled: number;
  refunded: number;
}

const OrdersStatusSummary = () => {
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [ordersStatus, setOrdersStatus] = useState<OrdersStatus>({
    totalorders: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    canceled: 0,
    refunded: 0,
  });

  const { data: OrdersStatusData, isLoading } = useGetAnalyticsQuery(
    {
      type: "OrdersStatus",
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

  useEffect(() => {
    if (OrdersStatusData?.data) {
      const OrdersStatus = OrdersStatusData.data;
      setOrdersStatus({
        totalorders: OrdersStatus.totalorders,
        pending: OrdersStatus.pending,
        confirmed: OrdersStatus.confirmed,
        completed: OrdersStatus.completed,
        canceled: OrdersStatus.canceled,
        refunded: OrdersStatus.refunded,
      });
    }
  }, [OrdersStatusData]);

  if (isLoading) {
    return (
      <div className="bg-primary-0 rounded-xl shadow-sm p-6 border border-primary-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-primary-900">
            Orders Status Summary
          </h3>
          <DateRangeSelector onChange={handleDateChange} />
        </div>
        <div className="h-40 flex items-center justify-center">
          <div className="text-primary-500">Loading order status...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary-0 rounded-xl shadow-sm p-6 border border-primary-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-primary-900">
          Orders Status Summary
        </h3>
        <DateRangeSelector onChange={handleDateChange} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card
          title="Total Orders"
          value={ordersStatus.totalorders}
          total={ordersStatus.totalorders}
          barColor="var(--primary-500)"
          trend="rise"
        />
        <Card
          title="Pending"
          value={ordersStatus.pending}
          total={ordersStatus.totalorders}
          barColor="var(--primary-400)"
          trend="decline"
        />
        <Card
          title="Confirmed"
          value={ordersStatus.confirmed}
          total={ordersStatus.totalorders}
          barColor="var(--primary-600)"
          trend="rise"
        />
        <Card
          title="Completed"
          value={ordersStatus.completed}
          total={ordersStatus.totalorders}
          barColor="var(--primary-700)"
          trend="rise"
        />
        <Card
          title="Canceled"
          value={ordersStatus.canceled}
          total={ordersStatus.totalorders}
          barColor="var(--primary-800)"
          trend="decline"
        />
        <Card
          title="Refunded"
          value={ordersStatus.refunded}
          total={ordersStatus.totalorders}
          barColor="var(--primary-900)"
          trend="decline"
        />
      </div>
    </div>
  );
};

export default OrdersStatusSummary;
