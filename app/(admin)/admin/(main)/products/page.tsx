import ProductPage from "@/app/components/admin/Product/ProductPage";

import { Metadata } from "next";
import { getUserResources } from "@lib/dal";
import { PERMISSIONS } from "@/lib/admin/configs/permissions";
import { redirect, RedirectType } from "next/navigation";
import { hasPermission } from "@/lib/admin/utils/permissions";
export const metadata: Metadata = {
  title: "Products",
};

export default async function Page() {
  const resources = await getUserResources();

  if (hasPermission(PERMISSIONS.READ_PRODUCT, resources ?? [])) {
    return <ProductPage />;
  } else {
    redirect("/admin/profile");
  }
}
