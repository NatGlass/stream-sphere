import { signOut } from '@/../next-auth';
import getUser from '@/lib/auth-service';
import { LogOut } from 'lucide-react';
import { Button } from '../atoms/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../atoms/dropdown-menu';
import UserAvatar from '../molecules/browse/user-avatar';
import SettingsModal from './settings-modal';

async function UserButton() {
  const user = await getUser();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar username={user.username!} imageUrl={user.image!} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
        <SettingsModal
          initialImage={user.image}
          initialUsername={user.username}
        />
        <DropdownMenuSeparator />
        <form
          action={async () => {
            'use server';

            await signOut();
          }}
        >
          <Button size="sm" variant="ghost" className="w-full justify-start">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
