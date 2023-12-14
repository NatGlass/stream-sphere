'use client';

import useDashboardSidebar from '@/context/useDashboardSidebar';
import cn from '@/lib/utils';
import { PropsWithChildren, useEffect } from 'react';

import { useMediaQuery } from 'usehooks-ts';

function DashboardSidebarContainer({ children }: PropsWithChildren) {
  const { collapsed, onCollapse, onExpand } = useDashboardSidebar((state) => state);
  const matches = useMediaQuery('(max-width: 1024px)');

  // Automatically collapse sidebar on mobile
  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn('flex-1', collapsed ? 'ml-[70px]' : 'ml-[70px] lg:ml-60')}
    >
      {children}
    </div>
  );
}

export default DashboardSidebarContainer;
