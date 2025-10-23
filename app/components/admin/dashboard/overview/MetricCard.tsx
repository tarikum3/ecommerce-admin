"use client";
import React, { useMemo } from "react";
import { TrendingUp, TrendingDown } from "@mui/icons-material";

export interface MetricCardProps {
  title: string;
  value: number;
  prevalue?: number;
  icon: React.ReactNode;
}

const MetricCard = React.memo(
  ({ title, value, prevalue, icon }: MetricCardProps) => {
    const trendData = useMemo(() => {
      if (!prevalue) return null;

      const change = ((value - prevalue) / prevalue) * 100;
      const trend: "up" | "down" = change >= 0 ? "up" : "down";
      const changeText = `${Math.abs(change).toFixed(1)}%`;

      return { trend, change: changeText };
    }, [value, prevalue]);

    const trendElement = useMemo(() => {
      if (!trendData) return null;

      return (
        <div
          className={`flex items-center mt-2 text-sm font-medium ${
            trendData.trend === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          {trendData.trend === "up" ? (
            <TrendingUp className="w-4 h-4 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 mr-1" />
          )}
          {trendData.change} from last period
        </div>
      );
    }, [trendData]);

    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-primary-100 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-primary-600 text-sm font-medium">{title}</p>
            <h3 className="text-2xl font-bold text-primary-900 mt-1">
              {value}
            </h3>
            {trendElement}
          </div>
          <div className="p-3 bg-primary-50 rounded-lg">{icon}</div>
        </div>
      </div>
    );
  }
);

export default MetricCard;
MetricCard.displayName = "MetricCard";
