import { Button } from '@/components/atoms/button';
import Skeleton from '@/components/atoms/skeleton';
import useDashboardSidebar from '@/context/useDashboardSidebar';
import cn from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

type TDashboardNavItem = {
  label: string;
  icon: LucideIcon;
  href: string;
  isActive: boolean;
};

function DashboardNavItem({
  label,
  icon: Icon,
  href,
  isActive,
}: TDashboardNavItem) {
  const { collapsed } = useDashboardSidebar();
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        'w-full h-12',
        collapsed ? 'justify-center' : 'justify-start',
        isActive && 'bg-accent'
      )}
    >
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          <Icon className={cn('h-4 w-4', collapsed ? 'mr-0' : 'mr-2')} />
          {!collapsed && <span>{label}</span>}
        </div>
      </Link>
    </Button>
  );
}

export default DashboardNavItem;

export function DashboardNavItemSkeleton() {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[48px] min-w-[48px] rounded-md" />
      <div className="flex-1 hidden lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
}
