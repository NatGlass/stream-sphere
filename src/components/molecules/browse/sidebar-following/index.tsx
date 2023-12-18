'use client';

import useSidebar from '@/context/useSidebar';
import { Follow, User } from '@prisma/client';
import UserItem, { UserItemSkeleton } from '../user-item';

type TFollowing = {
  data: (Follow & {
    following: User & {
      stream: { isLive: boolean } | null;
    };
  })[];
};

function Following({ data }: TFollowing) {
  const { collapsed } = useSidebar((state) => state);

  if (!data.length) return null;

  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((following) => (
          <UserItem
            key={following.following.id}
            username={following.following.username!}
            imageUrl={following.following.image!}
            isLive={following.following.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
}

export default Following;

export function FollowingSkeleton() {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        // Nothing unique with the items in this array, so we can use the index as the key
        // eslint-disable-next-line react/no-array-index-key
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
}
