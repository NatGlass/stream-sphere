'use client';

import useSidebar from '@/context/useSidebar';
import cn from '@/lib/utils';
import { PropsWithChildren } from 'react';
import { useIsClient } from 'usehooks-ts';
import { FollowingSkeleton } from '../sidebar-following';
import { RecommendedSkeleton } from '../sidebar-recommended';
import { ToggleSidebarSkeleton } from '../toggle-sidebar';

function Wrapper({ children }: PropsWithChildren) {
  const isClient = useIsClient();
  const { collapsed } = useSidebar((state) => state);

  if (!isClient)
    return (
      <aside className="fixed left-0 flex flex-col h-full w-[70px] lg:w-60 bg-slate-900">
        <ToggleSidebarSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );

  return (
    <aside
      className={cn(
        'fixed left-0 flex flex-col h-full w-60 bg-slate-900',
        collapsed && 'w-[70px]'
      )}
    >
      {children}
    </aside>
  );
}

export default Wrapper;
