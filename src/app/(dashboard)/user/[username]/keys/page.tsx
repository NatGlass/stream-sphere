import ConnectModal from '@/components/molecules/keys/connect-modal';
import KeyCard from '@/components/molecules/keys/key-card';
import UrlCard from '@/components/molecules/keys/url-card';
import getUser from '@/lib/auth-service';
import getStreamByUserId from '@/lib/stream-service';

async function KeysPage() {
  const currentUser = await getUser();
  const stream = await getStreamByUserId(currentUser.id);

  if (!stream) {
    throw new Error('Stream not found');
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <UrlCard value={stream.serverUrl} />
        <KeyCard value={stream.streamKey} />
      </div>
    </div>
  );
}

export default KeysPage;
