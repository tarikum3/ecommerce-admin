"use client";

import React from "react";

import NavLinks, { useMenuItems } from "@/app/components/admin/layout/NavLinks";

const NavBar = () => {
  const sideBarConfigs = useMenuItems();

  return <>{<NavLinks navigationConfig={sideBarConfigs} />}</>;
};

export default NavBar;
