import prisma from './db';

export default async function getStreamByUserId(userId: string) {
  const stream = await prisma.stream.findUnique({
    where: {
      userId,
    },
  });

  return stream;
}
