import RolePage from "@/app/components/admin/Role/RolePage";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Roles",
};

export default async function Page() {
  return (
    <>
      <RolePage />
    </>
  );
}
