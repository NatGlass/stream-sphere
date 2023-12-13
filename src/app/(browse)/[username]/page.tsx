import UserActions from '@/components/molecules/user-actions';
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

  return (
    <div className="flex flex-col gap-y-4">
      name: {params.username}
      following: {`${isFollowing}`}
      <UserActions userId={user.id} isFollowing={isFollowing} />
    </div>
  );
}

export default UserPage;
