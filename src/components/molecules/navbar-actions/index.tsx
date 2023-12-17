import { Button } from '@/components/atoms/button';
import SignInButton from '@/components/auth/sign-in-button';
import UserButton from '@/components/auth/user-button';
import { currentUser } from '@/lib/auth';
import { LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

async function Actions() {
  const user = await currentUser();
  return (
    <div className="flex items-center justify-end ml-4 gap-x-2 lg:ml-0">
      {!user && (
        <SignInButton>
          <Button>Login</Button>
        </SignInButton>
      )}
      {!!user && (
        <div className="flex items-center gap-x-4">
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            asChild
            title="Dashboard"
          >
            <Link href={`/user/${user.username}`}>
              <LayoutDashboard className="w-5 h-5 text-muted-foreground lg:mr-2" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </div>
  );
}

export default Actions;
