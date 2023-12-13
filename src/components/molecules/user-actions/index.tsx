'use client';

import { onBlock } from '@/actions/block';
import { onFollow, onUnfollow } from '@/actions/follow';
import { Button } from '@/components/atoms/button';
import { useTransition } from 'react';
import { toast } from 'sonner';

type TAction = {
  isFollowing: boolean;
  userId: string;
  isBlocked: boolean;
};

function UserActions({ userId, isFollowing, isBlocked }: TAction) {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error("Couldn't follow this user"));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) =>
          toast.success(`You unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error("Couldn't unfollow this user"));
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) => toast.success(`You unblocked ${data.blocked.username}`))
        .catch(() => toast.error("Couldn't block this user"));
    });
  };

  return (
    <>
      <Button disabled={isPending} onClick={onClick}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
      <Button onClick={handleBlock} variant="secondary">
        Block
      </Button>
    </>
  );
}

export default UserActions;
