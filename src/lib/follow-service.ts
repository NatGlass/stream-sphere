import getUser from './auth-service';
import prisma from './db';

export default async function isFollower(id: string) {
  try {
    const currentUser = await getUser();

    const otherUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error('User not found');
    }

    if (otherUser.id === currentUser.id) {
      throw new Error('Cannot follow yourself');
    }

    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: currentUser.id,
        followingId: otherUser.id,
      },
    });

    return !!existingFollow;
  } catch (error) {
    return false;
  }
}
