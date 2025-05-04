import ProfilePage from "@/app/components/admin/profile/ProfilePage";

import { Metadata } from "next";
import { getUserResources } from "@lib/dal";
import { PERMISSIONS } from "@/lib/admin/configs/permissions";
import { redirect, RedirectType } from "next/navigation";
export const metadata: Metadata = {
  title: "Profile",
};

export default async function Page() {
  return (
    <>
      <ProfilePage />
    </>
  );
}
