import StreamPlayer from '@/components/organisms/stream-player';
import  getUserByUsername  from '@/lib/user-service';
import { currentUser } from '@/lib/auth';

type TUserDashboard = {
  params: {
    username: string;
  };
};

async function UserDashboard({ params }: TUserDashboard) {
  const clerkUser = await currentUser();
  const user = await getUserByUsername(params.username);

  if (!user || user.externalUserId !== clerkUser?.id || !user.stream) {
    throw new Error('Unauthorized');
  }

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing />
    </div>
  );
}

export default UserDashboard;
