'use client';

import useSidebar from '@/context/useSidebar';
import { User } from '@prisma/client';
import UserItem, { UserItemSkeleton } from '../user-item';

type TRecommended = {
  data: User[];
};

function Recommended({ data }: TRecommended) {
  const { collapsed } = useSidebar((state) => state);

  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive
          />
        ))}
      </ul>
    </div>
  );
}

export default Recommended;

export function RecommendedSkeleton() {
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