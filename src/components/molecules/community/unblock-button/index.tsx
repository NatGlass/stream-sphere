'use client';

import { onUnblock } from '@/actions/block';
import { Button } from '@/components/atoms/button';
import { useTransition } from 'react';
import { toast } from 'sonner';

type TUnblockButton = {
  userId: string;
};

function UnblockButton({ userId }: TUnblockButton) {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((result) => toast.success(`Unblocked ${result.blocked.username}`))
        .catch(() => toast.error('Something went wrong'));
    });
  };

  return (
    <Button
      onClick={onClick}
      disabled={isPending}
      variant="ghost"
      className="text-blue-500"
    >
      Unblock
    </Button>
  );
}

export default UnblockButton;
