'use server';

import { revalidatePath } from 'next/cache';

import getUser from '@/lib/auth-service';
import prisma from '@/lib/db';
import { followUser } from '@/lib/follow-service';

export async function onFollow(id: string) {
  try {
    const followedUser = await followUser(id);

    revalidatePath('/');

    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`);
    }

    return followedUser;
  } catch (error) {
    throw new Error('Internal error');
  }
}

export async function unfollowUser(id: string) {
  const currentUser = await getUser();

  const otherUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw new Error('User not found');
  }

  if (otherUser.id === currentUser.id) {
    throw new Error('You cannot unfollow yourself');
  }

  const existingFollow = await prisma.follow.findFirst({
    where: {
      followerId: currentUser.id,
      followingId: otherUser.id,
    },
  });

  if (!existingFollow) {
    throw new Error('You are not following this user');
  }

  const deleteFollow = await prisma.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  });

  return deleteFollow;
}

export async function onUnfollow(id: string) {
  try {
    const unfollowedUser = await unfollowUser(id);

    revalidatePath('/');

    if (unfollowedUser) {
      revalidatePath(`/${unfollowedUser.following.username}`);
    }

    return unfollowedUser;
  } catch (error) {
    throw new Error('Internal error');
  }
}
