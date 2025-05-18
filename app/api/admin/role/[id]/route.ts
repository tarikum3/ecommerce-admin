import { NextRequest, NextResponse } from "next/server";
import { updateRole, getRoleById } from "@lib/services/prismaServices";
import { auth } from "@/auth";
import { getUserResources } from "@lib/dal";
import { hasPermission } from "@/lib/admin/utils/permissions";
import { PERMISSIONS } from "@/lib/admin/configs/permissions";
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // const session = await auth();
  // console.log("sessionauthfromrole", session);
  // if (!session) {
  //   return NextResponse.json({ message: "Unauthorized" });
  // }
  const resources = await getUserResources();

  if (!hasPermission(PERMISSIONS.MANAGE_USER_ROLES, resources ?? [])) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 500 });
  }
  const { id } = await params;

  const role = await getRoleById(id);
  return NextResponse.json({ data: { role } });
}

export async function PUT(req: NextRequest) {
  const reqData = await req.json();
  const sole = await updateRole(reqData.id, reqData);

  return NextResponse.json({ data: sole });
}

//export async function DELETE(req: NextRequest) {}
