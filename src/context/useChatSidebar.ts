import { create } from 'zustand';

export enum ChatVariant {
  CHAT = 'CHAT',
  COMMUNITY = 'COMMUNITY',
}

type TChatSidebarStore = {
  collapsed: boolean;
  variant: ChatVariant;
  onExpand: () => void;
  onCollapse: () => void;
  onChangeVariant: (variant: ChatVariant) => void;
};

const useChatSidebar = create<TChatSidebarStore>((set) => ({
  collapsed: false,
  variant: ChatVariant.CHAT,
  onExpand: () => set({ collapsed: false }),
  onCollapse: () => set({ collapsed: true }),
  onChangeVariant: (variant: ChatVariant) => set(() => ({ variant })),
}));

export default useChatSidebar;
