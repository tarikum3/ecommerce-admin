import OverViewPage from "@/app/components/admin/dashboard/overview/OverViewPage";
import { Metadata } from "next";
import { getUserResources } from "@lib/dal";
import { PERMISSIONS } from "@/lib/admin/configs/permissions";
import { redirect, RedirectType } from "next/navigation";
import { hasPermission } from "@/lib/admin/utils/permissions";
export const metadata: Metadata = {
  title: "Overview",
};

export default async function Page() {
  const resources = await getUserResources();

  if (hasPermission(PERMISSIONS.VIEW_DASHBOARD, resources ?? [])) {
    return <OverViewPage />;
  } else {
    redirect("/admin/profile");
  }
}
