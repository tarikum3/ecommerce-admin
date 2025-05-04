import UserPage from "@/app/components/admin/user/UserPage";

import { Metadata } from "next";
import { getUserResources } from "@lib/dal";
import { PERMISSIONS } from "@/lib/admin/configs/permissions";
import { redirect, RedirectType } from "next/navigation";
import { hasPermission } from "@/lib/admin/utils/permissions";
export const metadata: Metadata = {
  title: "Users",
};

export default async function Page() {
  const resources = await getUserResources();

  if (hasPermission(PERMISSIONS.READ_USER, resources ?? [])) {
    return <UserPage />;
  } else {
    redirect("/admin/profile");
  }
}
