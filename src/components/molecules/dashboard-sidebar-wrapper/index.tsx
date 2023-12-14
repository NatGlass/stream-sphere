'use client';

import useDashboardSidebar from '@/context/useDashboardSidebar';
import cn from '@/lib/utils';

type TWrapperProps = {
  children: React.ReactNode;
};

function DashboardSidebarWrapper({ children }: TWrapperProps) {
  const { collapsed } = useDashboardSidebar((state) => state);
  return (
    <aside
      className={cn(
        'fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-slate-900 z-50',
        collapsed && 'lg:w-[70px]'
      )}
    >
      {children}
    </aside>
  );
}

export default DashboardSidebarWrapper;
