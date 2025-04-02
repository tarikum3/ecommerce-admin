import ProductPage from "@/app/components/admin/Product/ProductPage";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "products",
};

export default async function Page() {
  return (
    <>
      <ProductPage />
    </>
  );
}
