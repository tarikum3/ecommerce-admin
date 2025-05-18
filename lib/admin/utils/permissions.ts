import { PERMISSIONS } from "@/lib/admin/configs/permissions";
// import { Role } from './enums';
// import { User } from 'types/auth.type';

// Function to return values based on user permissions
export const permissionArray = (
  permission: PERMISSIONS | PERMISSIONS[],
  value: object | any[],
  permissions: any[],
  //user?: User | null,
  user?: any
) => {
  // allow superAdmin to access all values
  // if (user?.roleType === Role.superAdmin) {
  //   return Array.isArray(value) ? value : [value];
  // }

  // if (permission === PERMISSIONS.ALL) {
  //   return Array.isArray(value) ? value : [value];
  // }

  if (Array.isArray(permission) && permission.length !== 0) {
    return permission.every((p) => permissions.includes(p)) ? [value] : [];
  } else if (permissions.includes(permission)) {
    return Array.isArray(value) ? value : [value];
  } else {
    return [];
  }
};

export const hasPermission = (
  permission: PERMISSIONS | PERMISSIONS[],
  userPermissions: string[]
): boolean => {
  // If user has all permissions, return true immediately
  // return true;
  if (userPermissions.includes("*")) {
    return true;
  }

  // Handle single permission check
  if (typeof permission === "string") {
    return userPermissions.includes(permission);
  }

  // Handle array of permissions - checks if user has ALL permissions
  if (Array.isArray(permission)) {
    return permission.every((perm) => userPermissions.includes(perm));
  }

  return false;
};

// This version checks if user has ANY of the permissions (OR condition)
export const hasAnyPermission = (
  permission: PERMISSIONS | PERMISSIONS[],
  userPermissions: string[]
): boolean => {
  if (userPermissions.includes("*")) return true;

  if (typeof permission === "string") {
    return userPermissions.includes(permission);
  }

  if (Array.isArray(permission)) {
    return permission.some((perm) => userPermissions.includes(perm));
  }

  return false;
};
