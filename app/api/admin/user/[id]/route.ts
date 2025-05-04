import { NextRequest, NextResponse } from "next/server";
import { updateUser, getUserById } from "@lib/services/prismaServices";
import { auth } from "@/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // const session = await auth();
  // console.log("sessionauthfromuser", session);
  // if (!session) {
  //   return NextResponse.json({ message: "Unauthorized" });
  // }
  const { id } = await params; // 'a', 'b', or 'c'

  const user = await getUserById(id);
  return NextResponse.json({ data: { user } });
}

export async function PUT(req: NextRequest) {
  const reqData = await req.json();
  const sole = await updateUser(reqData.id, reqData);

  return NextResponse.json({ data: sole });
}

//export async function DELETE(req: NextRequest) {}
