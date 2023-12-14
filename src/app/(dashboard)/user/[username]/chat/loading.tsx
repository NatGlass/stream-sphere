import Skeleton from '@/components/atoms/skeleton';
import { ToggleCartSkeleton } from '@/components/molecules/chat/toggle-card';

function ChatLoading() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-10 w-[200px]" />
      <div className="space-y-4">
        <ToggleCartSkeleton />
        <ToggleCartSkeleton />
        <ToggleCartSkeleton />
      </div>
    </div>
  );
}

export default ChatLoading;
