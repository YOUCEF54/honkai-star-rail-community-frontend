'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type SidebarContextType = {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
  isLeftSidebarOpen: boolean;
  setIsLeftSidebarOpen: (value: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);

  return (
    <SidebarContext.Provider 
      value={{ 
        isExpanded, 
        setIsExpanded,
        isLeftSidebarOpen,
        setIsLeftSidebarOpen
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}