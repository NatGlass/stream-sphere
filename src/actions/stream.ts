'use server';

import getUser from '@/lib/auth-service';
import prisma from '@/lib/db';
import { Stream } from '@prisma/client';
import { revalidatePath } from 'next/cache';

async function updateStream(values: Partial<Stream>) {
  try {
    const currentUser = await getUser();
    const currentStream = await prisma.stream.findUnique({
      where: {
        userId: currentUser.id,
      },
    });

    if (!currentStream) {
      throw new Error('Stream not found');
    }

    const validData = {
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatFollowersOnly: values.isChatFollowersOnly,
      isChatDelayed: values.isChatDelayed,
    };

    const stream = await prisma.stream.update({
      where: {
        id: currentStream.id,
      },
      data: {
        ...validData,
      },
    });

    revalidatePath(`/user/${currentUser.username}`);
    revalidatePath(`/user/${currentUser.username}/chat`);
    revalidatePath(`/${currentUser.username}`);

    return stream;
  } catch (error) {
    throw new Error('Internal error');
  }
}

export default updateStream;
