// components/dashboard/MetricCard.tsx
"use client";
import { Card, CardContent, Skeleton } from "@mui/material";
import { TrendingUp, TrendingDown } from "@mui/icons-material";

interface MetricCardProps {
  title: string;
  value?: string | number;
  growth?: number;
  icon: React.ReactNode;
  color: "primary" | "green" | "blue" | "purple";
  loading?: boolean;
}

const colorClasses = {
  primary: "bg-primary-100 text-primary-600",
  green: "bg-green-100 text-green-600",
  blue: "bg-blue-100 text-blue-600",
  purple: "bg-purple-100 text-purple-600",
};

export default function MetricCard({
  title,
  value,
  growth = 0,
  icon,
  color,
  loading = false,
}: MetricCardProps) {
  const isPositive = growth >= 0;

  if (loading) {
    return (
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Skeleton variant="circular" width={48} height={48} />
              <div className="ml-4">
                <Skeleton variant="text" width={100} height={20} />
                <Skeleton variant="text" width={80} height={32} />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Skeleton variant="text" width={120} height={20} />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${colorClasses[color]}`}>
              {icon}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-primary-600">{title}</p>
              <h3 className="text-2xl font-bold text-primary-900">{value}</h3>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center">
          <span
            className={`text-sm font-medium ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="inline mr-1" />
            ) : (
              <TrendingDown className="inline mr-1" />
            )}
            {Math.abs(growth)}%
          </span>
          <span className="text-sm text-primary-600 ml-2">
            from last period
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
