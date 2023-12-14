'use client';

import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { useState } from 'react';
import CopyButton from '../../copy-button';

type TKeyCard = {
  value: string | null;
};

function KeyCard({ value }: TKeyCard) {
    const [showKey, setShowKey] = useState(false);

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center gap-x-10">
        <p className="font-semibold shrink-0">Server Key</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              value={value || ''}
              type={showKey ? "text": "password"}
              disabled
              placeholder="Server Key"
            />
            <CopyButton value={value || ''} />
          </div>
          <Button size="sm" variant="link" onClick={() => setShowKey(!showKey)}>
            {showKey ? 'Hide' : 'Show'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default KeyCard;
