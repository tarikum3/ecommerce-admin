// components/dashboard/RecentActivity.tsx
"use client";

import { Card, CardContent, IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { RecentActivity as RecentActivityType } from "app/types/dashboard";

interface RecentActivityProps {
  activities: RecentActivityType[];
}

const activityIcons = {
  ORDER: { icon: "🛒", color: "text-green-600 bg-green-100" },
  CUSTOMER: { icon: "👥", color: "text-blue-600 bg-blue-100" },
  PRODUCT: { icon: "📦", color: "text-purple-600 bg-purple-100" },
  PAYMENT: { icon: "💰", color: "text-yellow-600 bg-yellow-100" },
};

export default function RecentActivity({ activities }: RecentActivityProps) {
  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  return (
    <Card className="bg-primary-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-primary-900">
            Recent Activity
          </h3>
          <IconButton size="small">
            <MoreVert />
          </IconButton>
        </div>

        <div className="space-y-4">
          {activities.map((activity) => {
            const config = activityIcons[activity.type];

            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 hover:bg-primary-50 rounded-lg transition-colors"
              >
                <div className={`p-2 rounded-full ${config.color} text-lg`}>
                  {config.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary-900 truncate">
                    {activity.title}
                  </p>
                  <p className="text-sm text-primary-600 truncate">
                    {activity.description}
                  </p>
                  <p className="text-xs text-primary-500 mt-1">
                    {formatTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
