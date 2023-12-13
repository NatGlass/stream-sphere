import getUser from './auth-service';
import prisma from './db';

async function getRecommended() {
  let userId;

  try {
    const currentUser = await getUser();
    userId = currentUser.id;
  } catch (error) {
    userId = null;
  }

  let users = [];

  if (userId) {
    // Logged in user
    users = await prisma.user.findMany({
      where: {
        AND: [
          {
            // Exclude the current user in the results
            NOT: {
              id: userId,
            },
          },
          {
            // Don't recommend users who are already followed
            NOT: {
              followedBy: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          {
            // Don't recommend users who are blocked
            NOT: {
              blocking: {
                some: {
                  blockedId: userId,
                },
              },
            },
          }
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } else {
    // Public user
    users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  return users;
}

export default getRecommended;
