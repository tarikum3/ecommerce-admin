"use client";

import React, { Suspense } from "react";

import CustomersOverMonths from "@/app/components/admin/dashboard/overview/CustomersOverMonths";
import OrderStatusSummary from "@/app/components/admin/dashboard/overview/OrderStatusSummary";
import OrdersOverMonths from "@/app/components/admin/dashboard/overview/OrdersOverMonths";

export default function Overview() {
  return (
    <div className="gap-10 text-primary p-1 border border-primary-900">
      <CustomersOverMonths />
      <OrdersOverMonths />
      {/* <Suspense>
        <CustomersOverMonths />
      </Suspense> */}
      {/* <Suspense>
        <OrderStatusSummary />
      </Suspense> */}
      {/* <Suspense>
        <OrdersOverMonths />
      </Suspense> */}
    </div>
  );
}
