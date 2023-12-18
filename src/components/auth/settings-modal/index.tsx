'use client';

import { updateUser } from '@/actions/user';
import { Button } from '@/components/atoms/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog';
import Hint from '@/components/atoms/hint';
import { Input } from '@/components/atoms/input';
import { UploadDropzone } from '@/lib/uploadthing';
import { Settings, Trash } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ElementRef, useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';

type TSettingsModal = {
  initialUsername: string | null;
  initialImage: string | null;
};

function SettingsModal({ initialUsername, initialImage }: TSettingsModal) {
  const router = useRouter();
  const closeRef = useRef<ElementRef<'button'>>(null);
  const [isPending, startTransition] = useTransition();
  const [username, setUsername] = useState(initialUsername || '');
  const [image, setImage] = useState(initialImage || '');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateUser({ username })
        .then(() => {
          toast.success('Username updated');
          closeRef.current?.click();
        })
        .catch(() => toast.error('Failed to update username'));
    });
  };

  const onRemove = () => {
    startTransition(() => {
      updateUser({ image: null })
        .then(() => {
          toast.success('Image removed');
          closeRef.current?.click();
        })
        .catch(() => toast.error('Failed to remove image'));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user settings</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isPending}
          />
          {image ? (
            <div className="relative aspect-video rounded-xl border border-white/10">
              <div className="absolute top-2 right-2 z-[10]">
                <Hint label="Remove thumbnail" asChild side="left">
                  <Button
                    type="button"
                    disabled={isPending}
                    onClick={onRemove}
                    className="h-auto w-auto p-1.5 bg-white"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </Hint>
              </div>
              <Image
                src={image}
                alt="Thumbnail"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="rounded-xl border outline-dashed outline-muted">
              <UploadDropzone
                endpoint="imageUploader"
                appearance={{
                  label: {
                    color: '#FFF',
                  },
                  allowedContent: {
                    color: '#FFF',
                  },
                }}
                onClientUploadComplete={(res) => {
                  setImage(res?.[0].url);
                  router.refresh();
                  closeRef.current?.click();
                }}
              />
            </div>
          )}
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsModal;
