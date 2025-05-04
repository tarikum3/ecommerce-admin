"use client";
import React, { FC, ReactNode } from "react";

import { ManagedUIContext } from "@/app/components/admin/ui/UIContext";
import { SessionProvider } from "next-auth/react";
const ResourceContext = React.createContext<string[] | undefined>(undefined);
export const useResource = () => {
  const context = React.useContext(ResourceContext);
  if (context === undefined) {
    throw new Error(`useResource must be used within a ResourceProvider`);
  }
  return context;
};
const SessionWrapper: FC<{ children?: ReactNode; resources?: string[] }> = ({
  children,
  resources = [],
}) => (
  <ResourceContext.Provider value={resources}>
    <SessionProvider>
      <ManagedUIContext>{children}</ManagedUIContext>
    </SessionProvider>
  </ResourceContext.Provider>
);

export default SessionWrapper;
export const ResourceProvider: FC<{ resources?: string[] }> = ({
  resources = [],
}) => {
  const ResourceContext = React.createContext(resources);

  return <ResourceContext.Provider value={resources} />;
};
