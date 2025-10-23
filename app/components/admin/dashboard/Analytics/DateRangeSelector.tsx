// components/dashboard/DateRangeSelector.tsx
"use client";

import { useState } from "react";
import { Select, MenuItem, Button } from "@mui/material";
import { Download } from "@mui/icons-material";

interface DateRangeSelectorProps {
  onRangeChange?: (range: string) => void;
  onExport?: () => void;
}

export default function DateRangeSelector({
  onRangeChange,
  onExport,
}: DateRangeSelectorProps) {
  const [selectedRange, setSelectedRange] = useState("7");

  const ranges = [
    { value: "7", label: "Last 7 days" },
    { value: "30", label: "Last 30 days" },
    { value: "90", label: "Last 90 days" },
    { value: "365", label: "Last year" },
    { value: "custom", label: "Custom range" },
  ];

  const handleChange = (value: string) => {
    setSelectedRange(value);
    if (onRangeChange) {
      onRangeChange(value);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-primary-900">
          Analytics Overview
        </h1>
        <p className="text-primary-600">Track your e-commerce performance</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Select
          value={selectedRange}
          onChange={(e) => handleChange(e.target.value)}
          className="min-w-[160px] bg-white"
          size="small"
        >
          {ranges.map((range) => (
            <MenuItem key={range.value} value={range.value}>
              {range.label}
            </MenuItem>
          ))}
        </Select>

        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={onExport}
          className="bg-primary-600 hover:bg-primary-700"
        >
          Export
        </Button>
      </div>
    </div>
  );
}
