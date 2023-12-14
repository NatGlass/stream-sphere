import Container from '@/components/molecules/browse/sidebar-container';
import Navbar from '@/components/organisms/navbar';
import Sidebar, { SidebarSkeleton } from '@/components/organisms/sidebar';
import { PropsWithChildren, Suspense } from 'react';

function BrowseLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </>
  );
}

export default BrowseLayout;
