'use client';

import { onFollow, onUnfollow } from '@/actions/follow';
import { Button } from '@/components/atoms/button';
import Skeleton from '@/components/atoms/skeleton';
import cn from '@/lib/utils';
import { useAuth } from '@/lib/auth';
import { Heart } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

type TActions = {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
};

function Actions({ hostIdentity, isFollowing, isHost }: TActions) {
  const [isPending, startTransition] = useTransition();
  const { userId } = useAuth();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error('Something went wrong'));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error('Something went wrong'));
    });
  };

  // eslint-disable-next-line consistent-return
  const handleFollowStatus = () => {
    if (!userId) {
      return redirect('/sign-in');
    }

    if (isHost) return null;

    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      disabled={isPending || isHost}
      onClick={handleFollowStatus}
      size="sm"
      className="w-full lg:w-auto"
    >
      <Heart
        className={cn('h-4 w-4 mr-2', isFollowing ? 'fill-white' : 'fill-none')}
      />
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
}

export default Actions;

export function ActionsSkeleton() {
  return <Skeleton className="h-10 w-full lg:w-24" />;
}
