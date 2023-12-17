import Hint from '@/components/atoms/hint';
import { Info } from 'lucide-react';
import { useMemo } from 'react';

type TChatInfo = {
  isDelayed: boolean;
  isFollowersOnly: boolean;
};

function ChatInfo({ isDelayed, isFollowersOnly }: TChatInfo) {
  const hint = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return 'You must be a follower to chat';
    }

    if (isDelayed && !isFollowersOnly) {
      return 'Your chat will be delayed by 5 seconds';
    }

    if (isDelayed && isFollowersOnly) {
      return 'Your chat will be delayed by 5 seconds and you must be a follower to chat';
    }

    return '';
  }, [isDelayed, isFollowersOnly]);

  const label = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return 'Followers only chat';
    }

    if (isDelayed && !isFollowersOnly) {
      return 'Slow chat is enabled';
    }

    if (isDelayed && isFollowersOnly) {
      return 'Followers only and slow chat is enabled';
    }

    return '';
  }, [isDelayed, isFollowersOnly]);

  if (!isDelayed && !isFollowersOnly) return null;
  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <Hint label={hint}>
        <Info className="w-4 h-4" />
      </Hint>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
}

export default ChatInfo;
