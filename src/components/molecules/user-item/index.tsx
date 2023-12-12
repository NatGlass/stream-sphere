'use client';

import { Button } from '@/components/atoms/button';
import useSidebar from '@/context/useSidebar';
import cn from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserAvatar from '../user-avatar';
import LiveBadge from '../live-badge';

type TUserItem = {
  username: string;
  imageUrl: string;
  isLive?: boolean;
};

function UserItem({ username, imageUrl, isLive }: TUserItem) {
  const pathname = usePathname();
  const { collapsed } = useSidebar((state) => state);

  const href = `/${username}`;
  const isActive = pathname === href;

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
        <div
          className={cn(
            'flex items-center w-full gap-x-4',
            collapsed && 'justify-center'
          )}
        >
          <UserAvatar imageUrl={imageUrl} username={username} isLive={isLive} />
          {!collapsed && <p className="truncate">{username}</p>}
          {!collapsed && isLive && (
            <LiveBadge className='ml-auto' />
          )}
        </div>
      </Link>
    </Button>
  );
}

export default UserItem;
