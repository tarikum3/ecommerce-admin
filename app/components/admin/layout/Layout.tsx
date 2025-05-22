"use client";

import React, { FC, useEffect, useRef, ReactElement, ReactNode } from "react";
import Header from "@/app/components/admin/layout/Header";

import { useUI } from "@/app/components/admin/ui/UIContext";
import dynamic from "next/dynamic";
import {
  RightSideBarSkeleton,
  SideBarSkeleton,
} from "@components/admin/ui/Skeletons";
const RightSideBar = dynamic(
  () => import("@/app/components/admin/layout/RightSideBar"),
  {
    loading: () => <RightSideBarSkeleton />,
    ssr: false,
  }
);
const SideBar = dynamic(() => import("@/app/components/admin/layout/SideBar"), {
  loading: () => <SideBarSkeleton />,
  ssr: false,
});

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { displayRightSidebar, displayLeftSidebar } = useUI();

  return (
    <div className="h-screen w-screen overflow-clip p-[1px]">
      <Header />
      <main
        className={`mt-24 p-2 flex flex-col relative overflow-auto ${
          displayLeftSidebar ? "lg:ml-[270px]" : "lg:ml-0"
        }`}
      >
        {children}
        {/* "children" */}
      </main>

      {displayRightSidebar && <RightSideBar />}
      {displayLeftSidebar && <SideBar />}
    </div>
  );
};

export default Layout;
