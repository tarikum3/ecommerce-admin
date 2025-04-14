import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Decorative elements - using your theme colors */}
          <div className="relative h-2 bg-gradient-to-r from-primary-700 to-primary-900"></div>

          {/* Floating card effect */}
          <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-sm">
            {/* Subtle pattern in background */}
            <div className="absolute -z-10 inset-0 overflow-hidden opacity-5">
              <div className="absolute -z-10 inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzc0MTUxIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
            </div>

            {/* <h1 className="text-2xl font-bold text-primary-900 text-center mb-6">
              {title}
            </h1> */}

            {/* Content */}
            {children}

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-primary-500">
              <p>
                By continuing, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>
          </div>
        </div>

        {/* Branding/attribution */}
        <div className="mt-8 text-center text-sm text-primary-400">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </main>
  );
}
