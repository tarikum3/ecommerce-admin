// import { serviceApi } from "@/lib/admin/store/services/serviceApi";

// export const analyticsApi = serviceApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getAnalytics: builder.query<any, any>({
//       query: ({ fromDate, toDate, type }) => {
//         const params = new URLSearchParams({
//           ...(fromDate && { fromDate }),
//           ...(toDate && { toDate }),
//           ...(type && { type }),
//         });

//         return {
//           url: `admin/dashboard/analytics?${params.toString()}`,
//           method: "GET",
//         };
//       },
//      // providesTags: ["Analytics"],
//     }),
//   }),
// });
// export const { useGetAnalyticsQuery } = analyticsApi;

// lib/admin/store/services/dashboard/dashboard.service.ts

import { serviceApi } from "@/lib/admin/store/services/serviceApi";

export const dashboardAnalyticsApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get daily new customers data
    getAnalytics: builder.query<any, any>({
      query: ({ fromDate, toDate, type }) => {
        const params = new URLSearchParams({
          ...(fromDate && { fromDate }),
          ...(toDate && { toDate }),
          ...(type && { type }),
        });

        return {
          url: `admin/dashboard/analytics?${params.toString()}`,
          method: "GET",
        };
      },
      // providesTags: ["Overview"],
    }),
    // Get daily new orders data
  }),
});

export const { useGetAnalyticsQuery } = dashboardAnalyticsApi;
