import { NextRequest, NextResponse } from "next/server";
import { getUser, checkmain } from "@lib/services/prismaServices";
import { auth } from "@/auth";
export async function GET(req: NextRequest) {
  // await checkmain(
  //   "20250422125503_20250422125103_user_role_againn",
  //   "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  // );
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" });
  }
  const user = await getUser({ id: session.user.id as any });
  return NextResponse.json({ data: user });
}
