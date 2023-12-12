import Navbar from '@/components/organisms/navbar';
import { PropsWithChildren } from 'react';

function BrowseLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">{children}</div>
    </>
  );
}

export default BrowseLayout;
