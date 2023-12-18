import { auth } from '@/../next-auth';
import { useSession as useNextAuthSession } from 'next-auth/react';

export function useAuth() {
  const session = useNextAuthSession();

  return session.data?.user;
}

export function useUser() {
  const session = useNextAuthSession();

  return session.data?.user;
}

export async function currentUser() {
  const session = await auth();
  return session?.user;
}
