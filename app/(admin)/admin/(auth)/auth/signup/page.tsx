import SignUpView from "@/app/components/admin/auth/SignUpView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup",
};
export default function SignUpPage() {
  return <SignUpView />;
}
