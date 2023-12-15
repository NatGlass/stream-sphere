'use client';

import Video from '@/components/molecules/stream/video';
import useChatSidebar from '@/context/useChatSidebar';
import useViewerToken from '@/hooks/useViewerToken';
import cn from '@/lib/utils';
import { LiveKitRoom } from '@livekit/components-react';
import { Stream, User } from '@prisma/client';
import Chat from '../chat';
import ChatToggle from '@/components/molecules/chat/chat-toggle';

type TStreamPlayer = {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
};

function StreamPlayer({ user, stream, isFollowing }: TStreamPlayer) {
  const { token, name, identity } = useViewerToken(user.id);

  const { collapsed } = useChatSidebar((state) => state);

  if (!token || !name || !identity) return <div>Cannot watch this stream</div>;

  return (
  <>
      {collapsed && <div className='hidden lg:block fixed top-[100px] right-2 z-50'>
        <ChatToggle />
    </div>}
    <LiveKitRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_API_WS_URL}
      className={cn(
        'grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full',
        collapsed && 'lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2'
      )}
    >
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:auto-y-auto hidden-scrollbar pb-10">
        <Video hostname={user.username} hostIdentity={user.id} />
      </div>
      <div className={cn('col-span-1', collapsed && 'hidden')}>
        <Chat
          viewerName={name}
          hostName={user.username}
          hostIdentity={user.id}
          isFollowing={isFollowing}
          isChatEnabled={stream.isChatEnabled}
          isChatDelayed={stream.isChatDelayed}
          isChatFollowersOnly={stream.isChatFollowersOnly}
        />
      </div>
      </LiveKitRoom>
      </>
  );
}

export default StreamPlayer;
