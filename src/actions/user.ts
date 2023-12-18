'use server';

import getUser from '@/lib/auth-service';
import prisma from '@/lib/db';
import { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';

// eslint-disable-next-line import/prefer-default-export
export async function updateUser(values: Partial<User>) {
  try {
    const user = await getUser();

    const validData = {
      bio: values.bio,
      username: values.username,
      image: values.image,
    };

    if (validData.username === '' || validData.username === null) {
      throw new Error('Username cannot be empty');
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: { ...validData },
    });

    revalidatePath(`/user/${user.username}`);
    revalidatePath(`/${user.username}`);

    return updatedUser;
  } catch (error) {
    throw new Error('Internal error');
  }
}
