'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/atoms/alert';
import { Button } from '@/components/atoms/button';
import {
  Dialog,
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
import { AlertTriangle } from 'lucide-react';

function ConnectModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Generate Connection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate New Connection</DialogTitle>
        </DialogHeader>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="RTMP">RTMP</SelectItem>
            <SelectItem value="WHIP">WHIP</SelectItem>
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
          <Button variant="ghost">Cancel</Button>
          <Button onClick={() => {}}>Generate</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ConnectModal;
