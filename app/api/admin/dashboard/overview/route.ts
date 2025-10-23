// import { NextRequest, NextResponse } from "next/server";
// import {
//   fetchOrders,
//   getDailyNewCustomers,
//   getMonthlyNewCustomers,
//   getMonthlyNewOrders,
//   getOrdersStatusSummary,
// } from "@lib/services/prismaServices";

// export async function GET(req: NextRequest) {
//   const searchParams = req.nextUrl.searchParams;
//   // Map the parameters you need
//   const { type, fromDate, toDate } = Object.fromEntries(searchParams);
//   if (type == "newCustomers") {
//     const monthlyCustomers = await getMonthlyNewCustomers(fromDate, toDate);
//     return NextResponse.json({ data: monthlyCustomers });
//   }
//   if (type == "newOrders") {
//     const monthlyOrders = await getMonthlyNewOrders(fromDate, toDate);
//     return NextResponse.json({ data: monthlyOrders });
//   }
//   if (type == "OrdersStatus") {
//     const OrdersStatus = await getOrdersStatusSummary(fromDate, toDate);
//     return NextResponse.json({ data: OrdersStatus });
//   }
//   return NextResponse.json({ data: "not correct type" });
// }

import { NextRequest, NextResponse } from "next/server";
import {
  getDashboardOverview,
  getRecentOrders,
  getTopProducts,
} from "@lib/services/prismaServices";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const { type, limit } = Object.fromEntries(searchParams);

  try {
    if (type === "recentOrders") {
      const recentOrders = await getRecentOrders(parseInt(limit || "10"));
      return NextResponse.json({ data: recentOrders });
    }

    if (type === "topProducts") {
      const topProducts = await getTopProducts(parseInt(limit || "10"));
      return NextResponse.json({ data: topProducts });
    }

    if (type === "overview") {
      const overview = await getDashboardOverview();
      return NextResponse.json({ data: overview });
    }

    return NextResponse.json(
      { error: "Invalid type parameter" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Dashboard overview error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard overview" },
      { status: 500 }
    );
  }
}
