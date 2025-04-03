"use client";

import React, { useEffect, useState, useMemo } from "react";
import ModalComponent from "@components/admin/ui/ModalComponent";
import TablePage, { TablePageProps } from "@components/admin/layout/TablePage";
import { useGetRolesQuery } from "@/lib/admin/store/services/role.service";
import { useTranslations } from "next-intl";
import { Role } from "@/lib/admin/store/services/role.service";

const RolePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: allRoles,
    isLoading,
    isError,
  } = useGetRolesQuery({ page, limit });

  // Table columns configuration
  const tableColumns = useMemo(
    () => [
      {
        label: "Name",
        accessorKey: "name",
        cell: (row: Role) => <span className="font-medium">{row.name}</span>,
      },
      {
        label: "Description",
        accessorKey: "description",
        cell: (row: Role) => <span>{row.description || "N/A"}</span>,
      },
      //   {
      //     label: "Admin Users",
      //     accessorKey: "adminUsers",
      //     cell: (row: Role) => (
      //       <span>{row.adminUsers?.length || 0} assigned</span>
      //     ),
      //   },
      //   {
      //     label: "Resources",
      //     accessorKey: "resources",
      //     cell: (row: Role) => (
      //       <span>{row.resources?.length || 0} permissions</span>
      //     ),
      //   },
      {
        label: "Actions",
        accessorKey: "actions",
        cell: (row: Role) => (
          <button
            onClick={() => {
              setSelectedRole(row);
              setModalOpen(true);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
        ),
      },
    ],
    []
  );

  const TableOptions = useMemo(
    () => ({
      columns: tableColumns,
      pageIndex: pageIndex,
      pageSize: pageSize,
      // pageCount: Math.ceil((allRoles?.total || 0) / limit),

      pageCount: allRoles?.length ?? 1,
      setPagination: setPagination,
      data: allRoles || [],
    }),
    [allRoles, tableColumns, pageIndex, pageSize, limit]
  );

  // Header options
  const HeaderOptions = useMemo(
    () => ({
      title: "Roles",
      addTitle: "New Role",
      onAdd: () => {
        setSelectedRole(null);
        setModalOpen(true);
      },
    }),
    []
  );

  // Update page and limit when pagination changes
  useEffect(() => {
    setPage(pageIndex + 1);
    setLimit(pageSize);
  }, [pageIndex, pageSize]);

  return (
    <>
      {/* Modal for creating/editing a role */}
      {modalOpen && (
        <ModalComponent
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedRole(null);
          }}
          titles={{
            title: selectedRole ? "Edit Role" : "Create Role",
            // subtitle: selectedRole ? "Update role details" : "Define a new role"
          }}
          fullWidth={true}
        >
          <div className="space-y-4">
            {/* Role Form Fields */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Role Name</label>
                <input
                  type="text"
                  defaultValue={selectedRole?.name || ""}
                  className="w-full p-2 border rounded"
                  placeholder="e.g., Administrator"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Description</label>
                <input
                  type="text"
                  defaultValue={selectedRole?.description || ""}
                  className="w-full p-2 border rounded"
                  placeholder="Role description"
                />
              </div>
            </div>

            {/* Resource Permissions Section */}
            <div className="mt-6">
              <h3 className="text-lg font-medium">Resource Permissions</h3>
              <div className="mt-2 space-y-2">
                {/* This would be populated with available resources */}
                {/* {selectedRole?.resources?.map(resource => (
                  <div key={resource.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`resource-${resource.id}`}
                      defaultChecked
                      className="mr-2"
                    />
                    <label htmlFor={`resource-${resource.id}`}>
                      {resource.name}
                    </label>
                  </div>
                ))} */}
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  /* Save logic here */
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {selectedRole ? "Update Role" : "Create Role"}
              </button>
            </div>
          </div>
        </ModalComponent>
      )}

      {/* Table for displaying roles */}
      <TablePage
        TableOptions={TableOptions}
        HeaderOptions={HeaderOptions}
        // isLoading={isLoading}
        //   isError={isError}
      />
    </>
  );
};

export default RolePage;
