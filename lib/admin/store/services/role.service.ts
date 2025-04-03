import { Prisma } from "@prisma/client";
import { serviceApi } from "./serviceApi";

export type Role = Prisma.RoleGetPayload<{}>;

export type RoleDetails = Prisma.RoleGetPayload<{
  include: {
    resources: true;
    adminUsers: {
      include: {
        user: true;
      };
    };
  };
}>;

export type RoleWithResourcesInput = Prisma.RoleCreateInput & {
  resourceIds?: string[];
};

interface GetRolesParams {
  page?: number;
  limit?: number;
  searchText?: string;
}

export const roleApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get paginated list of roles (basic info)
    getRoles: builder.query<Role[], GetRolesParams>({
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
      providesTags: ["Role"],
    }),

    // Get single role with all relations
    getRoleById: builder.query<RoleDetails, string>({
      query: (id) => ({
        url: `admin/role/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Role", id }],
    }),

    // Create new role with optional resource associations
    createRole: builder.mutation<RoleDetails, RoleWithResourcesInput>({
      query: (roleData) => ({
        url: "admin/role",
        method: "POST",
        body: roleData,
      }),
      invalidatesTags: ["Role"],
    }),

    // Update role with optional resource associations
    updateRole: builder.mutation<
      RoleDetails,
      { id: string } & Partial<RoleWithResourcesInput>
    >({
      query: ({ id, ...roleData }) => ({
        url: `admin/role/${id}`,
        method: "PUT",
        body: roleData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Role", id }],
    }),

    // Delete role
    deleteRole: builder.mutation<void, string>({
      query: (id) => ({
        url: `admin/role/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Role"],
    }),

    // Add resources to role
    addRoleResources: builder.mutation<
      RoleDetails,
      { roleId: string; resourceIds: string[] }
    >({
      query: ({ roleId, resourceIds }) => ({
        url: `admin/role/${roleId}/resources`,
        method: "POST",
        body: { resourceIds },
      }),
      invalidatesTags: (result, error, { roleId }) => [
        { type: "Role", id: roleId },
      ],
    }),

    // Remove resources from role
    removeRoleResources: builder.mutation<
      RoleDetails,
      { roleId: string; resourceIds: string[] }
    >({
      query: ({ roleId, resourceIds }) => ({
        url: `admin/role/${roleId}/resources`,
        method: "DELETE",
        body: { resourceIds },
      }),
      invalidatesTags: (result, error, { roleId }) => [
        { type: "Role", id: roleId },
      ],
    }),
  }),
});

// Export hooks with proper typing
export const {
  useGetRolesQuery,
  useGetRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useAddRoleResourcesMutation,
  useRemoveRoleResourcesMutation,
} = roleApi;
