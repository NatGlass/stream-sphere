import Skeleton from '@/components/atoms/skeleton';
import { User } from '@prisma/client';
import Link from 'next/link';
import UserAvatar, { UserAvatarSkeleton } from '../../browse/user-avatar';
import Thumbnail, { ThumbnailSkeleton } from '../../thumbnail';

type TResultCard = {
  data: {
    user: User;
    isLive: boolean;
    name: string;
    thumbnailUrl: string | null;
  };
};

function ResultCard({ data }: TResultCard) {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="h-full w-full space-y-4">
        <Thumbnail
          src={data.thumbnailUrl}
          fallback={data.user.image!}
          isLive={data.isLive}
          username={data.user.username!}
        />

        <div className="flex gap-x-3">
          <UserAvatar
            username={data.user.username!}
            imageUrl={data.user.image!}
            isLive={data.isLive}
          />
          <div className="flex flex-col text-sm overflow-hidden">
            <p className="truncate font-semibold hover:text-blue-500">
              {data.name}
            </p>
            <p className="text-muted-foreground">{data.user.username}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ResultCard;

export function ResultCardSkeleton() {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}
