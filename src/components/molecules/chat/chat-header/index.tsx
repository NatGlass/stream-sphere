'use client';

import Skeleton from '@/components/atoms/skeleton';
import ChatToggle from '../chat-toggle';
import VariantToggle from '../variant-toggle';

function ChatHeader({ hostName }: { hostName: string }) {
  return (
    <div className="relative p-3 border-b">
      <div className="absolute left-2 top-2 hidden lg:block">
        <ChatToggle />
      </div>
      <p className="font-semibold text-white text-center capitalize">
        {hostName}&apos;s Chat
      </p>
      <div className="absolute right-2 top-2">
        <VariantToggle />
      </div>
    </div>
  );
}

export default ChatHeader;

export function ChatHeaderSkeleton() {
  return (
    <div className="relative p-3 border-b hidden md:block">
      <Skeleton className="absolute h-6 w-6 left-3 top-3" />
      <Skeleton className="w-28 h-6 mx-auto" />
    </div>
  );
}
