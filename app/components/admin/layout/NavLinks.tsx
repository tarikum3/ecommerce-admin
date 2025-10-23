"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
} from "@mui/material";
import Icon from "@mui/material/Icon";
import { ROUTES } from "@/lib/admin/configs/routes";
import { permissionArray, hasPermission } from "@/lib/admin/utils/permissions";
import { PERMISSIONS } from "@/lib/admin/configs/permissions";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useResource } from "@/app/components/common/SessionWrapper";
// Types inferred from the navigationConfig structure
interface NavItemBase {
  id: string;
  type: "item" | "collapse" | "group" | "divider";
  title?: string;
  icon?: string;
  url?: string;
}

interface NavItem extends NavItemBase {
  type: "item";
  url: string;
  title: string;
}

interface NavCollapse extends NavItemBase {
  type: "collapse";
  children: NavigationConfig;
  title: string;
  icon?: string;
  url?: string;
}

interface NavGroup extends NavItemBase {
  type: "group";
  children: NavigationConfig;
  title: string;
  icon?: string;
}

interface NavDivider extends NavItemBase {
  type: "divider";
}

type NavigationConfig = Array<NavItem | NavCollapse | NavGroup | NavDivider>;

// Props for Navigation component
interface NavigationProps {
  navigationConfig: NavigationConfig;
}

// NavItem Component
interface NavItemComponentProps {
  item: NavItem | NavCollapse | NavGroup | NavDivider;
  level?: number;
  onItemClick: (item: NavItem | NavCollapse | NavGroup | NavDivider) => void;
  openItems: Set<string>;
}

const NavItemComponent: React.FC<NavItemComponentProps> = ({
  item,
  level = 0,
  onItemClick,
  openItems,
}) => {
  const basePadding = 12;
  const levelPadding = Math.min(level * 12, 48);
  const totalPadding = basePadding + levelPadding;

  // Handle divider
  if (item.type === "divider") {
    return (
      <Divider
        key={item.id}
        className="my-3 mx-4 opacity-40"
        sx={{
          background:
            "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent)",
          height: "1px",
          border: "none",
        }}
      />
    );
  }

  // Handle group
  if (item.type === "group") {
    return (
      <div key={item.id} className="mb-2">
        <ListItem className="px-4 mt-6 first:mt-2" disablePadding>
          <ListItemButton
            className="rounded-xl mb-1 mx-2 group hover:bg-transparent"
            onClick={() => onItemClick(item)}
            sx={{
              pl: `${totalPadding}px`,
              pr: "8px",
              minHeight: "32px",
              cursor: "default",
              "&:hover": { backgroundColor: "transparent" },
            }}
          >
            <ListItemIcon className="min-w-8 w-8 mr-3">
              {/* {getIcon(item.icon)} */}
              <Icon className="w-5 h-5 transition-colors duration-200">
                {item.icon}
              </Icon>
              ;
            </ListItemIcon>
            <ListItemText
              primary={item.title}
              primaryTypographyProps={{
                className:
                  "font-bold text-xs uppercase tracking-widest text-primary-400 group-hover:text-primary-600 transition-colors duration-200",
              }}
            />
          </ListItemButton>
        </ListItem>
        <List component="div" disablePadding className="space-y-0.5">
          {item.children.map((child) => (
            <NavItemComponent
              key={child.id}
              item={child}
              level={level + 1}
              onItemClick={onItemClick}
              openItems={openItems}
            />
          ))}
        </List>
      </div>
    );
  }

  // Handle collapse
  if (item.type === "collapse") {
    const isOpen = openItems.has(item.id);

    return (
      <div key={item.id}>
        <ListItem disablePadding className="px-2">
          <ListItemButton
            className={`rounded-xl transition-all duration-200 mx-1 group ${
              isOpen
                ? "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm"
                : "hover:bg-primary-50 hover:shadow-sm"
            }`}
            onClick={() => onItemClick(item)}
            sx={{
              pl: `${totalPadding}px`,
              pr: "12px",
              minHeight: "44px",
              margin: "2px 4px",
              border: isOpen
                ? "1px solid rgba(59, 130, 246, 0.2)"
                : "1px solid transparent",
            }}
          >
            <ListItemIcon
              className={`min-w-8 w-8 mr-3 transition-colors duration-200 ${
                isOpen
                  ? "text-blue-600"
                  : "text-primary-500 group-hover:text-primary-700"
              }`}
            >
              {/* {getIcon(item.icon)} */}
              <Icon className="w-5 h-5 transition-colors duration-200">
                {item.icon}
              </Icon>
              ;
            </ListItemIcon>
            <ListItemText
              primary={item.title}
              primaryTypographyProps={{
                className: `font-semibold text-sm transition-colors duration-200 ${
                  isOpen
                    ? "text-blue-700"
                    : "text-primary-700 group-hover:text-primary-900"
                }`,
              }}
            />
            <Icon className={isOpen ? "text-blue-500" : "text-primary-400"}>
              {isOpen ? "expand_less" : "expand_more"}
            </Icon>
          </ListItemButton>
        </ListItem>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding className="space-y-0.5 mt-1">
            {item.children.map((child) => (
              <NavItemComponent
                key={child.id}
                item={child}
                level={level + 1}
                onItemClick={onItemClick}
                openItems={openItems}
              />
            ))}
          </List>
        </Collapse>
      </div>
    );
  }

  // Handle regular item
  return (
    <ListItem key={item.id} disablePadding className="px-2">
      <ListItemButton
        component={Link}
        href={item.url}
        className="rounded-xl transition-all duration-200 mx-1 group hover:shadow-sm hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100"
        onClick={() => onItemClick(item)}
        sx={{
          pl: `${totalPadding}px`,
          pr: "12px",
          minHeight: "40px",
          margin: "2px 4px",
          border: "1px solid transparent",
          "&:hover": {
            border: "1px solid rgba(0, 0, 0, 0.08)",
          },
        }}
      >
        <ListItemIcon className="min-w-8 w-8 mr-3 text-primary-500 group-hover:text-primary-700 transition-colors duration-200">
          {/* {getIcon(item.icon)} */}
          <Icon className="w-5 h-5 transition-colors duration-200">
            {item.icon}
          </Icon>
          ;
        </ListItemIcon>
        <ListItemText
          primary={item.title}
          primaryTypographyProps={{
            className:
              "font-medium text-sm text-primary-700 group-hover:text-primary-900 transition-colors duration-200",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

const Navigation: React.FC<NavigationProps> = ({ navigationConfig }) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const handleItemClick = (
    item: NavItem | NavCollapse | NavGroup | NavDivider
  ) => {
    if (item.type === "collapse") {
      const newOpenItems = new Set(openItems);
      if (newOpenItems.has(item.id)) {
        newOpenItems.delete(item.id);
      } else {
        newOpenItems.add(item.id);
      }
      setOpenItems(newOpenItems);
    }

    console.log("Navigation item clicked:", {
      id: item.id,
      type: item.type,
      title: "title" in item ? item.title : "No title",
    });
  };

  return (
    <nav className="w-72 bg-gradient-to-b from-white via-primary-50 to-primary-100/50 h-full border-r border-primary-200/60 overflow-y-auto flex-shrink-0 backdrop-blur-sm">
      {/* Navigation Items */}
      <List
        component="nav"
        className="px-3 space-y-0 py-4 w-full"
        sx={{ width: "100%" }}
      >
        {navigationConfig.map((item) => (
          <NavItemComponent
            key={item.id}
            item={item}
            onItemClick={handleItemClick}
            openItems={openItems}
          />
        ))}
      </List>
    </nav>
  );
};
// Modern test component
export const useMenuItems = () => {
  const permissions = useResource();
  const pathname = usePathname();
  const t = useTranslations("SideBar");

  const menuItems = useMemo(() => {
    const menu: (NavItem | NavGroup | NavDivider)[] = [];

    // Dashboard section as a group
    const hasDashboardPermission = hasPermission(
      [PERMISSIONS.VIEW_ANALYTICS, PERMISSIONS.VIEW_DASHBOARD],
      permissions
    );

    if (hasDashboardPermission) {
      const dashboardChildren: NavItem[] = [];

      if (hasPermission(PERMISSIONS.VIEW_DASHBOARD, permissions)) {
        dashboardChildren.push({
          id: "dashboard-overview",
          type: "item" as const,
          title: t("dashboard.overview"),
          icon: "dashboard",
          url: ROUTES.DASHBOARD_OVERVIEW,
        });
      }

      if (hasPermission(PERMISSIONS.VIEW_ANALYTICS, permissions)) {
        dashboardChildren.push({
          id: "dashboard-analytics",
          type: "item" as const,
          title: t("dashboard.analytics"),
          icon: "analytics",
          url: ROUTES.DASHBOARD_ANALYTICS,
        });
      }

      if (dashboardChildren.length > 0) {
        menu.push({
          id: "dashboard-group",
          type: "group" as const,
          title: t("dashboard.label"),
          icon: "dashboard",
          children: dashboardChildren,
        });
      }
    }

    // Add divider after dashboard if there are items
    if (menu.length > 0) {
      menu.push({
        id: "divider-1",
        type: "divider" as const,
      });
    }

    // E-commerce group
    const hasEcommercePermission = hasPermission(
      [
        PERMISSIONS.READ_PRODUCT,
        PERMISSIONS.VIEW_ORDERS,
        PERMISSIONS.VIEW_CUSTOMERS,
      ],
      permissions
    );

    if (hasEcommercePermission) {
      const ecommerceChildren: NavItem[] = [];

      if (hasPermission(PERMISSIONS.READ_PRODUCT, permissions)) {
        ecommerceChildren.push({
          id: "products",
          type: "item" as const,
          title: t("products"),
          icon: "inventory_2",
          url: ROUTES.PRODUCT,
        });
      }

      if (hasPermission(PERMISSIONS.VIEW_ORDERS, permissions)) {
        ecommerceChildren.push({
          id: "orders",
          type: "item" as const,
          title: t("orders"),
          icon: "shopping_cart",
          url: ROUTES.ORDER,
        });
      }

      if (hasPermission(PERMISSIONS.VIEW_CUSTOMERS, permissions)) {
        ecommerceChildren.push({
          id: "customers",
          type: "item" as const,
          title: t("customers"),
          icon: "group",
          url: ROUTES.CUSTOMERS,
        });
      }

      if (ecommerceChildren.length > 0) {
        menu.push({
          id: "ecommerce-group",
          type: "group" as const,
          title: t("ecommerce.label") || "E-Commerce",
          icon: "shopping_cart",
          children: ecommerceChildren,
        });
      }
    }

    // User Management group
    const hasUserManagementPermission = hasPermission(
      [PERMISSIONS.READ_USER, PERMISSIONS.MANAGE_USER_ROLES],
      permissions
    );

    if (hasUserManagementPermission) {
      const userManagementChildren: NavItem[] = [];

      if (hasPermission(PERMISSIONS.READ_USER, permissions)) {
        userManagementChildren.push({
          id: "users",
          type: "item" as const,
          title: t("users"),
          icon: "people",
          url: ROUTES.USERS,
        });
      }

      if (hasPermission(PERMISSIONS.MANAGE_USER_ROLES, permissions)) {
        userManagementChildren.push({
          id: "roles",
          type: "item" as const,
          title: t("role"),
          icon: "admin_panel_settings",
          url: ROUTES.ROLE,
        });
      }

      if (userManagementChildren.length > 0) {
        menu.push({
          id: "user-management-group",
          type: "group" as const,
          title: t("user_management.label") || "User Management",
          icon: "people",
          children: userManagementChildren,
        });
      }
    }

    // Add divider before individual items if there are groups
    if (menu.length > 0) {
      menu.push({
        id: "divider-2",
        type: "divider" as const,
      });
    }

    // Individual items that don't belong to any group
    const individualItems: NavItem[] = [
      // Add any individual items here if needed
      // Example:
      // hasPermission(SOME_PERMISSION, permissions) && {
      //   id: "settings",
      //   type: "item" as const,
      //   title: t("settings"),
      //   icon: "settings",
      //   url: ROUTES.SETTINGS,
      // },
    ].filter((item) => item !== false);

    // Add individual items to menu
    menu.push(...individualItems);

    return menu;
  }, [t, permissions, pathname]);

  return menuItems;
};

export default Navigation;
