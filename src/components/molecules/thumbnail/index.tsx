import Skeleton from '@/components/atoms/skeleton';
import Image from 'next/image';
import UserAvatar from '../browse/user-avatar';
import LiveBadge from '../live-badge';

type TThumbnail = {
  src: string | null;
  fallback: string;
  isLive: boolean;
  username: string;
};

function Thumbnail({ src, fallback, isLive, username }: TThumbnail) {
  let content;

  if (!src) {
    content = (
      <div className="bg-slate-900 flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md">
        <UserAvatar
          size="lg"
          showBadge
          username={username}
          imageUrl={fallback}
          isLive={isLive}
        />
      </div>
    );
  } else {
    content = (
      <Image
        src={src}
        fill
        alt="Thumbnail"
        className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md"
      />
    );
  }
  return (
    <div className="group aspect-video relative rounded-md cursor-pointer">
      <div className="rounded-md absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" />
      {content}
      {isLive && src && (
        <div className="top-2 left-2 absolute group-hover translate-x-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
          <LiveBadge />
        </div>
      )}
    </div>
  );
}

export default Thumbnail;

export function ThumbnailSkeleton() {
  return (
    <div className="group aspect-video relative rounded-xl cursor-pointer">
      <Skeleton className="w-full h-full" />
    </div>
  );
}
