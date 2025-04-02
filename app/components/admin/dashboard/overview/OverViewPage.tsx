"use client";

import React, { Suspense } from "react";

import CustomersOverMonths from "@/app/components/admin/dashboard/overview/CustomersOverMonths";
import OrderStatusSummary from "@/app/components/admin/dashboard/overview/OrderStatusSummary";
import OrdersOverMonths from "@/app/components/admin/dashboard/overview/OrdersOverMonths";

export default function Overview() {
  return (
    <div className="flex flex-col gap-10 text-primary ">
      {/* Wrap CustomersOverMonths in Suspense with a fallback */}
      <Suspense>
        <CustomersOverMonths />
      </Suspense>
      <Suspense>
        <OrderStatusSummary />
      </Suspense>
      <Suspense>
        <OrdersOverMonths />
      </Suspense>
    </div>
  );
}
