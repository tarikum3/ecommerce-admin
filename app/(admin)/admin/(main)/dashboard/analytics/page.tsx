import AnalyticsPage from "@/app/components/admin/dashboard/Analytics/AnalyticsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "analytics",
};

export default async function Page() {
  return (
    <>
      <AnalyticsPage />
    </>
  );
}
