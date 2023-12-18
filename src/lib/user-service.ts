import prisma from './db';

export default async function getUserByUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      bio: true,
      image: true,
      stream: {
        select: {
          id: true,
          isLive: true,
          isChatEnabled: true,
          isChatDelayed: true,
          isChatFollowersOnly: true,
          thumbnailUrl: true,
          name: true,
        }
      },
      _count: {
        select: {
          followedBy: true
        }
      }
    },
  });

  return user;
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      stream: true,
    },
  });

  return user;
}