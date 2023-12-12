import prisma from "./db";

async function getRecommended() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return users;
}

export default getRecommended;
