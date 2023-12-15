import getUser from './auth-service';
import prisma from './db';

export async function getFollowedUsers() {
  try {
    const currentUser = await getUser();

    const followedUsers = await prisma.follow.findMany({
      where: {
        followerId: currentUser.id,
        following: {
          blocking: {
            none: {
              blockedId: currentUser.id,
            },
          },
        },
      },

      include: {
        following: {
          include: {
            stream: true,
          }
        }
      },
    });

    return followedUsers;
  } catch (error) {
    return [];
  }
}

export async function isFollower(id: string) {
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

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUser.id,
          followingId: otherUser.id,
        },
      },
    });

    return !!existingFollow;
  } catch (error) {
    return false;
  }
}

export async function followUser(id: string) {
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

  if (existingFollow) {
    throw new Error('Already following user');
  }

  const follow = await prisma.follow.create({
    data: {
      followerId: currentUser.id,
      followingId: otherUser.id,
    },
    include: {
      following: true,
      follower: true,
    },
  });

  return follow;
}
