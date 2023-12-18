'use client';

import { Button } from '@/components/atoms/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import UserAvatar from '../../browse/user-avatar';
import UnblockButton from '../unblock-button';

export type BlockedUser = {
  id: string;
  userId: string;
  imageUrl: string | null;
  username: string | null;
  createdAt: string;
};

export const columns: ColumnDef<BlockedUser>[] = [
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Username
        <ArrowUpDown className="w-4 h-4 ml-2" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-x-4">
        <UserAvatar
          username={row.original.username!}
          imageUrl={row.original.imageUrl!}
        />
        <span>{row.original.username}</span>
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Date Blocked
        <ArrowUpDown className="w-4 h-4 ml-2" />
      </Button>
    ),
  },
  {
    id: 'actions',
    cell: ({row}) => <UnblockButton userId={row.original.userId} />,
  },
];
