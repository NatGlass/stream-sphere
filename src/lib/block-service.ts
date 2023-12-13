import getUser from './auth-service';
import prisma from './db';

export async function isBlockedByUser(id: string) {
  try {
    const currentUser = await getUser();

    const otherUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!otherUser) {
      throw new Error('User not found');
    }

    if (currentUser.id === otherUser.id) {
      throw new Error('You cannot block yourself');
    }

    const isBlocked = await prisma.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: otherUser.id,
          blockedId: currentUser.id,
        },
      },
    });

    return !!isBlocked;
  } catch (error) {
    return false;
  }
}

export async function blockUser(id: string) {
  const currentUser = await getUser();

  if (currentUser.id === id) {
    throw new Error('You cannot block yourself');
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
    throw new Error('You have already blocked this user');
  }

  const block = await prisma.block.create({
    data: {
      blockerId: currentUser.id,
      blockedId: otherUser.id,
    },
    include: {
      // Allows us to return the users username that was blocked on the client
      blocked: true,
    },
  });

  return block;
}

export async function unblockUser(id: string) {
  const currentUser = await getUser();

  if (currentUser.id === id) {
    throw new Error('You cannot unblock yourself');
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
    throw new Error('You have not blocked this user');
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
}
