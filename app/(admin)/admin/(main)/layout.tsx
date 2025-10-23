import LayoutWrapper from "@/app/components/admin/layout/Layout";
//import ProductPage from "@/app/components/admin/Product/CreateProduct";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LayoutWrapper>{children}</LayoutWrapper>;
    </>
  );
}
