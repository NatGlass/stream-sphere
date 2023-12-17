'use server';

import getUser from '@/lib/auth-service';
import { blockUser, unblockUser } from '@/lib/block-service';
import { RoomServiceClient } from 'livekit-server-sdk';
import { revalidatePath } from 'next/cache';

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export async function onBlock(id: string) {
  const user = await getUser();

  let blockedUser;

  try {
    blockedUser = await blockUser(id);
  } catch {
    // This means user is a guest
  }

  try {
    await roomService.removeParticipant(user.id, id);
  } catch {
    // This means user is not in the room
  }

  revalidatePath(`/user/${user.username}/community`);

  return blockedUser;
}

export async function onUnblock(id: string) {
  const user = await getUser()
  const unblockedUser = await unblockUser(id);
  
  revalidatePath(`/user/${user.username}/community`);
  return unblockedUser;
};
