import RolePage from "@/app/components/admin/Role/RolePage";
//import RolePage from "@/app/components/admin/Role/CreateRole";
import { Metadata } from "next";
import { getUserResources } from "@lib/dal";
import { PERMISSIONS } from "@/lib/admin/configs/permissions";
import { redirect, RedirectType } from "next/navigation";
import { hasPermission } from "@/lib/admin/utils/permissions";
export const metadata: Metadata = {
  title: "Roles",
};

export default async function Page() {
  const resources = await getUserResources();

  if (hasPermission(PERMISSIONS.MANAGE_USER_ROLES, resources ?? [])) {
    return <RolePage />;
  } else {
    redirect("/admin/profile");
  }
}
