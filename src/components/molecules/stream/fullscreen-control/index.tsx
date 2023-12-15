'use client';

import Hint from '@/components/atoms/hint';
import { Maximize, Minimize } from 'lucide-react';

type TFullscreenControl = {
  isFullscreen: boolean;
  onToggle: () => void;
};

function FullscreenControl({ isFullscreen, onToggle }: TFullscreenControl) {
  const Icon = isFullscreen ? Minimize : Maximize;

  const label = isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen';

  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label} asChild>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          onClick={onToggle}
          className="text-white p-1.5 hover:bg-white/10 rounded-lg"
          title="Toggle fullscreen"
          type="button"
        >
          <Icon className="h-5 w-5" />
        </button>
      </Hint>
    </div>
  );
}

export default FullscreenControl;