import ProfilePage from "@/app/components/admin/profile/ProfilePage";

import { Metadata } from "next";
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
