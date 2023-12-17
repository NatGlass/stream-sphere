import { create } from 'zustand';

type TDashboardSidebarStore = {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
};

const useDashboardSidebar = create<TDashboardSidebarStore>((set) => ({
  collapsed: false,
  onExpand: () => set({ collapsed: false }),
  onCollapse: () => set({ collapsed: true }),
}));

export default useDashboardSidebar;
