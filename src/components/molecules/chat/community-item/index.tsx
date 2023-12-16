'use client';

import { onBlock } from '@/actions/block';
import { Button } from '@/components/atoms/button';
import Hint from '@/components/atoms/hint';
import cn, { stringToColor } from '@/lib/utils';
import { MinusCircle } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

type TCommunityItem = {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
};

function CommunityItem({
  hostName,
  viewerName,
  participantName,
  participantIdentity,
}: TCommunityItem) {
  const [isPending, startTransition] = useTransition();

  const color = stringToColor(participantName || '');
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;

  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) return;

    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => toast.success(`Blocked ${participantName}`))
        .catch(() => toast.error('Something went wrong'));
    });
  };

  return (
    <div
      className={cn(
        'group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5',
        isPending && 'opacity-50 pointer-events-none'
      )}
    >
      <p style={{ color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label="Block">
          <Button
            variant="ghost"
            disabled={isPending}
            onClick={handleBlock}
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
          >
            <MinusCircle className="h-4 w-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  );
}

export default CommunityItem;
