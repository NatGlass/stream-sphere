'use client';

import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

import { Button } from '@/components/atoms/button';
import Hint from '@/components/atoms/hint';
import useChatSidebar from '@/context/useChatSidebar';

function ChatToggle() {
  const { collapsed, onExpand, onCollapse } = useChatSidebar((state) => state);

  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

  const onToggle = () => {
    if (collapsed) {
      onExpand();
    } else {
      onCollapse();
    }
  };

  const label = collapsed ? 'Expand chat' : 'Collapse chat';

  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto p-2 hover:bg-white/10 hover:text-white bg-transparent"
      >
        <Icon className="w-4 h-4" />
      </Button>
    </Hint>
  );
}

export default ChatToggle;
