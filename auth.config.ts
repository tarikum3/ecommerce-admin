import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/admin/auth/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isTokenExpired = auth?.expires
        ? new Date(auth.expires) < new Date()
        : false;
      const isLoggedIn = !!auth?.user && !isTokenExpired;
      // const isLoggedIn = !!auth?.user;
      console.log("nextUrlauth", auth);
      console.log("nextUrl ", nextUrl);
      const isOnAuthPage = nextUrl.pathname.startsWith("/admin/auth");
      const isOnAdminOnly =
        nextUrl.pathname.endsWith("/admin") ||
        nextUrl.pathname.endsWith("/") ||
        nextUrl.pathname.endsWith("/admin/");
      //if (isLoggedIn) return true;
      if (isLoggedIn) {
        if (isOnAuthPage || isOnAdminOnly)
          return Response.redirect(
            new URL("/admin/dashboard/overview", nextUrl)
          );

        return true;
      }
      if (isOnAuthPage) return true;

      // return false; // Redirect unauthenticated users to login page

      return true;
    },
  },
} satisfies NextAuthConfig;
