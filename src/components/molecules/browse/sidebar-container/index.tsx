'use client';

import useSidebar from '@/context/useSidebar';
import cn from '@/lib/utils';
import { PropsWithChildren, useEffect } from 'react';

import { useMediaQuery } from 'usehooks-ts';

function Container({ children }: PropsWithChildren) {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);
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

export default Container;
