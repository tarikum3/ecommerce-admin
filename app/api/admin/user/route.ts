import { NextRequest, NextResponse } from "next/server";
import { fetchUsers } from "@lib/services/prismaServices";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  // Map the parameters you need
  const query = Object.fromEntries(searchParams);
  const users = await fetchUsers(query);
  return NextResponse.json({ data: users });
}
