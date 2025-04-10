import LayoutWrapper from "@/app/components/admin/layout/Layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LayoutWrapper>{children}</LayoutWrapper>
      {/* <>{children}</> */}
    </>
  );
}
