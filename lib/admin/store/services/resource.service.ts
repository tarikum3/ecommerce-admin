import { Prisma } from "@prisma/client";
import { serviceApi } from "./serviceApi";

export type Resource = Prisma.ResourceGetPayload<{}>;

export const resourceApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get paginated list of resources (basic info)
    getAllResources: builder.query<Resource[], void>({
      query: () => {
        return {
          url: `admin/resource`,
          method: "GET",
        };
      },
      // providesTags: ["Resource"],
    }),
  }),
});

// Export hooks with proper typing
export const { useGetAllResourcesQuery } = resourceApi;
