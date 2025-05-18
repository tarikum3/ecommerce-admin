import { serviceApi } from "./serviceApi";

export const profileApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<any, void>({
      query: () => ({
        url: `admin/profile`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        if (response?.data) {
          return response.data;
        }

        return {} as any;
      },
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation<any, any & { id: string }>({
      query: (profile) => {
        let { id } = profile;

        return {
          url: `admin/profile/${id}`,
          method: "PUT",
          body: profile,
        };
      },

      invalidatesTags: ["Profile"],
    }),
  }),
});
export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
