"use client";

import React, { useEffect, useState, useMemo } from "react";

import TablePage, { TablePageProps } from "@components/admin/layout/TablePage";
import { useGetProductsQuery } from "@/lib/admin/store/services/product.service";
import { useTranslations } from "next-intl";
import { Product } from "@/lib/admin/store/services/product.service";

import dynamic from "next/dynamic";
import { ModalSkeleton } from "@components/admin/ui/Skeletons";

const ModalComponent = dynamic(
  () => import("@components/admin/ui/ModalComponent"),
  {
    loading: () => <ModalSkeleton />,
    ssr: false,
  }
);
const CreateProduct = dynamic(
  () => import("@components/admin/Product/CreateProduct"),
  {
    //loading: () => <ModalSkeleton />,
    ssr: false,
  }
);
const ProductPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: allProducts,
    isLoading,
    isError,
  } = useGetProductsQuery({ page, limit });
  console.log("allProductsallProducts", allProducts);
  // Table columns configuration
  const tableColumns = useMemo(
    () => [
      {
        label: "Name",
        accessorKey: "name",
        cell: (row: Product) => <span>{row.name}</span>,
      },
      {
        label: "SKU",
        accessorKey: "sku",
        cell: (row: Product) => <span>{row.sku || "N/A"}</span>,
      },
      {
        label: "Vendor",
        accessorKey: "vendor",
        cell: (row: Product) => <span>{row.vendor || "N/A"}</span>,
      },
      {
        label: "Category",
        accessorKey: "category",
        cell: (row: Product) => <span>{row.category || "N/A"}</span>,
      },
      {
        label: "Available for Sale",
        accessorKey: "availableForSale",
        cell: (row: Product) => (
          <span>{row.availableForSale ? "Yes" : "No"}</span>
        ),
      },
    ],
    [allProducts, pageIndex, pageSize]
  );

  const TableOptions = useMemo(
    () => ({
      columns: tableColumns,
      pageIndex: pageIndex,
      pageSize: pageSize,
      pageCount: allProducts?.total ?? 1,
      setPagination: setPagination,
      data: allProducts?.products ?? [],
    }),
    [allProducts, tableColumns, pageIndex, pageSize]
  );

  // Header options
  const HeaderOptions = useMemo(
    () => ({
      title: "Products",
      addTitle: "New Product",
      // onAdd: () => setModalOpen(true),
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
      {modalOpen && (
        <ModalComponent
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          titles={{ title: "Create Product" }}
          fullWidth={true}
        >
          {/* Add your product form here */}
          {/* <div>
            <h2>Create Product</h2>
            
          </div> */}
          <CreateProduct />
        </ModalComponent>
      )}

      <TablePage
        TableOptions={TableOptions}
        HeaderOptions={HeaderOptions}
        isLoading={isLoading}
        //isError={isError}
      />
    </>
  );
};

export default ProductPage;
