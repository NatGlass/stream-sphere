'use client';

import { Button } from '@/components/atoms/button';
import Link from 'next/link';

function ErrorPage() {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <h1 className="text-xl lg:text-2xl">Something went wrong</h1>
      <Button variant="secondary" asChild>
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
}

export default ErrorPage;
