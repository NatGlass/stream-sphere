'use client';

import Video from '@/components/molecules/stream/video';
import useViewerToken from '@/hooks/useViewerToken';
import { LiveKitRoom } from '@livekit/components-react';
import { Stream, User } from '@prisma/client';

type TStreamPlayer = {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
};

function StreamPlayer({ user, stream, isFollowing }: TStreamPlayer) {
  const { token, name, identity } = useViewerToken(user.id);

  if (!token || !name || !identity) return <div>Cannot watch this stream</div>;

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_API_WS_URL}
      className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full"
    >
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:auto-y-auto hidden-scrollbar pb-10">
        <Video hostname={user.username} hostIdentity={user.id} />
      </div>
    </LiveKitRoom>
  );
}

export default StreamPlayer;
