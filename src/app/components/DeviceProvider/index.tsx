"use client";

import { createContext, useContext } from "react";

interface ProviderValue {
  isMobile?: boolean;
}

const DeviceContext = createContext<ProviderValue>({});

interface Props {
  children: React.ReactNode;
  isMobile: boolean;
}

export function DeviceProvider({ children, isMobile }: Props) {
  return (
    <DeviceContext.Provider value={{ isMobile }}>
      {children}
    </DeviceContext.Provider>
  );
}

export const useDevice = () => useContext(DeviceContext);
