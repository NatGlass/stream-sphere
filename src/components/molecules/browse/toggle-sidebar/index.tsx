'use client';

import { Button } from '@/components/atoms/button';
import Hint from '@/components/atoms/hint';
import Skeleton from '@/components/atoms/skeleton';
import useSidebar from '@/context/useSidebar';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

function ToggleSidebar() {
  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);

  const label = collapsed ? 'Expand Sidebar' : 'Collapse Sidebar';
  return (
    <>
      {collapsed && (
        <div className="items-center justify-center hidden w-full pt-4 mb-4 lg:flex">
          <Hint label={label} side="right" asChild>
            <Button className="h-auto p-2" variant="ghost" onClick={onExpand}>
              <ArrowRightFromLine className="w-4 h-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="flex items-center w-full p-3 pl-6">
          <p className="font-semibold">For you</p>
          <Hint label={label} side="right" asChild>
            <Button
              className="h-auto p-2 ml-auto"
              variant="ghost"
              onClick={onCollapse}
            >
              <ArrowLeftFromLine className="w-4 h-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
}

export default ToggleSidebar;

export function ToggleSidebarSkeleton() {
  return (
    <div className='p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full'>
      <Skeleton className='h-6 w-[100px]' />
      <Skeleton className='h-6 w-6' />
    </div>
  )
}