import { currentUser } from '@clerk/nextjs';
import prisma from './db';

async function getUser() {
  const getCurrentUser = await currentUser();

  if (!getCurrentUser || !getCurrentUser.username) {
    throw new Error('Unauthorised');
  }

  const user = await prisma.user.findUnique({
    where: {
      externalUserId: getCurrentUser.id,
    },
  });

  if (!user) {
    throw new Error('Not found');
  }

  return user;
}

export default getUser;
