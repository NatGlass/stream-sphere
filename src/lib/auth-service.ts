import { currentUser } from '@/lib/auth';
import prisma from './db';

async function getUser() {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error('Unauthorised');
  }

  const user = await prisma.user.findUnique({
    where: {
      id: self.id,
    },
  });

  if (!user) {
    throw new Error('Not found');
  }

  return user;
}

export default getUser;

export async function getSelfByUsername(username: string) {
  const self = await getUser();

  if (!self || !self.username) {
    throw new Error('Unauthorised');
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (self.username !== user.username) {
    throw new Error('Unauthorised');
  }

  return user;
}
