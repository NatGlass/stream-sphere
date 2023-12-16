import getUser from '@/lib/auth-service';
import prisma from '@/lib/db';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
  thumbnailUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(async () => {
      const user = await getUser();

      return { user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.stream.update({
        where: {
          userId: metadata.user.id,
        },
        data: {
          thumbnailUrl: file.url,
        },
      });

      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
