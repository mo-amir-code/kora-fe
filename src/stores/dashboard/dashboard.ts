import { create } from "zustand";
import { DashboardState } from "./types";

export const useDashboardStore = create<DashboardState>()((set) => ({
	demoToggle: false,
	toggleDemo: () => set((state) => ({ demoToggle: !state.demoToggle })),
}));

export const selectDashboardState = (state: DashboardState) => state;
export const selectDemoToggle = (state: DashboardState) => state.demoToggle;
