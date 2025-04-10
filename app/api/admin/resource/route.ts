import { NextRequest, NextResponse } from "next/server";
import { fetchResources } from "@lib/services/prismaServices";
import { auth } from "@/auth";
export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" });
  }
  if (!session.user.id) {
    return NextResponse.json({ message: "No user id" });
  }
  //const searchParams = req.nextUrl.searchParams;
  //const query = Object.fromEntries(searchParams);
  const resources = await fetchResources();
  // const resources = await fetchUserResources();
  return NextResponse.json({ data: resources });
}
