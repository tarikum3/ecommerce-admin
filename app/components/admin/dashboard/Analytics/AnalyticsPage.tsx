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

"use client";

import React from "react";

import CustomersOverMonths from "@/app/components/admin/dashboard/overview/CustomersOverMonths";
import OrderStatusSummary from "@/app/components/admin/dashboard/overview/OrderStatusSummary";
import OrdersOverMonths from "@/app/components/admin/dashboard/overview/OrdersOverMonths";
// Header Component
const AnalyticsHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">
            Advanced Analytics
          </h1>
          <p className="text-primary-600 mt-2">
            Deep insights into customer behavior and order patterns
          </p>
        </div>
      </div>
    </div>
  );
};

// Main Analytics Component
const AnalyticsPage = () => {
  return (
    <div className="min-h-screen bg-primary-50 p-6">
      <AnalyticsHeader />

      {/* Analytics Charts Grid */}
      <div className="space-y-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CustomersOverMonths />
          <OrdersOverMonths />
        </div>

        <OrderStatusSummary />
      </div>
    </div>
  );
};

export default AnalyticsPage;
