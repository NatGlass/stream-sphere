'use client';

import { onFollow, onUnfollow, } from '@/actions/follow';
import { Button } from '@/components/atoms/button';
import { useTransition } from 'react';
import { toast } from 'sonner';

type TAction = {
  isFollowing: boolean;
  userId: string;
};

function UserActions({ userId, isFollowing }: TAction) {
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
  }
  return (
    <Button disabled={isPending} onClick={onClick}>
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}

export default UserActions;
