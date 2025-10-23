"use client";
import { TableSortLabel } from "@mui/material";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useTransition,
} from "react";
import dynamic from "next/dynamic";
import { sortData, getNestedValue } from "@/lib/admin/utils/exportData";

// Skeleton Components
export const IconSkeleton = () => <div className="bg-primary-300 size-6"></div>;

export const PaginationSkeleton = () => (
  <div className="flex flex-wrap justify-center items-center gap-2 mt-4 animate-pulse">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="h-10 w-10 bg-primary-300 rounded"></div>
    ))}
    <div className="flex items-center gap-1">
      <div className="h-5 w-10 bg-primary-300 rounded"></div>
      <div className="h-5 w-20 bg-primary-300 rounded"></div>
    </div>
    <div className="flex items-center gap-1">
      <div className="h-5 w-20 bg-primary-300 rounded"></div>
      <div className="h-8 w-16 bg-primary-300 rounded"></div>
    </div>
  </div>
);

// Dynamic Imports
const ExportExcel = dynamic(
  () => import("@/app/components/admin/ui/ExportExcel"),
  {
    loading: () => <IconSkeleton />,
    ssr: false,
  }
);

const ExportPDF = dynamic(() => import("@/app/components/admin/ui/ExportPDF"), {
  loading: () => <IconSkeleton />,
  ssr: false,
});

const Pagination = dynamic(() => import("@components/admin/ui/Pagination"), {
  loading: () => <PaginationSkeleton />,
  ssr: false,
});

type Column = {
  label: string;
  accessorKey: string;
  cell?: (rowData: any) => React.ReactNode;
};

export interface CustomTableProps {
  data: any[];
  columns: Column[];
  options?: { label: string; value: string }[];
  pageCount?: number;
  pageIndex?: number;
  pageSize?: number;
  onOptionChange?: (selectedOption: string) => void;
  onTableDateRangeChange?: (dateRange: { start: Date; end: Date }) => void;
  setPagination?: React.Dispatch<
    React.SetStateAction<{ pageIndex: number; pageSize: number }>
  >;
}

const CustomTable: React.FC<CustomTableProps> = ({
  data,
  columns,
  pageIndex = 0,
  pageSize = 10,
  pageCount = 0,
  setPagination,
  options,
  onOptionChange,
  onTableDateRangeChange,
}) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [sortedData, setSortedData] = useState<any[]>(data);
  console.log("customtabledata", data);
  // Memoized headers
  const headers = useMemo(() => columns.map((item) => item.label), [columns]);

  // Memoized filtered data for export
  const filteredData = useMemo(() => {
    const accessors = columns.map((item) => item.accessorKey);
    return sortedData.map((item) => {
      return accessors.reduce((acc, key, index) => {
        acc[headers[index]] = getNestedValue(item, key);
        return acc;
      }, {} as Record<string, unknown>);
    });
  }, [sortedData, headers, columns]);
  const filteredDataPDF = useMemo(() => {
    const accessors = columns.map((item) => item.accessorKey);
    return sortedData.map((item) => {
      return accessors.reduce((acc, key, index) => {
        acc[index] = getNestedValue(item, key);
        return acc;
      }, {} as Record<string, unknown>);
    });
  }, [sortedData, headers, columns]);
  // Handle sort with transition
  const handleRequestSort = useCallback(
    (property: string) => {
      const newOrder = orderBy === property && order === "asc" ? "desc" : "asc";
      setOrder(newOrder);
      setOrderBy(property);

      startTransition(() => {
        const newSortedData = sortData(data, property, newOrder);
        setSortedData(newSortedData);
      });
    },
    [data, order, orderBy]
  );

  // Sync with external data changes
  useEffect(() => {
    if (!orderBy) {
      setSortedData(data);
    } else {
      startTransition(() => {
        const newSortedData = sortData(data, orderBy, order);
        setSortedData(newSortedData);
      });
    }
  }, [data, order, orderBy]);

  const handlePageChange = useCallback(
    (newPageIndex: number) => {
      setPagination?.((prev) => ({ ...prev, pageIndex: newPageIndex }));
    },
    [setPagination]
  );

  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      if (setPagination && newPageSize > 0) {
        setPagination({ pageIndex: 0, pageSize: newPageSize });
      }
    },
    [setPagination]
  );

  return (
    <div className="container mx-auto p-4 w-full relative">
      {/* Loading indicator when sorting is in progress */}
      {isPending && (
        <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-primary-0 p-4 rounded shadow-lg flex items-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-500"></div>
            <span>Sorting data...</span>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div
        className={`flex flex-wrap justify-between gap-2 py-2 ${
          isPending ? "opacity-70" : ""
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          {/* Optional filters can be added here */}
        </div>

        <div className="flex items-center gap-2">
          <ExportPDF
            title="Export Data"
            headers={headers}
            data={filteredDataPDF}
            startDate={new Date("2023-01-01")}
            endDate={new Date("2023-12-31")}
            tooltipTitle="Generate PDF report"
          />
          <ExportExcel
            fileName="exported_data"
            headers={headers}
            data={filteredData}
          />
        </div>
      </div>

      {/* Table Section */}
      <div
        className={`overflow-x-auto bg-primary-0 shadow-md rounded-md border border-primary-200 dark:bg-primary-100 ${
          isPending ? "opacity-80" : ""
        }`}
      >
        <table className="min-w-full table-auto" aria-label="Data table">
          <thead className="bg-primary-300 text-primary-800">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessorKey}
                  className="px-4 py-2 text-left border-b border-primary-200"
                  //aria-sort={orderBy === col.accessorKey ? order : undefined}
                >
                  <TableSortLabel
                    active={orderBy === col.accessorKey}
                    direction={orderBy === col.accessorKey ? order : "asc"}
                    onClick={() =>
                      !isPending && handleRequestSort(col.accessorKey)
                    }
                    disabled={isPending}
                  >
                    {col.label}
                  </TableSortLabel>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((row, index) => (
                <tr
                  key={`row-${index}`}
                  className="text-primary-500 hover:bg-primary-200"
                >
                  {columns.map((col) => (
                    <td
                      key={`${col.accessorKey}-${index}`}
                      className="px-4 py-2 border-b border-primary-200"
                    >
                      <span className="block sm:hidden font-semibold">
                        {col.label}:
                      </span>
                      {col.cell
                        ? col.cell(row)
                        : getNestedValue(row, col.accessorKey) || "-"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-primary-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      {pageCount > 0 && (
        <div className={isPending ? "opacity-70" : ""}>
          <Pagination
            pageIndex={pageIndex}
            pageCount={pageCount}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            // disabled={isPending}
          />
        </div>
      )}
    </div>
  );
};

export default CustomTable;
