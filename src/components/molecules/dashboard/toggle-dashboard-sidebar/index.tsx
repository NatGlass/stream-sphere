'use client';

import { Button } from '@/components/atoms/button';
import Hint from '@/components/atoms/hint';
import useDashboardSidebar from '@/context/useDashboardSidebar';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

function ToggleDashboardSidebar() {
  const { collapsed, onExpand, onCollapse } = useDashboardSidebar((state) => state);

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
        <div className="hidden lg:flex mb-2 items-center w-full p-3 pl-6">
          <p className="font-semibold">Dashboard</p>
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

export default ToggleDashboardSidebar;
