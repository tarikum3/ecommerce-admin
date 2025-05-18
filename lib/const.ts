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
  "primary-900": "#0F172A",
  "primary-800": "#1E293B",
  "primary-700": "#334155",
  "primary-600": "#475569",
  "primary-500": "#64748B",
  "primary-400": "#94A3B8",
  "primary-300": "#CBD5E1",
  "primary-200": "#E2E8F0",
  "primary-100": "#F1F5F9",
};

export const COLORS = {
  primary: {
    0: "rgba(255, 255, 255)",
    50: "rgb(248, 250, 252)",
    100: "rgb(241, 245, 249)",
    200: "rgb(226, 232, 240)",
    300: "rgb(203, 213, 225)",
    400: "rgb(148, 163, 184)",
    500: "rgb(100, 116, 139)",
    600: "rgb(71, 85, 105)",
    700: "rgb(51, 65, 85)",
    800: "rgb(30, 41, 59)",
    900: "rgb(15, 23, 42)",
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
};
