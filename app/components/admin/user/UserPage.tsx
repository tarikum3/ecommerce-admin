"use client";

import React, { useEffect, useState, useMemo } from "react";

import TablePage, { TablePageProps } from "@components/admin/layout/TablePage";
import { useGetUsersQuery } from "@/lib/admin/store/services/user.service";
import { User } from "@/lib/admin/store/services/user.service";
import { VisibilityOutlined } from "@material-ui/icons";
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

const UserDetail = dynamic(() => import("@components/admin/user/UserDetail"), {
  // loading: () => <ModalSkeleton />,
  ssr: false,
});

const UserPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: allUsers,
    isLoading,
    isError,
  } = useGetUsersQuery({ page, limit });

  // Table columns configuration
  const tableColumns = useMemo(
    () => [
      {
        label: "User ID",
        accessorKey: "id",
        cell: (row: User) => <span>{row.id}</span>,
      },
      {
        label: "Name",
        accessorKey: "firstName",
        cell: (row: User) => (
          <span>
            {row.firstName} {row.lastName}
          </span>
        ),
      },
      {
        label: "Email",
        accessorKey: "email",
        cell: (row: User) => <span>{row.email || "N/A"}</span>,
      },
      {
        label: "Phone",
        accessorKey: "phone",
        cell: (row: User) => <span>{row.phone || "N/A"}</span>,
      },
      {
        label: "Created At",
        accessorKey: "createdAt",
        cell: (row: User) => (
          <span>{new Date(row.createdAt).toLocaleDateString()}</span>
        ),
      },
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
            <Tooltip title="View detail">
              <IconButton
                onClick={() => {
                  setSelectedId(row.id);
                  setModalOpen(true);
                }}
              >
                <VisibilityOutlined />
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
      pageCount: allUsers?.totalPage ?? 1,
      setPagination: setPagination,
      data: allUsers?.users ?? [],
    }),
    [allUsers, tableColumns, pageIndex, pageSize]
  );

  // Header options
  const HeaderOptions = useMemo(
    () => ({
      title: "Users",
      addTitle: "New User",
      onAdd: () => setModalOpen(true),
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
      {/* Modal for creating/editing a user */}

      {modalOpen && (
        <ModalComponent
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedId(null);
          }}
          titles={{
            title: "User Detail",
          }}
          fullWidth={true}
        >
          {selectedId && <UserDetail userId={selectedId} />}
        </ModalComponent>
      )}

      {/* Table for displaying users */}
      <TablePage
        TableOptions={TableOptions}
        HeaderOptions={HeaderOptions}
        isLoading={isLoading}
      />
    </>
  );
};

export default UserPage;
