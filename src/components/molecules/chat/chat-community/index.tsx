'use client';

import { Input } from '@/components/atoms/input';
import { ScrollArea } from '@/components/atoms/scroll-area';
import { useParticipants } from '@livekit/components-react';
import { useMemo, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { LocalParticipant, RemoteParticipant } from 'livekit-client';
import CommunityItem from '../community-item';

type TChatCommunity = {
  hostName: string;
  viewerName: string;
  isHidden: boolean;
};

function ChatCommunity({ hostName, viewerName, isHidden }: TChatCommunity) {
  const [value, setValue] = useState('');
  const participants = useParticipants();
  const debouncedValue = useDebounce<string>(value, 500);

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce((acc, participant) => { 
      const hostAsViewer = `host-${participant.identity}`;
      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant);
      }
      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return deduped.filter((participant) => participant.name?.toLowerCase().includes(debouncedValue.toLowerCase()))
  }, [participants, debouncedValue])

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Community is disabled</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search community"
        className="border-white/10"
      />
      <ScrollArea className="gap-y-2 mt-4" />
      <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
        No results
      </p>

      {filteredParticipants.map((participant) => (
        <CommunityItem
          key={participant.identity}
          hostName={hostName}
          viewerName={viewerName}
          participantName={participant.name}
          participantIdentity={participant.identity}
        />
      ))}
    </div>
  );
}

export default ChatCommunity;
