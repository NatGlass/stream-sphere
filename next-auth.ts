import prisma from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import { generateFromEmail } from 'unique-username-generator';
import authConfig from './next-auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) { 
      if (token.sub) {
        // eslint-disable-next-line no-param-reassign
        session.user.id = token.sub;
      }

      if (token.username) {
        // eslint-disable-next-line no-param-reassign
        session.user.username = token.username as string;
      }

      return session;
    },
    async jwt({ token }) {
      const id = token.sub;

      if (!id) return token;

      const dbUser = await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          username: true,
        },
      });

      if (!dbUser) return token;

      return {
        ...token,
        username: dbUser.username
      }

    },
  },
  events: {
    createUser: async ({ user }) => {
      const email = user.email || '';
      const username = generateFromEmail(email, 3);

      await prisma.user.update({
        where: { email },
        data: {
          username,
          stream: {
            create: {
              name: `${username}'s stream`,
            },
          },
        },
      });
    },
  },
  ...authConfig,
});
