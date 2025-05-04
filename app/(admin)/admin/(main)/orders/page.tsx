import OrderPage from "@/app/components/admin/Order/OrderPage";

import { Metadata } from "next";
import { getUserResources } from "@lib/dal";
import { PERMISSIONS } from "@/lib/admin/configs/permissions";
import { redirect } from "next/navigation";
import { hasPermission } from "@/lib/admin/utils/permissions";
export const metadata: Metadata = {
  title: "orders",
};

export default async function Page() {
  const resources = await getUserResources();

  if (hasPermission(PERMISSIONS.VIEW_ORDERS, resources ?? [])) {
    return <OrderPage />;
  } else {
    redirect("/admin/profile");
  }
}
