'use client';

import { MessageSquare, Users } from 'lucide-react';

import { Button } from '@/components/atoms/button';
import Hint from '@/components/atoms/hint';
import useChatSidebar, { ChatVariant } from '@/context/useChatSidebar';

function VariantToggle() {
  const { variant, onChangeVariant } = useChatSidebar((state) => state);

    const isChat = variant === ChatVariant.CHAT;
    
  const Icon = isChat ? Users : MessageSquare;


  const onToggle = () => {
      const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
      onChangeVariant(newVariant)
  };

  const label = isChat ? 'Community' : 'Chat';

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

export default VariantToggle;
