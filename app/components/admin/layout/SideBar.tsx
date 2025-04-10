"use client";

import * as React from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/admin/configs/routes";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { permissionArray } from "@/lib/admin/utils/permissions";
import { PERMISSIONS } from "@/lib/admin/configs/permissions";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
//import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import UserMenu from "@/app/components/admin/user/usermenu";
import { useTranslations } from "next-intl";
import { useUI } from "@/app/components/admin/ui/UIContext";
//import CloseIcon from "@mui/icons-material/Close";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Logo } from "@/app/components";

export default function SideBar() {
  const pathname = "/home";
  const t = useTranslations("SideBar"); // Use translations for the SideBar namespace
  const { displayLeftSidebar, closeLeftSidebar } = useUI(); // Use the UI context to control sidebar visibility

  const permissions = [
    PERMISSIONS.READ_OVERVIEW_DASHBOARD,
    PERMISSIONS.READ_ANALYTICS_DASHBOARD,
    PERMISSIONS.READ_USER,
    PERMISSIONS.READ_PRODUCT,
    PERMISSIONS.READ_ORDER,
    PERMISSIONS.READ_CUSTOMER,
    PERMISSIONS.READ_ACTIVITY,
  ];

  const [sideBarConfigs, setSideBarConfigs] = React.useState<any[]>([]);

  React.useEffect(() => {
    setSideBarConfigs([
      ...permissionArray(
        [
          PERMISSIONS.READ_OVERVIEW_DASHBOARD,
          PERMISSIONS.READ_ANALYTICS_DASHBOARD,
        ],
        {
          label: t("dashboard.label"), // Localized label
          icon: <DashboardIcon className="text-primary-500" />,
          isOpen: true,
          isHovered: false,
          children: [
            {
              label: t("dashboard.overview"), // Localized label
              icon: <DashboardIcon className="text-primary-400" />,
              route: ROUTES.DASHBOARD_OVERVIEW,
            },
            {
              label: t("dashboard.analytics"), // Localized label
              icon: <DashboardIcon className="text-primary-400" />,
              route: ROUTES.DASHBOARD_ANALYTICS,
            },
          ],
        },
        permissions
      ),

      {
        label: t("users"), // Localized label
        icon: <PeopleAltOutlinedIcon className="text-primary-500" />,
        route: ROUTES.USERS,
      },

      {
        label: t("products"), // Localized label
        icon: <Inventory2OutlinedIcon className="text-primary-500" />,
        route: ROUTES.PRODUCT,
      },
      {
        label: t("orders"), // Localized label
        icon: <ShoppingCartOutlinedIcon className="text-primary-500" />,
        route: ROUTES.ORDER,
      },
      {
        label: t("customers"), // Localized label
        icon: <GroupOutlinedIcon className="text-primary-500" />,
        route: ROUTES.CUSTOMERS,
      },
      {
        //  label: t("roles"), // Localized label
        label: "role",
        icon: <GroupOutlinedIcon className="text-primary-500" />,
        route: ROUTES.ROLE,
      },
    ]);
  }, [t]);

  const toggleSubMenu = (index: number) => {
    setSideBarConfigs((prevConfigs) => {
      const updatedConfigs = [...prevConfigs];
      updatedConfigs[index] = {
        ...updatedConfigs[index],
        isOpen: !updatedConfigs[index].isOpen,
      };
      return updatedConfigs;
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0  h-full  w-[270px] z-50">
      <div className="h-full flex flex-col justify-end">
        {/* Logo and Close Button */}
        <div className="flex items-center justify-between  p-4 ">
          <Link
            href="/"
            className="text-xl font-bold flex justify-center items-center"
          >
            <Logo className="h-14" alt="logo" />
          </Link>
          <button
            id="toggleSidebarMobile"
            aria-expanded="true"
            aria-controls="sidebar"
            className=" text-primary-900 hover:text-primary-900 cursor-pointer p-2 hover:bg-primary-100 focus:bg-primary-100 focus:ring-2 focus:ring-primary-100 rounded"
            onClick={closeLeftSidebar}
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="mt-1 w-full h-full overflow-y-auto bg-primary-0 p-2">
          <nav>
            {sideBarConfigs.map((config: any, index: number) => (
              <div className="my-1" key={index}>
                {config.type === "divider" ? (
                  <div className="border-t border-primary-300 my-2" />
                ) : (
                  <>
                    {config.children ? (
                      <div
                        className="w-full mx-auto rounded-md cursor-pointer"
                        onMouseEnter={() => {
                          setSideBarConfigs((prevConfigs) => {
                            const updatedConfigs = [...prevConfigs];
                            updatedConfigs[index].isHovered = true;
                            return updatedConfigs;
                          });
                        }}
                        onMouseLeave={() => {
                          setSideBarConfigs((prevConfigs) => {
                            const updatedConfigs = [...prevConfigs];
                            updatedConfigs[index].isHovered = false;
                            return updatedConfigs;
                          });
                        }}
                      >
                        <button
                          className={`flex justify-between items-center px-3 py-2 rounded-md w-full transition-colors ${
                            config.isHovered
                              ? "bg-primary-600 text-primary-100"
                              : "hover:bg-primary-500 hover:text-primary-100"
                          }`}
                          onClick={() => toggleSubMenu(index)}
                        >
                          <div className="flex items-center text-sm font-semibold">
                            {config.icon}
                            <span className="ml-2">{config.label}</span>
                          </div>
                          <div>
                            {config.isOpen ? (
                              <ExpandMoreIcon />
                            ) : (
                              <ChevronRightIcon />
                            )}
                          </div>
                        </button>
                        {config.isOpen && (
                          <div className="pl-6">
                            {config.children.map(
                              (subConfig: any, subIndex: number) => (
                                <Link href={subConfig.route} key={subIndex}>
                                  <div
                                    className={`px-3 py-2 rounded-md transition-colors cursor-pointer text-sm font-medium ${
                                      pathname === subConfig.route
                                        ? "bg-primary-700 text-primary-100"
                                        : "hover:bg-primary-500 hover:text-primary-100"
                                    }`}
                                  >
                                    {subConfig.icon}
                                    <span className="ml-2">
                                      {subConfig.label}
                                    </span>
                                  </div>
                                </Link>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link href={config.route}>
                        <div
                          className={`flex items-center px-3 py-2 rounded-md w-full text-sm font-semibold transition-colors cursor-pointer ${
                            pathname === config.route
                              ? "bg-primary-700 text-primary-100"
                              : "hover:bg-primary-500 hover:text-primary-100"
                          }`}
                        >
                          {config.icon}
                          <span className="ml-2">{config.label}</span>
                        </div>
                      </Link>
                    )}
                  </>
                )}
              </div>
            ))}
          </nav>
        </div>
        <UserMenu />
      </div>
    </div>
  );
}
