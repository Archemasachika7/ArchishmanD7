"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IdentityMode } from "./types";

interface OSStore {
  identity: IdentityMode;
  setIdentity: (mode: IdentityMode) => void;
  bootComplete: boolean;
  setBootComplete: (v: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}

export const useOSStore = create<OSStore>()(
  persist(
    (set) => ({
      identity: "civil",
      setIdentity: (mode) => set({ identity: mode }),
      bootComplete: false,
      setBootComplete: (v) => set({ bootComplete: v }),
      sidebarOpen: false,
      setSidebarOpen: (v) => set({ sidebarOpen: v }),
    }),
    { name: "archios-store", partialize: (s) => ({ identity: s.identity }), skipHydration: true }
  )
);
