import AuthLayout from "@/app/components/admin/auth/AuthLayout";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthLayout>{children}</AuthLayout>
    </>
  );
}
