import SignUpView from "@/app/components/admin/auth/SignUpView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "signup",
};
export default function SignUpPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col ">
        <SignUpView />
      </div>
    </main>
  );
}
