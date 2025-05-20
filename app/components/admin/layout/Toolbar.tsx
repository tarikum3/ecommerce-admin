"use client";
import React, { lazy, Suspense } from "react";

const LanguageSwitcher = lazy(
  () => import("@/app/components/admin/ui/LanguageSwitcher")
);
const NotificationIcon = lazy(
  () => import("@/app/components/admin/notification/NotificationIcon")
);
const ThemeSwitcher = lazy(
  () => import("@/app/components/admin/ui/ThemeSwitcher")
);
const Toolbar = () => {
  return (
    <div className="flex items-center space-x-4 h-full">
      <Suspense fallback={<div className="bg-primary-300 size-6"></div>}>
        <LanguageSwitcher />
      </Suspense>
      <Suspense fallback={<div className="bg-primary-300 size-6"></div>}>
        <ThemeSwitcher />
      </Suspense>
      <Suspense fallback={<div className="bg-primary-300 size-6"></div>}>
        <NotificationIcon />
      </Suspense>
    </div>
  );
};

export default Toolbar;
