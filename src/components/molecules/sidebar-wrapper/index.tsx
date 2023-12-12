'use client';

import useSidebar from '@/context/useSidebar';
import cn from '@/lib/utils';
import { PropsWithChildren } from 'react';

function Wrapper({ children }: PropsWithChildren) {
  const { collapsed } = useSidebar((state) => state);
  return (
    <aside
      className={cn(
        'fixed left-0 flex flex-col h-full w-60 bg-slate-900 ',
        collapsed && 'w-[70px]'
      )}
    >
      {children}
    </aside>
  );
}

export default Wrapper;
