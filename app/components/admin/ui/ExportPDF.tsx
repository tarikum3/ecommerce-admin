"use client";

import { memo, useState, useEffect, useCallback } from "react";
import PrintIcon from "@mui/icons-material/Print";
import { IconButton, Tooltip } from "@mui/material";
import { CircularProgress } from "@mui/material";

interface ExportPDFProps {
  title?: string;
  headers: string[];
  data: Record<string, unknown>[];
  startDate?: Date | null;
  endDate?: Date | null;
  className?: string;
  iconClassName?: string;
  tooltipTitle?: string;
}

const ExportPDF = memo(function ExportPDF({
  title = "table data",
  headers,
  data,
  startDate = null,
  endDate = null,
  className = "bg-primary-300 hover:bg-primary-400 text-primary-800",
  iconClassName = "",
  tooltipTitle = "Export to PDF",
}: ExportPDFProps) {
  const [isExporting, setIsExporting] = useState(false);

  const exportPdfAsync = useCallback(async () => {
    try {
      const { exportPDF } = await import("@/lib/admin/utils/exportPDF");
      await exportPDF({
        title,
        headers: [headers],
        data,
        startDate,
        endDate,
      });
    } catch (err) {
      console.error("PDF export failed:", err);
    } finally {
      setIsExporting(false);
    }
  }, [title, headers, data, startDate, endDate]);

  useEffect(() => {
    if (isExporting) {
      exportPdfAsync();
    }
  }, [isExporting, exportPdfAsync]);

  const handleExport = useCallback(() => {
    setIsExporting(true);
  }, []);

  return (
    <Tooltip title={isExporting ? "Exporting PDF..." : tooltipTitle} arrow>
      <IconButton
        onClick={handleExport}
        className={className}
        aria-label={isExporting ? "Exporting PDF" : "Export to PDF"}
        disabled={isExporting}
      >
        {isExporting ? (
          <CircularProgress size={24} className={iconClassName} />
        ) : (
          <PrintIcon className={iconClassName} />
        )}
      </IconButton>
    </Tooltip>
  );
});

export default ExportPDF;
