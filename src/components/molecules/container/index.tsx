'use client';

import useSidebar from '@/context/useSidebar';
import cn from '@/lib/utils';
import { PropsWithChildren } from 'react';

function Container({ children }: PropsWithChildren) {
  const { collapsed } = useSidebar((state) => state);
  return <div className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}>{children}</div>;
}

export default Container;
