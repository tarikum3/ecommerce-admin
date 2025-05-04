export enum PERMISSIONS {
  // User permissions
  CREATE_USER = "Create User",
  READ_USER = "Read User",
  UPDATE_USER = "Update User",
  DELETE_USER = "Delete User",
  MANAGE_USER_ROLES = "Manage User Roles",

  // Product permissions
  CREATE_PRODUCT = "Create Product",
  READ_PRODUCT = "Read Product",
  UPDATE_PRODUCT = "Update Product",
  DELETE_PRODUCT = "Delete Product",
  MANAGE_INVENTORY = "Manage Inventory",
  MANAGE_PRODUCT_VARIANTS = "Manage Product Variants",

  // Order permissions
  VIEW_ORDERS = "View Orders",
  PROCESS_ORDERS = "Process Orders",
  CANCEL_ORDERS = "Cancel Orders",
  ISSUE_REFUNDS = "Issue Refunds",

  // Customer permissions
  VIEW_CUSTOMERS = "View Customers",
  UPDATE_CUSTOMER = "Update Customer",
  MANAGE_CUSTOMER_STATUS = "Manage Customer Status",

  // Catalog permissions
  MANAGE_COLLECTIONS = "Manage Collections",
  MANAGE_IMAGES = "Manage Images",
  MANAGE_PRODUCT_OPTIONS = "Manage Product Options",

  // System permissions
  VIEW_DASHBOARD = "View Dashboard",
  VIEW_ANALYTICS = "View Analytics",
  MANAGE_SYSTEM_SETTINGS = "Manage System Settings",
  MANAGE_NOTIFICATIONS = "Manage Notifications",

  READ_ROLE = "Read Role",
}
