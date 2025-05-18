import { NextRequest, NextResponse } from "next/server";
import {
  getUserNotifications,
  updateUserNotificationsStatus,
} from "@lib/services/prismaServices";
import { auth } from "@/auth";
const notificationss = [
  {
    id: "1",
    title: "New Product Launch",
    description: "Check out our latest product!",
    time: "2023-10-01T12:34:56Z",
    type: "NEW_PRODUCT",
    status: "PENDING",
    // No link provided, will default to `/products/1`
  },
  {
    id: "2",
    title: "Welcome New User",
    description: "Welcome to our platform!",
    time: "2023-10-01T10:00:00Z",
    type: "NEW_USER",
    status: "VIEWED",
    link: "/users/123", // Provided link
  },
  {
    id: "3",
    title: "Stock Out Alert",
    description: "Product XYZ is out of stock.",
    time: "2023-10-01T09:15:00Z",
    type: "STOCK_OUT",
    status: "OPENED",
    // No link provided, will default to `/stock/3`
  },
];
export async function GET(req: NextRequest) {
  const session = await auth();

  // if (!session?.user.id) {
  //   return NextResponse.json({ message: "Unauthorized" }, { status: 500 });
  // }
  const searchParams = req.nextUrl.searchParams;
  // Map the parameters you need
  const query = Object.fromEntries(searchParams);
  // const notifications = await getUserNotifications(session.user.id, query);
  const notificationssample = {
    notifications: notificationss,
    total: 100,
    pendingCount: 7,
    page: query.page,
    limit: query.limit,
  };
  return NextResponse.json({ data: notificationssample });
}
export async function PUT(req: NextRequest) {
  const session = await auth();

  if (!session?.user.id) {
    return NextResponse.json({ message: "Unauthorized" });
  }
  const reqData = await req.json();
  const Notifications = await updateUserNotificationsStatus(
    session.user.id,
    reqData
  );

  return NextResponse.json({ data: Notifications });
}
//export async function DELETE(req: NextRequest) {}
