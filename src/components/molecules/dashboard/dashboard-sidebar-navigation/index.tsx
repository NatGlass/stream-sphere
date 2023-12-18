'use client';

import { useUser } from '@/lib/auth';
import { Fullscreen, KeyRound, MessageSquare, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';
import DashboardNavItem, {
  DashboardNavItemSkeleton,
} from '../dashboard-nav-item';

function DashboardSidebarNavigation() {
  const pathname = usePathname();
  const  user  = useUser();

  const routes = [
    {
      label: 'Stream',
      href: `/user/${user?.username}`,
      icon: Fullscreen,
    },
    {
      label: 'Keys',
      href: `/user/${user?.username}/keys`,
      icon: KeyRound,
    },
    {
      label: 'Chat',
      href: `/user/${user?.username}/chat`,
      icon: MessageSquare,
    },
    {
      label: 'Community',
      href: `/user/${user?.username}/community`,
      icon: Users,
    },
  ];

  if (!user?.username) {
    return (
      <ul className="space-y-2">
        {[...Array(4)].map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <DashboardNavItemSkeleton key={i} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <DashboardNavItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
}

export default DashboardSidebarNavigation;
