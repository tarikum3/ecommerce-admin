"use client";

import React from "react";
import Link from "next/link";
import { Menu as MenuIcon } from "@mui/icons-material";
import dynamic from "next/dynamic";

import { useUI } from "@/app/components/admin/ui/UIContext";
import { Logo } from "@/app/components";

// Dynamically import components with loading states
const UserMenu = dynamic(() => import("@/app/components/admin/user/usermenu"), {
  loading: () => <div className="h-16 bg-primary-100" />,
  ssr: false,
});

const NavBar = dynamic(() => import("@/app/components/admin/layout/NavBar"), {
  loading: () => <div className="flex-1 bg-primary-100" />,
  ssr: false,
});

export default function Sidebar() {
  const { closeLeftSidebar } = useUI();

  return (
    <div className="fixed top-0 left-0 right-0 h-full w-[270px] z-50">
      <div className="h-full flex flex-col justify-end">
        {/* Logo and Close Button */}
        <div className="flex items-center justify-between p-4">
          <Link
            href="/"
            className="text-xl font-bold flex justify-center items-center"
            onClick={closeLeftSidebar}
          >
            <Logo className="h-14" alt="logo" />
          </Link>
          <button
            id="toggleSidebarMobile"
            aria-expanded="true"
            aria-controls="sidebar"
            className="text-primary-900 hover:text-primary-900 cursor-pointer p-2 hover:bg-primary-100 focus:bg-primary-100 focus:ring-2 focus:ring-primary-100 rounded"
            onClick={closeLeftSidebar}
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Content */}
        <NavBar />

        {/* User Menu */}
        <UserMenu />
      </div>
    </div>
  );
}
