import { NextRequest, NextResponse } from "next/server";
import { fetchUsers } from "@lib/services/prismaServices";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  // Map the parameters you need
  const query = Object.fromEntries(searchParams);
  const users = await fetchUsers({
    ...query,
    pagination: {
      page: Number(query?.page ?? 1),
      pageSize: Number(query?.limit ?? 1),
    },
  });
  return NextResponse.json({ data: users });
}
