import { Button } from '@/components/atoms/button';
import UserButton from '@/components/auth/user-button';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

function DashboardActions() {
  return (
    <div className="flex items-center justify-end gap-x-4">
      <Button
        size="sm"
        variant="ghost"
        className="text-muted-foreground"
        asChild
      >
        <Link href="/">
          <LogOut className="h-5 w-5 mr-2" />
          Exit
        </Link>
      </Button>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

export default DashboardActions;
