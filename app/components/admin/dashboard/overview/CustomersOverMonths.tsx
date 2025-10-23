// "use client";
// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import GenericAreaChart from "@/app/components/admin/dashboard/charts/GenericAreachart";
// import { useGetAnalyticsQuery } from "@lib/admin/store/services/dashboard/analytics.service";

// import DateRangeSelector from "@/app/components/admin/ui/mui/DateRange";
// const CustomersOverMonths = () => {
//   const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
//   const { data: newCustomersData, isLoading } = useGetAnalyticsQuery(
//     {
//       type: "newCustomers",
//       fromDate: dateRange.startDate,
//       toDate: dateRange.endDate,
//     },
//     { skip: !dateRange.startDate }
//   );

//   const onTableDateRangeChange = useCallback(
//     (value: { startDate: string; endDate: string }) => {
//       setDateRange(value);
//     },
//     []
//   );
//   console.log("newCustomersData", newCustomersData);
//   const newCustomers = useMemo(() => {
//     return (
//       newCustomersData?.data
//         // [
//         //   { month: "feb", new_customers: 5 },
//         //   { month: "mar", new_customers: 4 },
//         //   { month: "apr", new_customers: 4 },
//         //   { month: "mars", new_customers: 5 },
//         //   { month: "aprs", new_customers: 8 },
//         //   { month: "mar", new_customers: 4 },
//         //   { month: "aprdd", new_customers: 4 },
//         // ]
//         // || [
//         //   { month: "feb", new_customers: 5 },
//         //   { month: "mar", new_customers: 4 },
//         //   { month: "apr", new_customers: 4 },
//         // ]
//         ?.map((data: any) => ({
//           category: data.month,
//           Customers: data.new_customers ?? 0,
//         }))
//     );
//   }, [newCustomersData]);

//   return (
//     <div className="bg-primary-0 text-primary-900  p-8 mx-auto rounded-lg shadow-sm w-full max-w-5xl">
//       <div className="flex justify-between items-center mb-12">
//         <h2 className="text-2xl font-bold text-primary-900">
//           New Customers Over Months
//         </h2>
//         <div className="ml-auto">
//           {/* <DateWrapper
//             type="year"
//             onTableDateRangeChange={onTableDateRangeChange}
//           /> */}
//           <DateRangeSelector type="year" onChange={onTableDateRangeChange} />
//         </div>
//       </div>

//       {/* Chart Section */}
//       <div className="flex flex-col gap-4 h-64  w-full max-w-5xl p-1">
//         {!isLoading && newCustomers && (
//           <GenericAreaChart data={newCustomers} height={250} smooth grid />
//         )}
//       </div>

//       {/* Loading State */}
//       {/* {isLoading && (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default CustomersOverMonths;

"use client";

import React, { useState, useCallback, useMemo } from "react";
import GenericAreaChart from "@/app/components/admin/dashboard/charts/GenericAreachart";
import { useGetAnalyticsQuery } from "@/lib/admin/store/services/dashboard/analytics.service";
import DateRangeSelector from "@/app/components/admin/ui/mui/DateRange";

const CustomersOverMonths = () => {
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  const { data: newCustomersData, isLoading } = useGetAnalyticsQuery(
    {
      type: "newCustomers",
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
      newCustomersData?.data?.map((data: any) => ({
        category: data.month,
        Customers: data.new_customers ?? 0,
      })) || []
    );
  }, [newCustomersData]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-primary-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-primary-900">
            New Customers Over Months
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
    <div className="bg-white rounded-xl shadow-sm p-6 border border-primary-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-primary-900">
          New Customers Over Months
        </h3>
        <DateRangeSelector type="year" onChange={handleDateChange} />
      </div>
      <div className="h-80">
        <GenericAreaChart data={chartData} height={320} smooth grid />
      </div>
    </div>
  );
};

export default CustomersOverMonths;
