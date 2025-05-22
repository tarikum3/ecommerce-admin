"use client";

import React, { useMemo, useCallback } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/admin/configs/routes";
import { permissionArray, hasPermission } from "@/lib/admin/utils/permissions";
import { PERMISSIONS } from "@/lib/admin/configs/permissions";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import {
  Dashboard as DashboardIcon,
  PeopleAltOutlined as PeopleAltOutlinedIcon,
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  Inventory2Outlined as Inventory2OutlinedIcon,
  GroupOutlined as GroupOutlinedIcon,
} from "@mui/icons-material";
import { useResource } from "@/app/components/common/SessionWrapper";
interface NavItem {
  label: string;
  icon: React.ReactNode;
  route?: string;
  isOpen?: boolean;
  isHovered?: boolean;
  children?: NavItem[];
  type?: string;
}

const NavLinks = () => {
  const permissions = useResource();
  const pathname = usePathname();
  const t = useTranslations("SideBar");

  // Memoize permissions array since it doesn't change
  // const permissions = useMemo(
  //   () => [
  //     PERMISSIONS.VIEW_DASHBOARD,
  //     PERMISSIONS.VIEW_ANALYTICS,
  //     PERMISSIONS.READ_USER,
  //     PERMISSIONS.READ_PRODUCT,
  //     PERMISSIONS.VIEW_ORDERS,
  //   ],
  //   []
  // );

  const sideBarConfigs = useMemo(() => {
    // Dashboard section
    const dashboardSection = hasPermission(
      [PERMISSIONS.VIEW_ANALYTICS, PERMISSIONS.VIEW_DASHBOARD],
      permissions
    )
      ? [
          {
            label: t("dashboard.label"),
            icon: <DashboardIcon className="text-primary-500" />,
            isOpen: true,
            isHovered: false,
            children: [
              hasPermission(PERMISSIONS.VIEW_DASHBOARD, permissions) && {
                label: t("dashboard.overview"),
                icon: <DashboardIcon className="text-primary-400" />,
                route: ROUTES.DASHBOARD_OVERVIEW,
              },
              hasPermission(PERMISSIONS.VIEW_ANALYTICS, permissions) && {
                label: t("dashboard.analytics"),
                icon: <DashboardIcon className="text-primary-400" />,
                route: ROUTES.DASHBOARD_ANALYTICS,
              },
            ].filter((item) => !item == false),
          },
        ]
      : [];

    // Other menu items
    const otherItems = [
      hasPermission(PERMISSIONS.READ_USER, permissions) && {
        label: t("users"),
        icon: <PeopleAltOutlinedIcon className="text-primary-500" />,
        route: ROUTES.USERS,
      },
      hasPermission(PERMISSIONS.READ_PRODUCT, permissions) && {
        label: t("products"),
        icon: <Inventory2OutlinedIcon className="text-primary-500" />,
        route: ROUTES.PRODUCT,
      },
      hasPermission(PERMISSIONS.VIEW_ORDERS, permissions) && {
        label: t("orders"),
        icon: <ShoppingCartOutlinedIcon className="text-primary-500" />,
        route: ROUTES.ORDER,
      },
      hasPermission(PERMISSIONS.VIEW_CUSTOMERS, permissions) && {
        label: t("customers"),
        icon: <GroupOutlinedIcon className="text-primary-500" />,
        route: ROUTES.CUSTOMERS,
      },
      hasPermission(PERMISSIONS.MANAGE_USER_ROLES, permissions) && {
        label: "role",
        icon: <GroupOutlinedIcon className="text-primary-500" />,
        route: ROUTES.ROLE,
      },
    ].filter((item) => !item == false);

    return [...dashboardSection, ...otherItems];
  }, [t, permissions]);

  // Optimized toggle function with useCallback
  const toggleSubMenu = useCallback((index: number, configs: NavItem[]) => {
    const updatedConfigs = [...configs];
    updatedConfigs[index] = {
      ...updatedConfigs[index],
      isOpen: !updatedConfigs[index].isOpen,
    };
    return updatedConfigs;
  }, []);

  // Memoize the hover handlers
  const handleMouseEnter = useCallback((index: number, configs: NavItem[]) => {
    const updatedConfigs = [...configs];
    updatedConfigs[index].isHovered = true;
    return updatedConfigs;
  }, []);

  const handleMouseLeave = useCallback((index: number, configs: NavItem[]) => {
    const updatedConfigs = [...configs];
    updatedConfigs[index].isHovered = false;
    return updatedConfigs;
  }, []);

  // Using state for configs that can change
  const [dynamicConfigs, setDynamicConfigs] =
    React.useState<NavItem[]>(sideBarConfigs);

  // Update dynamic configs when sidebar configs change
  React.useEffect(() => {
    setDynamicConfigs(sideBarConfigs);
  }, [sideBarConfigs]);

  // Memoize the rendered nav items
  const renderedNavItems = useMemo(
    () =>
      dynamicConfigs.map((config: NavItem, index: number) => (
        <div className="my-1" key={`${config.label}-${index}`}>
          {config.type === "divider" ? (
            <div className="border-t border-primary-300 my-2" />
          ) : (
            <>
              {config.children ? (
                <div
                  className="w-full mx-auto rounded-md cursor-pointer"
                  onMouseEnter={() =>
                    setDynamicConfigs((prev) => handleMouseEnter(index, prev))
                  }
                  onMouseLeave={() =>
                    setDynamicConfigs((prev) => handleMouseLeave(index, prev))
                  }
                >
                  <button
                    className={`flex justify-between items-center px-3 py-2 rounded-md w-full transition-colors ${
                      config.isHovered
                        ? "bg-primary-600 text-primary-100"
                        : "hover:bg-primary-500 hover:text-primary-100"
                    }`}
                    onClick={() =>
                      setDynamicConfigs((prev) => toggleSubMenu(index, prev))
                    }
                    aria-expanded={config.isOpen}
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
                      {config.children.map((subConfig, subIndex) => (
                        <Link
                          href={subConfig.route || "#"}
                          key={`${subConfig.label}-${subIndex}`}
                          prefetch={false}
                        >
                          <div
                            className={`px-3 py-2 rounded-md transition-colors cursor-pointer text-sm font-medium ${
                              pathname === subConfig.route
                                ? "bg-primary-500 text-primary-100"
                                : "hover:bg-primary-500 hover:text-primary-100"
                            }`}
                          >
                            {subConfig.icon}
                            <span className="ml-2">{subConfig.label}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link href={config.route || "#"} prefetch={false}>
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
      )),
    [
      dynamicConfigs,
      pathname,
      handleMouseEnter,
      handleMouseLeave,
      toggleSubMenu,
    ]
  );

  return (
    <div className="mt-1 w-full h-full overflow-y-auto bg-primary-0 p-2">
      <nav>{renderedNavItems}</nav>
    </div>
  );
};

export default React.memo(NavLinks);
