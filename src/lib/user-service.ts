import prisma from './db';

export default async function getUserByUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      stream: true,
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