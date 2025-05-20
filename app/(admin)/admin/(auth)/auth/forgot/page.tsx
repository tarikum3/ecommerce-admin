import ForgotPassword from "@/app/components/admin/auth/ForgotPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot",
};

export default function ForgotPasswordPage() {
  return <ForgotPassword />;
}
