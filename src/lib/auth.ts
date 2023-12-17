import {
  currentUser as clerkCurrentUser,
  useAuth as useClerkAuth,
  useUser as useClerkUser,
} from '@clerk/nextjs';

export function useAuth() {
  const auth = useClerkAuth();
  return auth;
}

export function useUser() {
  const user = useClerkUser();
  return user;
}

export async function currentUser() {
  const user = await clerkCurrentUser();
  return user;
}
