// "use client";
// import { TableSortLabel } from "@mui/material";
// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useMemo,
//   useTransition,
// } from "react";
// import dynamic from "next/dynamic";
// import { sortData, getNestedValue } from "@/lib/admin/utils/exportData";

// // Skeleton Components
// export const IconSkeleton = () => <div className="bg-primary-300 size-6"></div>;

// export const PaginationSkeleton = () => (
//   <div className="flex flex-wrap justify-center items-center gap-2 mt-4 animate-pulse">
//     {[...Array(4)].map((_, i) => (
//       <div key={i} className="h-10 w-10 bg-primary-300 rounded"></div>
//     ))}
//     <div className="flex items-center gap-1">
//       <div className="h-5 w-10 bg-primary-300 rounded"></div>
//       <div className="h-5 w-20 bg-primary-300 rounded"></div>
//     </div>
//     <div className="flex items-center gap-1">
//       <div className="h-5 w-20 bg-primary-300 rounded"></div>
//       <div className="h-8 w-16 bg-primary-300 rounded"></div>
//     </div>
//   </div>
// );

// // Dynamic Imports
// const ExportExcel = dynamic(
//   () => import("@/app/components/admin/ui/ExportExcel"),
//   {
//     loading: () => <IconSkeleton />,
//     ssr: false,
//   }
// );

// const ExportPDF = dynamic(() => import("@/app/components/admin/ui/ExportPDF"), {
//   loading: () => <IconSkeleton />,
//   ssr: false,
// });

// const Pagination = dynamic(() => import("@components/admin/ui/Pagination"), {
//   loading: () => <PaginationSkeleton />,
//   ssr: false,
// });

// type Column = {
//   label: string;
//   accessorKey: string;
//   cell?: (rowData: any) => React.ReactNode;
// };

// export interface CustomTableProps {
//   data: any[];
//   columns: Column[];
//   options?: { label: string; value: string }[];
//   pageCount?: number;
//   pageIndex?: number;
//   pageSize?: number;
//   onOptionChange?: (selectedOption: string) => void;
//   onTableDateRangeChange?: (dateRange: { start: Date; end: Date }) => void;
//   setPagination?: React.Dispatch<
//     React.SetStateAction<{ pageIndex: number; pageSize: number }>
//   >;
// }

// const CustomTable: React.FC<CustomTableProps> = ({
//   data,
//   columns,
//   pageIndex = 0,
//   pageSize = 10,
//   pageCount = 0,
//   setPagination,
//   options,
//   onOptionChange,
//   onTableDateRangeChange,
// }) => {
//   const [order, setOrder] = useState<"asc" | "desc">("asc");
//   const [orderBy, setOrderBy] = useState<string>("");
//   const [isPending, startTransition] = useTransition();
//   const [sortedData, setSortedData] = useState<any[]>(data);

//   // Memoized headers
//   const headers = useMemo(() => columns.map((item) => item.label), [columns]);

//   // Memoized filtered data for export
//   const filteredData = useMemo(() => {
//     const accessors = columns.map((item) => item.accessorKey);
//     return sortedData.map((item) => {
//       return accessors.reduce((acc, key, index) => {
//         acc[headers[index]] = getNestedValue(item, key);
//         return acc;
//       }, {} as Record<string, unknown>);
//     });
//   }, [sortedData, headers, columns]);

//   // Handle sort with transition
//   const handleRequestSort = useCallback(
//     (property: string) => {
//       const newOrder = orderBy === property && order === "asc" ? "desc" : "asc";
//       setOrder(newOrder);
//       setOrderBy(property);

//       startTransition(() => {
//         const newSortedData = sortData(data, property, newOrder);
//         setSortedData(newSortedData);
//       });
//     },
//     [data, order, orderBy]
//   );

//   // Sync with external data changes
//   useEffect(() => {
//     if (!orderBy) {
//       setSortedData(data);
//     } else {
//       startTransition(() => {
//         const newSortedData = sortData(data, orderBy, order);
//         setSortedData(newSortedData);
//       });
//     }
//   }, [data, order, orderBy]);

//   const handlePageChange = useCallback(
//     (newPageIndex: number) => {
//       setPagination?.((prev) => ({ ...prev, pageIndex: newPageIndex }));
//     },
//     [setPagination]
//   );

//   const handlePageSizeChange = useCallback(
//     (newPageSize: number) => {
//       if (setPagination && newPageSize > 0) {
//         setPagination({ pageIndex: 0, pageSize: newPageSize });
//       }
//     },
//     [setPagination]
//   );
//   console.log("datafromexportpdffromtable", filteredData);
//   return (
//     <div className="container mx-auto p-4 w-full relative">
//       {/* Loading indicator when sorting is in progress */}
//       {isPending && (
//         <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 pointer-events-none">
//           <div className="bg-white p-4 rounded shadow-lg flex items-center gap-2">
//             <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-500"></div>
//             <span>Sorting data...</span>
//           </div>
//         </div>
//       )}

//       {/* Header Section */}
//       <div
//         className={`flex flex-wrap justify-between gap-2 py-2 ${
//           isPending ? "opacity-70" : ""
//         }`}
//       >
//         <div className="flex flex-wrap items-center gap-2">
//           {/* Optional filters can be added here */}
//         </div>

//         <div className="flex items-center gap-2">
//           <ExportPDF
//             title="Export Data"
//             headers={headers}
//             data={filteredData}
//             startDate={new Date("2023-01-01")}
//             endDate={new Date("2023-12-31")}
//             tooltipTitle="Generate PDF report"
//           />
//           <ExportExcel
//             fileName="exported_data"
//             headers={headers}
//             data={filteredData}
//           />
//         </div>
//       </div>

//       {/* Table Section */}
//       <div
//         className={`overflow-x-auto bg-primary-0 shadow-md rounded-md border border-primary-200 dark:bg-primary-100 ${
//           isPending ? "opacity-80" : ""
//         }`}
//       >
//         <table className="min-w-full table-auto" aria-label="Data table">
//           <thead className="bg-primary-300 text-primary-800">
//             <tr>
//               {columns.map((col) => (
//                 <th
//                   key={col.accessorKey}
//                   className="px-4 py-2 text-left border-b border-primary-200"
//                   //aria-sort={orderBy === col.accessorKey ? order : undefined}
//                 >
//                   <TableSortLabel
//                     active={orderBy === col.accessorKey}
//                     direction={orderBy === col.accessorKey ? order : "asc"}
//                     onClick={() =>
//                       !isPending && handleRequestSort(col.accessorKey)
//                     }
//                     disabled={isPending}
//                   >
//                     {col.label}
//                   </TableSortLabel>
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {sortedData.length > 0 ? (
//               sortedData.map((row, index) => (
//                 <tr
//                   key={`row-${index}`}
//                   className="text-primary-500 hover:bg-primary-200"
//                 >
//                   {columns.map((col) => (
//                     <td
//                       key={`${col.accessorKey}-${index}`}
//                       className="px-4 py-2 border-b border-primary-200"
//                     >
//                       <span className="block sm:hidden font-semibold">
//                         {col.label}:
//                       </span>
//                       {col.cell
//                         ? col.cell(row)
//                         : getNestedValue(row, col.accessorKey) || "-"}
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan={columns.length}
//                   className="px-4 py-8 text-center text-primary-500"
//                 >
//                   No data available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Section */}
//       {pageCount > 1 && (
//         <div className={isPending ? "opacity-70" : ""}>
//           <Pagination
//             pageIndex={pageIndex}
//             pageCount={pageCount}
//             pageSize={pageSize}
//             onPageChange={handlePageChange}
//             onPageSizeChange={handlePageSizeChange}
//             // disabled={isPending}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomTable;

"use client";
import { TableSortLabel } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";

import { exportPDF } from "@/lib/admin/utils/exportPDF";
import {
  exportData,
  sortData,
  getNestedValue,
} from "@/lib/admin/utils/exportData";

import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import Print from "@mui/icons-material/Print";

// import DateRangeComponent, {
//   DateRangeValue,
// } from "@components/admin/components/ui/CustomDateRange";
import { IconButton, Tooltip } from "@mui/material";

import { startOfDay, endOfDay, subDays } from "date-fns";
import { dateFormatDays } from "@/lib/admin/utils/dayjs";

import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
type Columns = {
  label: string;
  accessorKey: string;
  cell?: (...args: any) => any;
}[];
export interface CustomTableProps {
  data: any[];
  onOptionChange?: (...args: any) => any;
  onTableDateRangeChange?: (...args: any) => any;
  options?: { label: string; value: string }[];
  columns: Columns;
  pageCount?: number;
  pageIndex?: number;
  pageSize?: number;
  setPagination?: React.Dispatch<
    React.SetStateAction<{ pageIndex: number; pageSize: number }>
  >;
}

const CustomTable: React.FC<CustomTableProps> = ({
  data,
  onOptionChange,
  pageIndex,
  pageSize,
  pageCount,
  setPagination,
  onTableDateRangeChange,
  options,
  columns,
}) => {
  const [selectedRange, setSelectedRange] = useState<string>("today");
  const [tableCol, setTableCol] = useState<Columns | null>();
  const [tableData, setTableData] = useState<any[]>([]);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("");
  const [dateRangeModal, setDateRangeModal] = useState(false);
  const [dateRange, setDateRange] = useState<any>({});

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [tableDropdownOptions, setTableDropdownOptions] = useState("");

  const tableOptions = [
    { label: "Today", value: "today" },
    { label: "Last 7 Days", value: "last7days" },
    { label: "Last 30 Days", value: "lastMonth" },
  ];

  const handlePageChange = (newPageIndex: number) => {
    if (setPagination) {
      setPagination((prev) => ({ ...prev, pageIndex: newPageIndex }));
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    if (setPagination && newPageSize > 0) {
      setPagination({ pageIndex: 0, pageSize: newPageSize });
    }
  };

  const handleChangeRange = (range: string) => {
    setSelectedRange(range);
    // Implement logic to fetch data for selected range if needed
    if (onOptionChange) {
      onOptionChange(range);
    }
  };
  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";

    setOrder((prev) => {
      return prev == "desc" ? "asc" : "desc";
    });
    setOrderBy(property);
    let isAscB = isAsc ? false : true;
    //sortData(property, isAscB);
  };
  const handleOnDateRangeToggle = useCallback((value?: boolean) => {
    setDateRangeModal(value ?? false);
  }, []);

  const generatePDF = () => {
    const headersCl = columns.map((item: any) => item.label);
    const headers = columns.map((item: any) => item.accessorKey);
    const filteredData = tableData.map((item: any) => {
      return headers.reduce((acc, value, key) => {
        const Value = getNestedValue(item, value);
        // acc[key] = customer[value];
        acc[key] = Value;
        return acc;
      }, {});
    });

    exportPDF({
      title: "table data",
      headers: [headersCl],
      data: filteredData,
      startDate: dateRange?.startDate ? new Date(dateRange?.startDate) : null,
      endDate: dateRange?.endDate ? new Date(dateRange?.endDate) : null,
    });
  };

  const handleExportPDF = () => {
    generatePDF();
  };

  const handleExportExcel = () => {
    // const data = formatData(tableCustomerData);
    const headers = columns.map((item: any) => item.accessorKey);

    const headersCl = columns.map((item: any) => item.label);
    const filteredData = tableData.map((item: any) => {
      return headers.reduce((acc, value, key) => {
        const Value = getNestedValue(item, value);
        // acc[key] = customer[value];
        acc[headersCl[key]] = Value;
        return acc;
      }, {});
    });

    exportData(filteredData, headersCl, "table data");
  };

  // const handleDateRangeChange = useCallback((value: DateRangeValue) => {
  //   setDateRange(value);
  // }, []);
  useEffect(() => {
    if (data && data?.length >= 0) {
      setTableData(() => {
        if (orderBy) {
          const sortedData = sortData(data, orderBy, order);
          return sortedData;
        }
        return data;
      });
    }
  }, [data, order, orderBy]);

  useEffect(() => {
    setTableCol(columns);
  }, [columns]);

  useEffect(() => {
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());
    const last7DaysStart = startOfDay(subDays(todayStart, 7));

    const last30DaysStart = startOfDay(subDays(todayStart, 30));
    let startDate = dateFormatDays(todayStart, "YYYY-MM-DD");
    let endDate = dateFormatDays(todayEnd, "YYYY-MM-DD");
    if (tableDropdownOptions == "last7days") {
      startDate = dateFormatDays(last7DaysStart, "YYYY-MM-DD");
      endDate = dateFormatDays(todayEnd, "YYYY-MM-DD");
    }
    if (tableDropdownOptions == "lastMonth") {
      startDate = dateFormatDays(last30DaysStart, "YYYY-MM-DD");
      endDate = dateFormatDays(todayEnd, "YYYY-MM-DD");
    }
    setFromDate(startDate);
    setToDate(endDate);
  }, [tableDropdownOptions]);
  useEffect(() => {
    if (dateRange?.startDate && dateRange?.endDate) {
      setToDate(dateRange?.endDate);
      setFromDate(dateRange?.startDate);
    } else {
      setToDate("");
      setFromDate("");
    }
  }, [dateRange]);
  useEffect(() => {
    if (onTableDateRangeChange) {
      onTableDateRangeChange({ startDate: fromDate, endDate: toDate });
    }
  }, [toDate, fromDate]);

  return (
    <div className="container mx-auto p-4 w-full ">
      {/* Header Section */}
      <div className="flex flex-wrap justify-between gap-2 py-2">
        <div className="flex flex-wrap items-center gap-2">
          {/* {onTableDateRangeChange && (
            <DateRangeComponent
              open={dateRangeModal}
              onChange={handleDateRangeChange}
              toggle={handleOnDateRangeToggle}
            />
          )} */}
        </div>
        <div className="flex items-center gap-2">
          <Tooltip title="Export">
            <IconButton
              onClick={handleExportExcel}
              className="bg-primary-300 hover:bg-primary-400 text-primary-800"
            >
              <GetAppOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton
              onClick={handleExportPDF}
              className="bg-primary-300 hover:bg-primary-400 text-primary-800"
            >
              <Print />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white shadow-md rounded-md border border-primary-200 dark:bg-primary-100">
        <table className="min-w-full table-auto">
          {/* Table Head */}
          <thead className="bg-primary-300  text-primary-800">
            <tr>
              {tableCol?.map((col) => (
                <th
                  key={col.accessorKey}
                  className="px-4 py-2 text-left border-b border-primary-200"
                >
                  <TableSortLabel
                    active={orderBy === col.accessorKey}
                    direction={orderBy === col.accessorKey ? order : "asc"}
                    onClick={() => handleRequestSort(col.accessorKey)}
                  >
                    {col.label}
                  </TableSortLabel>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {tableData?.map((row, index) => (
              <tr
                key={index}
                className="text-primary-500 hover:bg-primary-200 "
              >
                {tableCol?.map((col) => (
                  <td
                    key={col.accessorKey}
                    className="px-4 py-2 border-b border-primary-200"
                  >
                    {/* Mobile view label */}
                    <span className="block sm:hidden font-semibold">
                      {col.label}:
                    </span>
                    {col.cell
                      ? col.cell(row)
                      : getNestedValue(row, col.accessorKey) || ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      {tableData?.length > 0 && pageCount && (pageIndex || pageIndex === 0) && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
          <IconButton
            onClick={() => handlePageChange(0)}
            disabled={pageIndex === 0}
            className="border border-primary-300 rounded p-1 hover:bg-primary-400"
          >
            <KeyboardDoubleArrowLeftOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={() => handlePageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
            className="border border-primary-300 rounded p-1 hover:bg-primary-400"
          >
            <NavigateBeforeOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={() => handlePageChange(pageIndex + 1)}
            disabled={pageIndex >= pageCount - 1}
            className="border border-primary-300 rounded p-1 hover:bg-primary-400"
          >
            <KeyboardArrowRightOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={() => handlePageChange(pageCount - 1)}
            disabled={pageIndex >= pageCount - 1}
            className="border border-primary-300 rounded p-1 hover:bg-primary-400"
          >
            <KeyboardDoubleArrowRightOutlinedIcon />
          </IconButton>
          <span className="flex items-center gap-1">
            <span>Page</span>
            <strong>
              {pageIndex + 1} of {pageCount}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            <span>Set page size:</span>
            <input
              type="number"
              defaultValue={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="border border-primary-300 rounded p-1 w-16 bg-white"
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default CustomTable;
