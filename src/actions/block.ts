import { blockUser } from '@/lib/block-service';
import { revalidatePath } from 'next/cache';

export async function onBlock(id: string) {
  const blockedUser = await blockUser(id);

  if (blockedUser) {
    revalidatePath(`/${blockedUser.blocked.id}`);
  }

  return blockedUser;
}

export async function onUnblock(id: string) {
  const unblockedUser = await blockUser(id);

  if (unblockedUser) {
    revalidatePath(`/${unblockedUser.blocked.id}`);
  }

  return unblockedUser;
}
