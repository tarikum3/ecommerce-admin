"use client";

import { memo, useState, useEffect, useCallback } from "react";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import { IconButton, Tooltip } from "@mui/material";
import { CircularProgress } from "@mui/material";

interface ExportExcelProps {
  data: Record<string, unknown>[];
  headers: string[];
  fileName?: string;
  className?: string;
  iconClassName?: string;
  tooltipTitle?: string;
}

const ExportExcel = memo(function ExportExcel({
  data,
  headers,
  fileName = "exported-data",
  className = "bg-primary-300 hover:bg-primary-400 text-primary-800",
  iconClassName = "",
  tooltipTitle = "Export to Excel",
}: ExportExcelProps) {
  const [isExporting, setIsExporting] = useState(false);
  // const [shouldExport, setShouldExport] = useState(false);
  console.log("datafromexportexcelfromcomp", data);
  const exportDataAsync = useCallback(async () => {
    // setIsExporting(true);
    try {
      const { exportData } = await import("@/lib/admin/utils/exportData");
      exportData(data, headers, fileName);
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setIsExporting(false);
    }
  }, [data, headers, fileName]);

  useEffect(() => {
    if (isExporting) {
      exportDataAsync();
    }
  }, [isExporting]);

  const handleExport = useCallback(() => {
    // if (!isExporting) {
    //   setShouldExport(true);
    // }
    setIsExporting(true);
  }, [isExporting]);

  return (
    <Tooltip title={isExporting ? "Exporting..." : tooltipTitle} arrow>
      <IconButton
        onClick={handleExport}
        className={className}
        aria-label={isExporting ? "Exporting data" : "Export data"}
        disabled={isExporting}
      >
        {isExporting ? (
          <CircularProgress size={24} className={iconClassName} />
        ) : (
          <GetAppOutlinedIcon className={iconClassName} />
        )}
      </IconButton>
    </Tooltip>
  );
});

export default ExportExcel;
