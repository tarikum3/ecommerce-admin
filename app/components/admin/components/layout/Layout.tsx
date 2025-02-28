"use client";

import React, { FC, useEffect, useRef, ReactElement, ReactNode } from "react";
// import Header from "@/app/components/admin/components/layout/Header";
// import RightSideBar from "@/app/components/admin/components/layout/RightSideBar";
// import SideBar from "@/app/components/admin/components/layout/SideBar";
import { useUI } from "@/app/components/admin/components/ui/UIContext";

interface LayoutProps {
  children?: ReactNode;
}
// const Layout: FC<LayoutProps> = ({ children }) => {
//   const { displayLeftSidebar } = useUI();

//   return (
//     <>
//       {/* <Header /> */}
//       <div
//         id="main-content"
//         className=" flex flex-col relative overflow-y-auto  lg:ml-[270px]"
//       >
//         {children}
//       </div>
//       {/* <RightSideBar /> */}

//       {/* {displayLeftSidebar && <SideBar />} */}
//     </>
//   );
// };

// export default Layout;

const Layout: FC<LayoutProps> = ({ children }) => {
  const { displayLeftSidebar } = useUI();

  return (
    <>
      {/* <Header /> */}
      <div
        id="main-content"
        className={`flex flex-col relative overflow-y-auto ${
          displayLeftSidebar ? "lg:ml-[270px]" : "lg:ml-0"
        }`}
      >
        {children}
      </div>
      {/* <RightSideBar /> */}

      {/* {displayLeftSidebar && <SideBar />} */}
    </>
  );
};

export default Layout;
