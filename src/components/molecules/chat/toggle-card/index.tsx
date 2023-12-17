'use client';

import updateStream from '@/actions/stream';
import Switch from '@/components/atoms/switch';
import { useTransition } from 'react';
import { toast } from 'sonner';
import Skeleton from '@/components/atoms/skeleton';

type FieldTypes = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly';

type TToggleCard = {
  label: string;
  value: boolean;
  field: FieldTypes;
};

function ToggleCard({ label, value = false, field }: TToggleCard) {
  const [isPending, startTransition] = useTransition();

  const onChange = async () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => toast.success('Chat settings updated'))
        .catch(() => toast.error('Failed to update chat settings'));
    });
  };

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch onCheckedChange={onChange} checked={value} disabled={isPending}>
            {value ? 'On' : 'Off'}
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default ToggleCard;

export function ToggleCartSkeleton() {
  return (
    <Skeleton className='rounded-xl p-10 w-full' />
  )
}