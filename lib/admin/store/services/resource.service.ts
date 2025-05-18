import { Prisma } from "@prisma/client";
import { serviceApi } from "./serviceApi";

export type Resource = Prisma.ResourceGetPayload<{}>;
interface GetResourcesParams {
  page?: number;
  limit?: number;
  searchText?: string;
}
export interface GetResourcesResponse {
  resources: Resource[];
  total: number;
}
export const resourceApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    getResources: builder.query<GetResourcesResponse, GetResourcesParams>({
      query: ({ page = 1, limit = 10, searchText = "" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(searchText && { searchText: encodeURIComponent(searchText) }),
        });

        return {
          url: `admin/resource?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: {
        data: GetResourcesResponse;
      }): GetResourcesResponse => {
        if (response?.data) {
          return response.data;
        }

        return {} as any;
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
      transformResponse: (response: {
        data: { resources: Resource[] };
      }): Resource[] => {
        if (response?.data?.resources) {
          return response.data.resources;
        }

        return [];
      },
      // providesTags: ["Resource"],
    }),
  }),
});

// Export hooks with proper typing
export const { useGetAllResourcesQuery, useGetResourcesQuery } = resourceApi;
