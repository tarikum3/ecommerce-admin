// import { NextRequest, NextResponse } from "next/server";
// import {
//  getCustomerStatusSummary,getMonthlySalesRevenue
// } from "@lib/services/prismaServices";

// export async function GET(req: NextRequest) {
//   const searchParams = req.nextUrl.searchParams;
//   // Map the parameters you need
//   const { type, fromDate, toDate } = Object.fromEntries(searchParams);
//   if (type == "CustomersAnalytics") {
//     const customersAnalytics = await getCustomerStatusSummary(fromDate, toDate);
//     return NextResponse.json({ data: customersAnalytics });
//   }
//   if (type == "MonthlySalesRevenue") {
//     const monthlySalesRevenue = await getMonthlySalesRevenue(fromDate, toDate);
//     return NextResponse.json({ data: monthlySalesRevenue });
//   }

//   return NextResponse.json({ data: "not correct type" });
// }

import { NextRequest, NextResponse } from "next/server";
import {
  fetchOrders,
  getDailyNewCustomers,
  getMonthlyNewCustomers,
  getMonthlyNewOrders,
  getOrdersStatusSummary,
} from "@lib/services/prismaServices";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  // Map the parameters you need
  const { type, fromDate, toDate } = Object.fromEntries(searchParams);
  if (type == "newCustomers") {
    const monthlyCustomers = await getMonthlyNewCustomers(fromDate, toDate);
    return NextResponse.json({ data: monthlyCustomers });
  }
  if (type == "newOrders") {
    const monthlyOrders = await getMonthlyNewOrders(fromDate, toDate);
    return NextResponse.json({ data: monthlyOrders });
  }
  if (type == "OrdersStatus") {
    const OrdersStatus = await getOrdersStatusSummary(fromDate, toDate);
    return NextResponse.json({ data: OrdersStatus });
  }
  return NextResponse.json({ data: "not correct type" });
}
