'use client';

import updateStream from '@/actions/stream';
import { Button } from '@/components/atoms/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog';
import { Input } from '@/components/atoms/input';
import { Label } from '@/components/atoms/label';
import { useRouter } from 'next/navigation';
import { ElementRef, useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';

import Hint from '@/components/atoms/hint';
import { UploadDropzone } from '@/lib/uploadthing';
import { Trash } from 'lucide-react';
import Image from 'next/image';

type TInfoModal = {
  initialName: string;
  initialThumbnail: string | null;
};

function InfoModal({ initialName, initialThumbnail }: TInfoModal) {
  const router = useRouter();
  const closeRef = useRef<ElementRef<'button'>>(null);
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(initialName);
  const [thumbnail, setThumbnail] = useState(initialThumbnail);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateStream({ name })
        .then(() => {
          toast.success('Stream updated');
          closeRef.current?.click();
        })
        .catch(() => toast.error('Something went wrong'));
    });
  };

  const onRemove = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          toast.success('Thumbnail removed');
          setThumbnail('');
          closeRef.current?.click();
        })
        .catch(() => toast.error('Something went wrong'));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit your stream information</DialogTitle>
        </DialogHeader>
        <form className="space-y-14" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="Stream name"
              onChange={onChange}
              value={name}
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            {thumbnail ? (
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
                  src={thumbnail}
                  alt="Thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: '#FFF',
                    },
                    allowedContent: {
                      color: '#FFF',
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    setThumbnail(res?.[0].url);
                      router.refresh();
                      closeRef.current?.click();
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <DialogClose asChild ref={closeRef}>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default InfoModal;
