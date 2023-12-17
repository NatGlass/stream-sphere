import getUser from './auth-service';
import prisma from './db';

export const isBlockedByUser = async (id: string) => {
  try {
    const currentUser = await getUser();

    const otherUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error('User not found');
    }

    if (otherUser.id === currentUser.id) {
      return false;
    }

    const existingBlock = await prisma.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: otherUser.id,
          blockedId: currentUser.id,
        },
      },
    });

    return !!existingBlock;
  } catch {
    return false;
  }
};

export const blockUser = async (id: string) => {
  const currentUser = await getUser();

  if (currentUser.id === id) {
    throw new Error('Cannot block yourself');
  }

  const otherUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error('User not found');
  }

  const existingBlock = await prisma.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: currentUser.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (existingBlock) {
    throw new Error('Already blocked');
  }

  const block = await prisma.block.create({
    data: {
      blockerId: currentUser.id,
      blockedId: otherUser.id,
    },
    include: {
      blocked: true,
    },
  });

  return block;
};

export const unblockUser = async (id: string) => {
  const currentUser = await getUser();

  if (currentUser.id === id) {
    throw new Error('Cannot unblock yourself');
  }

  const otherUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error('User not found');
  }

  const existingBlock = await prisma.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: currentUser.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (!existingBlock) {
    throw new Error('Not blocked');
  }

  const unblock = await prisma.block.delete({
    where: {
      id: existingBlock.id,
    },
    include: {
      blocked: true,
    },
  });

  return unblock;
};

export async function getBlockedUsers() {
  const user = await getUser();

  const blockedUsers = await prisma.block.findMany({
    where: {
      blockerId: user.id,
    },
    include: {
      blocked: true,
    }
  })

  return blockedUsers
}