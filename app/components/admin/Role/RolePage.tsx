"use client";

import React, { useEffect, useState, useMemo } from "react";

import TablePage, { TablePageProps } from "@components/admin/layout/TablePage";
import { useGetRolesQuery } from "@/lib/admin/store/services/role.service";
import { useTranslations } from "next-intl";
import { Role } from "@/lib/admin/store/services/role.service";

import {
  DeleteOutlineOutlined,
  VisibilityOutlined,
  EditOutlined,
} from "@material-ui/icons";
import { IconButton, Tooltip } from "@mui/material";
import dynamic from "next/dynamic";
import { ModalSkeleton } from "@components/admin/ui/Skeletons";

const ModalComponent = dynamic(
  () => import("@components/admin/ui/ModalComponent"),
  {
    loading: () => <ModalSkeleton />,
    ssr: false,
  }
);
const CreateRole = dynamic(() => import("@components/admin/Role/CreateRole"), {
  // loading: () => <ModalSkeleton />,
  ssr: false,
});
const RolePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
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
        // cell: (row: Role) => (
        //   <button
        //     onClick={() => {
        //       //setSelectedRole(row);
        //       setSelectedRoleId(row.id);
        //       setModalOpen(true);
        //     }}
        //     className="text-blue-600 hover:text-blue-800"
        //   >
        //     Edit
        //   </button>
        // ),
        cell: (row: any) => (
          <div className="flex">
            <Tooltip title="Update Role">
              <IconButton
                onClick={() => {
                  setSelectedRoleId(row.id);
                  setModalOpen(true);
                }}
              >
                <EditOutlined />
              </IconButton>
            </Tooltip>

            <Tooltip title="View detail">
              <IconButton onClick={() => {}}>
                <VisibilityOutlined />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete Role">
              <IconButton onClick={() => {}}>
                <DeleteOutlineOutlined />
              </IconButton>
            </Tooltip>
          </div>
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
        setSelectedRoleId(null);
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
            setSelectedRoleId(null);
          }}
          titles={{
            title: selectedRoleId ? "Edit Role" : "Create Role",
            // subtitle: selectedRole ? "Update role details" : "Define a new role"
          }}
          fullWidth={true}
        >
          <CreateRole roleId={selectedRoleId ?? undefined} />
        </ModalComponent>
      )}

      {/* Table for displaying roles */}
      <TablePage
        // TableOptions={TableOptions}
        HeaderOptions={HeaderOptions}
        isLoading={isLoading}
        //   isError={isError}
      />
    </>
  );
};

export default RolePage;
