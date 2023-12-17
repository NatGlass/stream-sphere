import StreamPlayer from '@/components/organisms/stream-player';
import { isBlockedByUser } from '@/lib/block-service';
import { isFollower } from '@/lib/follow-service';
import getUserByUsername from '@/lib/user-service';
import { notFound } from 'next/navigation';

type TUserPage = {
  params: {
    username: string;
  };
};

async function UserPage({ params }: TUserPage) {
  const user = await getUserByUsername(params.username);

  if (!user || !user.stream) {
    notFound();
  }

  const isFollowing = await isFollower(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) { 
    notFound();
  }

  return (
    <StreamPlayer user={user} stream={user.stream} isFollowing={isFollowing} />
  );
}

export default UserPage;
