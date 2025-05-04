import AnalyticsPage from "@/app/components/admin/dashboard/Analytics/AnalyticsPage";
import { Metadata } from "next";
import { getUserResources } from "@lib/dal";
import { PERMISSIONS } from "@/lib/admin/configs/permissions";
import { redirect, RedirectType } from "next/navigation";
import { hasPermission } from "@/lib/admin/utils/permissions";
export const metadata: Metadata = {
  title: "Analytics",
};

export default async function Page() {
  const resources = await getUserResources();

  if (hasPermission(PERMISSIONS.VIEW_ANALYTICS, resources ?? [])) {
    return <AnalyticsPage />;
  } else {
    redirect("/admin/profile");
  }
  // return (
  //   <>
  //     <AnalyticsPage />
  //   </>
  // );
}
