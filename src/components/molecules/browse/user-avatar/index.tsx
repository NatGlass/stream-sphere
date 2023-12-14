import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/avatar';
import Skeleton from '@/components/atoms/skeleton';
import cn from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import LiveBadge from '../../live-badge';
import './user-avatar.css';

const avatarSizes = cva('', {
  variants: {
    size: {
      default: 'h-8 w-8',
      lg: 'h-14 w-14',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

type TUserAvatar = {
  username: string;
  imageUrl: string;
  isLive?: boolean;
  showBadge?: boolean;
} & VariantProps<typeof avatarSizes>;

function UserAvatar({
  username,
  imageUrl,
  isLive,
  showBadge,
  size,
}: TUserAvatar) {
  const canShowBadge = showBadge && isLive;
  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && 'ring-2 ring-blue-500 border border-background ring-pulse',
          avatarSizes({ size })
        )}
      >
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>
          {username[0]}
          {username[1]}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
}

export default UserAvatar;

type TUserAvatarSkeleton = {} & VariantProps<typeof avatarSizes>;

export function UserAvatarSkeleton({ size }: TUserAvatarSkeleton) {
  return <Skeleton className={cn('rounded-full', avatarSizes({ size }))} />;
}
