import ToggleCard from '@/components/molecules/chat/toggle-card';
import getUser from '@/lib/auth-service';
import getStreamByUserId from '@/lib/stream-service';

async function ChatPage() {
  const currentUser = await getUser();

  const stream = await getStreamByUserId(currentUser.id);

  if (!stream) {
    throw new Error('Stream not found');
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Chat Settings</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label="Enable chat"
          value={stream.isChatEnabled}
        />
        <ToggleCard
          field="isChatDelayed"
          label="Delay chat (5 seconds)"
          value={stream.isChatDelayed}
        />
        <ToggleCard
          field="isChatFollowersOnly"
          label="Must be a follower to chat"
          value={stream.isChatFollowersOnly}
        />
      </div>
    </div>
  );
}

export default ChatPage;
