import { NextRequest, NextResponse } from "next/server";
import {
  createRole,
  fetchRoles,
  updateRole,
  createNotificationForAllUsers,
  NotificationType,
} from "@lib/services/prismaServices";
import { auth } from "@/auth";
export async function GET(req: NextRequest) {
  const session = await auth();
  console.log("sessionauthfromrole", session);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" });
  }
  const searchParams = req.nextUrl.searchParams;
  const query = Object.fromEntries(searchParams);
  //const roles = await fetchRoles(query);
  const roles = await fetchRoles();
  return NextResponse.json({ data: roles });
}

export async function POST(req: NextRequest) {
  const reqData = await req.json();
  const role = await createRole(reqData);
  createNotificationForAllUsers({ type: NotificationType.NEW_PRODUCT });
  return NextResponse.json({ role });
}

export async function PUT(req: NextRequest) {
  const reqData = await req.json();
  const role = await updateRole(reqData.id, reqData);
  return NextResponse.json({ role });
}

//export async function DELETE(req: NextRequest) {}
