export const TAGS = {
  collections: "collections",
  products: "products",
  cart: "cart",
};
export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: "RELEVANCE" | "name" | "createdAt" | "price";
  reverse: boolean;
};
export const defaultSort: SortFilterItem = {
  title: "Relevance",
  slug: null,
  sortKey: "RELEVANCE",
  reverse: false,
};
export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    title: "Name",
    slug: "name",
    sortKey: "name",
    reverse: false,
  }, // asc
  {
    title: "Latest arrivals",
    slug: "createdAt",
    sortKey: "createdAt",
    reverse: true,
  },
  {
    title: "Price: Low to high",
    slug: "price",
    sortKey: "price",
    reverse: false,
  }, // asc
  {
    title: "Price: High to low",
    slug: "price",
    sortKey: "price",
    reverse: true,
  },
];

export const primaryColors: Record<string, string> = {
  "primary-900": "#111827",
  "primary-800": "#1F2937",
  "primary-700": "#374151",
  "primary-600": "#4B5563",
  "primary-500": "#6B7280",
  "primary-400": "#9CA3AF",
  "primary-300": "#D1D5DB",
  "primary-200": "#E5E7EB",
  "primary-100": "#FFFFFF",
};



export const COLORS = {
  primary: {
    0: "rgba(255, 255, 255)",
    50: "rgb(234, 242, 249)",
    100: "rgb(209, 227, 242)",
    200: "rgb(173, 206, 232)",
    300: "rgb(137, 185, 222)",
    400: "rgb(101, 164, 212)",
    500: "rgb(26, 74, 114)",
    600: "rgb(22, 63, 97)",
    700: "rgb(18, 52, 80)",
    800: "rgb(14, 41, 63)",
    900: "rgb(10, 30, 46)",
  },
  notification: {
    500: "rgb(89, 149, 148)",
    600: "rgb(69, 129, 128)",
    700: "rgb(49, 109, 108)",
    800: "rgb(29, 89, 88)",
    900: "rgb(19, 69, 68)",
  },
  danger: {
    500: "rgb(175, 104, 105)",
    600: "rgb(155, 84, 85)",
    700: "rgb(135, 64, 65)",
    800: "rgb(115, 44, 45)",
    900: "rgb(95, 24, 25)",
  },
  warning: {
    500: "rgb(172, 152, 99)",
    600: "rgb(152, 132, 79)",
    700: "rgb(132, 112, 59)",
    800: "rgb(112, 92, 39)",
    900: "rgb(92, 72, 19)",
  },
  positive: {
    500: "rgb(102, 162, 137)",
    600: "rgb(82, 142, 117)",
    700: "rgb(62, 122, 97)",
    800: "rgb(42, 102, 77)",
    900: "rgb(22, 82, 57)",
  },
} as const;
