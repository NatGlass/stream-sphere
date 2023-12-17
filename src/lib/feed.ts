import getUser from './auth-service';
import prisma from './db';

export default async function getStreams() {
  let userId;

  try {
    const user = await getUser();
    userId = user.id;
  } catch (error) {
    userId = null;
  }

  let streams = [];

  if (userId) {
    streams = await prisma.stream.findMany({
      where: {
        user: {
          NOT: {
            blocking: {
              some: {
                blockedId: userId,
              },
            },
          },
        },
      },
        select: {
          id: true,
        user: true,
        thumbnailUrl: true,
        name: true,
        isLive: true,
      },
      orderBy: [{ isLive: 'desc' }, { updatedAt: 'desc' }],
    });
  } else {
    streams = await prisma.stream.findMany({
        select: {
          id: true,
        user: true,
        thumbnailUrl: true,
        name: true,
        isLive: true,
      },
      orderBy: [{ isLive: 'desc' }, { updatedAt: 'desc' }],
    });
  }

  return streams;
}
