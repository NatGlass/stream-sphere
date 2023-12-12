import Container from '@/components/molecules/container';
import Navbar from '@/components/organisms/navbar';
import Sidebar from '@/components/organisms/sidebar';
import { PropsWithChildren } from 'react';

function BrowseLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
}

export default BrowseLayout;
