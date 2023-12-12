import { create } from 'zustand';

type TSidebarStore = {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
};

const useSidebar = create<TSidebarStore>((set) => ({
  collapsed: false,
  onExpand: () => set({ collapsed: false }),
  onCollapse: () => set({ collapsed: true }),
}));

export default useSidebar;
