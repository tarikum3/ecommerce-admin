import CustomerPage from "@/app/components/admin/Customer/CustomerPage";
import { hasPermission } from "@/lib/admin/utils/permissions";
import { getUserResources } from "@lib/dal";
import { PERMISSIONS } from "@/lib/admin/configs/permissions";
import { redirect } from "next/navigation";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Customers",
};

export default async function Page() {
  const resources = await getUserResources();

  if (hasPermission(PERMISSIONS.VIEW_CUSTOMERS, resources ?? [])) {
    return <CustomerPage />;
  } else {
    redirect("/admin/profile");
  }
}
