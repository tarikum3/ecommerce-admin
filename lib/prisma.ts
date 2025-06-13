import {
  PrismaClient,
  Prisma,
  Product as PrismaProduct,
  Collection as PrismaCollection,
} from "@prisma/client";
type UserFullType = Prisma.ProductGetPayload<{
  include: {
    price: true;
  };
}>;
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export default prisma;
//export type Product = PrismaProduct;
export type Product = Prisma.ProductGetPayload<{
  include: {
    images: true;
    variants: {
      include: {
        variantOptions: {
          include: { optionValue: { include: { option: true } } };
        };
      };
    };
    price: true;
    options: {
      include: {
        values: { include: { option: true } };
      };
    };
  };
}>;
export type OrderStatus = Prisma.EnumOrderStatusFieldUpdateOperationsInput;

export type Order = Prisma.OrderGetPayload<{
  include: {
    items: true;
    Customer: true;
  };
}>;
export type Role = Prisma.RoleGetPayload<{ include: { resources: true } }>;
export type ProductVariant = Prisma.ProductVariantGetPayload<{
  include: {
    variantOptions: { include: { optionValue: { include: { option: true } } } };
  };
}>;
export type ProductOption = Prisma.ProductOptionGetPayload<{
  include: {
    values: { include: { option: true } };
  };
}>;
export type Cart = Prisma.CartGetPayload<{
  include: {
    items: true;
  };
}>;
export type Collection = PrismaCollection;
export type EventLog = Prisma.EventLogGetPayload<{
  include: {
    user: true; // Including the user relation in the EventLog
  };
}>;
