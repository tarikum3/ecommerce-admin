import { Prisma } from "@prisma/client";
import { serviceApi } from "./serviceApi";

export type Resource = Prisma.ResourceGetPayload<{}>;
interface GetResourcesParams {
  page?: number;
  limit?: number;
  searchText?: string;
}
export const resourceApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    getResources: builder.query<Resource[], GetResourcesParams>({
      query: ({ page = 1, limit = 10, searchText = "" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(searchText && { searchText: encodeURIComponent(searchText) }),
        });

        return {
          url: `admin/role?${params.toString()}`,
          method: "GET",
        };
      },
      // providesTags: ["Resource"],
    }),
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
export const { useGetAllResourcesQuery, useGetResourcesQuery } = resourceApi;
