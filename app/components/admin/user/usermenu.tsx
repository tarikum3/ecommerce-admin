"use client";
import { useState } from "react";

import { UserIcon } from "@/app/components/icons";
import Clickoutside from "@/app/components/common/Clickoutside";
import { useRouter, useSearchParams } from "next/navigation";
import { logOut } from "@lib/actions/actions";
import { useGetProfileQuery } from "@lib/admin/store/services/profile.service";
import { useResource } from "@/app/components/common/SessionWrapper";

export default function UserMenu() {
  const resourcevalue = useResource();

  const [display, setDisplay] = useState(false);
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
    error: profileError,
  } = useGetProfileQuery();
  const router = useRouter();
  const userMenuClick = () => {
    if (!display) {
      setDisplay(true);
    }
  };
  console.log("resourcecontextvaluep", profileData);
  return (
    <div className=" m-4 p-2 bg-primary-100 text-primary-900  shadow-md flex flex-col items-center relative">
      <button
        className="  w-full flex items-center justify-start  bg-primary-200 hover:bg-primary-300 rounded-lg transition-all"
        onClick={userMenuClick}
      >
        <UserIcon className="size-6" />
        <div className="flex items-center gap-3">
          <div className="text-left">
            <span className="block text-sm font-semibold">
              {/* {defaultUser.data.displayName} */}
              {profileData?.firstName}
            </span>
            <span className="text-xs font-medium text-primary-400">
              {resourcevalue?.length > 0 ? "User" : "Guest"}
            </span>
          </div>
        </div>
      </button>

      <Clickoutside status={display} onClick={() => setDisplay(false)}>
        <div className="absolute left-0 bottom-full w-full mb-2 rounded-md shadow-lg">
          <div className="px-2 py-2 bg-primary-100 rounded-md shadow w-full">
            <button
              onClick={() => router.push("/admin/profile")}
              className="block w-full cursor-pointer px-4 py-2 text-sm font-semibold bg-transparent rounded-lg hover:text-primary-900 focus:text-primary-900 hover:bg-primary-200 focus:bg-primary-200 focus:outline-none focus:shadow-outline"
            >
              My Profile
            </button>

            <button
              className="block w-full cursor-pointer px-4 py-2 text-sm font-semibold bg-transparent rounded-lg hover:text-primary-900 focus:text-primary-900 hover:bg-primary-200 focus:bg-primary-200 focus:outline-none focus:shadow-outline"
              onClick={async () => {
                await logOut();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </Clickoutside>
    </div>
  );
}
