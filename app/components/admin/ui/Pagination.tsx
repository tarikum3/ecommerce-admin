// "use client";
// import React from "react";
// import { IconButton, Tooltip } from "@mui/material";
// import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
// import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
// import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
// import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";

// interface PaginationProps {
//   pageIndex: number;
//   pageCount: number;
//   pageSize: number;
//   onPageChange: (newPageIndex: number) => void;
//   onPageSizeChange: (newPageSize: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   pageIndex,
//   pageCount,
//   pageSize,
//   onPageChange,
//   onPageSizeChange,
// }) => {
//   return (
//     <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
//       <Tooltip title="First Page">
//         <IconButton
//           onClick={() => onPageChange(0)}
//           disabled={pageIndex === 0}
//           className="border border-primary-300 rounded p-1 hover:bg-primary-400"
//         >
//           <KeyboardDoubleArrowLeftOutlinedIcon />
//         </IconButton>
//       </Tooltip>
//       <Tooltip title="Previous Page">
//         <IconButton
//           onClick={() => onPageChange(pageIndex - 1)}
//           disabled={pageIndex === 0}
//           className="border border-primary-300 rounded p-1 hover:bg-primary-400"
//         >
//           <NavigateBeforeOutlinedIcon />
//         </IconButton>
//       </Tooltip>
//       <Tooltip title="Next Page">
//         <IconButton
//           onClick={() => onPageChange(pageIndex + 1)}
//           disabled={pageIndex >= pageCount - 1}
//           className="border border-primary-300 rounded p-1 hover:bg-primary-400"
//         >
//           <KeyboardArrowRightOutlinedIcon />
//         </IconButton>
//       </Tooltip>
//       <Tooltip title="Last Page">
//         <IconButton
//           onClick={() => onPageChange(pageCount - 1)}
//           disabled={pageIndex >= pageCount - 1}
//           className="border border-primary-300 rounded p-1 hover:bg-primary-400"
//         >
//           <KeyboardDoubleArrowRightOutlinedIcon />
//         </IconButton>
//       </Tooltip>
//       <span className="flex items-center gap-1">
//         <span>Page</span>
//         <strong>
//           {pageIndex + 1} of {pageCount}
//         </strong>
//       </span>
//       <span className="flex items-center gap-1">
//         <span>Set page size:</span>
//         <input
//           type="number"
//           defaultValue={pageSize}
//           onChange={(e) => onPageSizeChange(Number(e.target.value))}
//           className="border border-primary-300 rounded p-1 w-16 bg-primary-0 "
//         />
//       </span>
//     </div>
//   );
// };

// export default Pagination;

"use client";
import React, { useCallback, memo } from "react";
import { IconButton, Tooltip, TextField } from "@mui/material";
import {
  NavigateBeforeOutlined as PreviousIcon,
  KeyboardArrowRightOutlined as NextIcon,
  KeyboardDoubleArrowLeftOutlined as FirstIcon,
  KeyboardDoubleArrowRightOutlined as LastIcon,
} from "@mui/icons-material";

interface PaginationProps {
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  onPageChange: (newPageIndex: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
}

const Pagination: React.FC<PaginationProps> = memo(
  ({ pageIndex, pageCount, pageSize, onPageChange, onPageSizeChange }) => {
    const handleFirstPage = useCallback(() => onPageChange(0), [onPageChange]);
    const handlePreviousPage = useCallback(
      () => onPageChange(pageIndex - 1),
      [onPageChange, pageIndex]
    );
    const handleNextPage = useCallback(
      () => onPageChange(pageIndex + 1),
      [onPageChange, pageIndex]
    );
    const handleLastPage = useCallback(
      () => onPageChange(pageCount - 1),
      [onPageChange, pageCount]
    );

    const handlePageSizeChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, Number(e.target.value)); // Ensure minimum page size of 1
        onPageSizeChange(value);
      },
      [onPageSizeChange]
    );

    return (
      <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
        <PaginationButton
          title="First Page"
          onClick={handleFirstPage}
          disabled={pageIndex === 0}
          icon={<FirstIcon />}
        />
        <PaginationButton
          title="Previous Page"
          onClick={handlePreviousPage}
          disabled={pageIndex === 0}
          icon={<PreviousIcon />}
        />
        <PaginationButton
          title="Next Page"
          onClick={handleNextPage}
          disabled={pageIndex >= pageCount - 1}
          icon={<NextIcon />}
        />
        <PaginationButton
          title="Last Page"
          onClick={handleLastPage}
          disabled={pageIndex >= pageCount - 1}
          icon={<LastIcon />}
        />

        <span className="flex items-center gap-1">
          <span>Page</span>
          <strong>
            {pageIndex + 1} of {Math.max(1, pageCount)}{" "}
            {/* Ensure at least 1 page */}
          </strong>
        </span>

        <TextField
          label="Page Size"
          type="number"
          size="small"
          value={pageSize}
          onChange={handlePageSizeChange}
          inputProps={{
            min: 1,
            className: "w-16 py-1",
          }}
          variant="outlined"
        />
      </div>
    );
  }
);

// Extracted button component for better reusability and performance
const PaginationButton = memo(
  ({
    title,
    onClick,
    disabled,
    icon,
  }: {
    title: string;
    onClick: () => void;
    disabled: boolean;
    icon: React.ReactNode;
  }) => (
    <Tooltip title={title}>
      <IconButton
        onClick={onClick}
        disabled={disabled}
        className="border border-primary-300 rounded p-1 hover:bg-primary-400"
        aria-label={title.toLowerCase()}
      >
        {icon}
      </IconButton>
    </Tooltip>
  )
);

export default Pagination;
