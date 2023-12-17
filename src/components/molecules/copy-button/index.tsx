'use client';

import { Button } from '@/components/atoms/button';
import Hint from '@/components/atoms/hint';
import { CheckCheck, Copy } from 'lucide-react';
import { useState } from 'react';

type TCopyButton = {
  value?: string;
};

function CopyButton({ value }: TCopyButton) {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    if (!value) return;

    setIsCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const Icon = isCopied ? CheckCheck : Copy;

  return (
    <Hint label="Copy to clipboard" asChild>
      <Button onClick={onCopy} disabled={!value || isCopied} variant="ghost">
        <Icon className="w-4 h-4 text-white" />
      </Button>
    </Hint>
  );
}

export default CopyButton;
