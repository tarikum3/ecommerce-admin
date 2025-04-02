// import LoginView from "@/app/components/admin/auth/LoginView";

// export default function LoginPage() {
//   return (
//     <main className="flex items-center justify-center md:h-screen">
//       <div className="relative mx-auto flex w-full max-w-[400px] flex-col ">
//         <LoginView />
//       </div>
//     </main>
//   );
// }

import LoginView from "@/app/components/admin/auth/LoginView";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "login",
};
export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Decorative elements */}
          <div className="relative h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>

          {/* Floating card effect */}
          <div className="relative z-10 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-sm">
            {/* Subtle pattern in background */}
            <div className="absolute inset-0 overflow-hidden opacity-5">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDA3M2ZmIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
            </div>

            {/* Login View */}
            <LoginView />

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>
                By continuing, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>
          </div>
        </div>

        {/* Branding/attribution can go here */}
        <div className="mt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </main>
  );
}
