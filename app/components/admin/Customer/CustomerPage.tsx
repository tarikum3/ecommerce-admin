"use client";

import React, { useEffect, useState, useMemo } from "react";

import TablePage, { TablePageProps } from "@components/admin/layout/TablePage";
import { useGetCustomersQuery } from "@/lib/admin/store/services/customer.service";
import { Customer } from "@/lib/admin/store/services/customer.service";
import dynamic from "next/dynamic";
import { ModalSkeleton } from "@components/admin/ui/Skeletons";

const ModalComponent = dynamic(
  () => import("@components/admin/ui/ModalComponent"),
  {
    loading: () => <ModalSkeleton />,
    ssr: false,
  }
);
const CustomerPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: allCustomers,
    isLoading,
    isError,
  } = useGetCustomersQuery({ page, limit });

  // Table columns configuration
  const tableColumns = useMemo(
    () => [
      {
        label: "Customer ID",
        accessorKey: "id",
        cell: (row: Customer) => <span>{row.id}</span>,
      },
      {
        label: "Name",
        accessorKey: "firstName",
        cell: (row: Customer) => (
          <span>
            {row.firstName} {row.lastName}
          </span>
        ),
      },
      {
        label: "Email",
        accessorKey: "email",
        cell: (row: Customer) => <span>{row.email || "N/A"}</span>,
      },
      {
        label: "Phone",
        accessorKey: "phone",
        cell: (row: Customer) => <span>{row.phone || "N/A"}</span>,
      },
      {
        label: "Total Orders",
        accessorKey: "totalOrders",
        cell: (row: Customer) => <span>{row.totalOrders}</span>,
      },
      {
        label: "Total Spent",
        accessorKey: "totalSpent",
        cell: (row: Customer) => <span>${row.totalSpent.toFixed(2)}</span>,
      },
    ],
    []
  );

  const TableOptions = useMemo(
    () => ({
      columns: tableColumns,
      pageIndex: pageIndex,
      pageSize: pageSize,
      pageCount: allCustomers?.length ?? 1,
      setPagination: setPagination,
      data: allCustomers ?? [],
    }),
    [allCustomers, tableColumns, pageIndex, pageSize]
  );

  // Header options
  const HeaderOptions = useMemo(
    () => ({
      title: "Customers",
      addTitle: "New Customer",
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
      {/* Modal for creating/editing a customer */}
      {modalOpen && (
        <ModalComponent
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          titles={{ title: "Create Customer" }}
          fullWidth={true}
        >
          <></>
        </ModalComponent>
      )}

      {/* Table for displaying customers */}
      <TablePage
        TableOptions={TableOptions}
        HeaderOptions={HeaderOptions}
        isLoading={isLoading}
      />
    </>
  );
};

export default CustomerPage;
