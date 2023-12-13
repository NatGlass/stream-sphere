import UserActions from '@/components/molecules/user-actions';
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

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollower(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  return (
    <div className="flex flex-col gap-y-4">
      name: {params.username}
      following: {`${isFollowing}`}
      <p>blocked status: {`${isBlocked}`}</p>
      <UserActions userId={user.id} isFollowing={isFollowing} isBlocked={isBlocked} />
    </div>
  );
}

export default UserPage;
