import ForgotPassword from "@/app/components/admin/auth/ForgotPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "forgot",
};

export default function ForgotPasswordPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col ">
        <ForgotPassword />
      </div>
    </main>
  );
}
