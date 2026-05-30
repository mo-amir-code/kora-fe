type DashboardStoreState = {
	demoToggle: boolean;
};

type DashboardStoreActions = {
	toggleDemo: () => void;
};

type DashboardState = DashboardStoreState & DashboardStoreActions;

export type {
	DashboardStoreState,
	DashboardStoreActions,
	DashboardState,
};
