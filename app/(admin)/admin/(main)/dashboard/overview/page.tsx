import OverViewPage from "@/app/components/admin/dashboard/overview/OverViewPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overview",
};

export default async function Page() {
  return (
    <>
      <OverViewPage />
    </>
  );
}
