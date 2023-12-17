import getUser from './auth-service';
import prisma from './db';

export default async function getSearch(search: string) {
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
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            user: {
              username: {
                contains: search,
              },
            },
          },
        ],
      },
      include: {
        user: true,
      },
      orderBy: [
        {
          isLive: 'desc',
        },
        {
          updatedAt: 'desc',
        },
      ],
    });
  } else {
    streams = await prisma.stream.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            user: {
              username: {
                contains: search,
              },
            },
          },
        ],
      },
      include: {
        user: true,
      },
      orderBy: [
        {
          isLive: 'desc',
        },
        {
          updatedAt: 'desc',
        },
      ],
    });
  }

  return streams;
}
