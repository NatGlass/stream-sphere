'use client';

import ChatCommunity from '@/components/molecules/chat/chat-community';
import ChatForm, { ChatFormSkeleton } from '@/components/molecules/chat/chat-form';
import ChatHeader, { ChatHeaderSkeleton } from '@/components/molecules/chat/chat-header';
import ChatList, { ChatListSkeleton } from '@/components/molecules/chat/chat-list';
import useChatSidebar, { ChatVariant } from '@/context/useChatSidebar';
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from '@livekit/components-react';
import { ConnectionState } from 'livekit-client';
import { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

type TChat = {
  viewerName: string;
  hostName: string;
  hostIdentity: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
};

function Chat({
  viewerName,
  hostName,
  hostIdentity,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
}: TChat) {
  const matches = useMediaQuery('(max-width: 1024px)');
  const { variant, onExpand } = useChatSidebar((state) => state);
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !isChatEnabled || !isOnline;

  const [value, setValue] = useState('');
  const { chatMessages: messages, send } = useChat();

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const reversedMessages = useMemo(
    () => messages.sort((a, b) => b.timestamp - a.timestamp),
    [messages]
  );

  const onSubmit = () => {
    if (!send) return;

    send(value);
    setValue('');
  };

  const onChange = (val: string) => {
    setValue(val);
  };

  return (
    <div className="flex flex-col bg-slate-900 border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeader hostName={hostName} />
      {variant === ChatVariant.CHAT && (
        <>
          <ChatList messages={reversedMessages} isHidden={isHidden} />
          <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </>
      )}

      {variant === ChatVariant.COMMUNITY && <ChatCommunity hostName={hostName} viewerName={viewerName} isHidden={isHidden} />}
    </div>
  );
}

export default Chat;

export function ChatSkeleton() {
  return (
    <div className='flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2'>
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  )
}