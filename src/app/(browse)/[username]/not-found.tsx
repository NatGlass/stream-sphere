import { Button } from '@/components/atoms/button';
import Link from 'next/link';

function NotFoundPage() {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <h1 className='text-xl lg:text-2xl'>404</h1>
      <p className='text-center'>
        Unable to find this user, they may no longer exist or have blocked you.
      </p>
      <Button variant="secondary" asChild>
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
}

export default NotFoundPage;
