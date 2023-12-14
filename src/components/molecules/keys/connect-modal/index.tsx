'use client';

import createIngress from '@/actions/ingress';
import { Alert, AlertDescription, AlertTitle } from '@/components/atoms/alert';
import { Button } from '@/components/atoms/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select';
import { IngressInput } from 'livekit-server-sdk';
import { AlertTriangle } from 'lucide-react';
import { ElementRef, useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type TIngressType = typeof RTMP | typeof WHIP;

function ConnectModal() {
  const closeRef = useRef<ElementRef<'button'>>(null);
  const [isPending, startTransition] = useTransition();
  const [ingressType, setIngressType] = useState<TIngressType>(RTMP);

  const onSubmit = () => {
    startTransition(() => {
      createIngress(parseInt(ingressType, 10))
        .then(() => {
          toast.success('Ingress created');
          closeRef?.current?.click();
        })
        .catch(() => toast.error('Failed to create ingress'));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Generate Connection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate New Connection</DialogTitle>
        </DialogHeader>
        <Select
          value={ingressType}
          onValueChange={(value) => setIngressType(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className="w-4 h-4" />
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>
            This will generate a new stream key and server URL. You will need to
            update your streaming software with the new key and URL.
          </AlertDescription>
        </Alert>
        <div className="flex justify-between">
          <DialogClose ref={closeRef} asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button disabled={isPending} onClick={onSubmit}>
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ConnectModal;
