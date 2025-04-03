import { NextRequest, NextResponse } from "next/server";
import { fetchRoles } from "@lib/services/prismaServices";
import { auth } from "@/auth";
export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" });
  }
  if (!session.user.id) {
    return NextResponse.json({ message: "No user id" });
  }
  const searchParams = req.nextUrl.searchParams;
  const query = Object.fromEntries(searchParams);
  const roles = await fetchRoles(query);
  // const roles = await fetchUserResources();
  return NextResponse.json({ data: roles });
}
