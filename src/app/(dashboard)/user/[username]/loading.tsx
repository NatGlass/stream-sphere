import { StreamPlayerSkeleton } from '@/components/organisms/stream-player';

function Loading() {
  return (
    <div className="h-full">
      <StreamPlayerSkeleton />
    </div>
  );
}

export default Loading;
