import { NextRequest, NextResponse } from "next/server";
import { updateRole } from "@lib/services/prismaServices";
import { auth } from "@/auth";

export async function PUT(req: NextRequest) {
  const reqData = await req.json();
  const sole = await updateRole(reqData.id, reqData);

  return NextResponse.json({ data: sole });
}

//export async function DELETE(req: NextRequest) {}
