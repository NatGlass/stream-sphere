import DashboardSidebarContainer from '@/components/molecules/dashboard-sidebar-container';
import DashboardNavbar from '@/components/organisms/dashboard-navbar';
import DashboardSidebar from '@/components/organisms/dashboard-sidebar';
import { getSelfByUsername } from '@/lib/auth-service';
import { redirect } from 'next/navigation';

type TDashboardLayout = {
  params: {
    username: string;
  };
  children: React.ReactNode;
};

async function DashboardLayout({ params, children }: TDashboardLayout) {
  const self = await getSelfByUsername(params.username);

  if (!self) {
    redirect('/');
  }
  return (
    <>
      <DashboardNavbar />
      <div className="flex h-full pt-20">
        <DashboardSidebar />
        <DashboardSidebarContainer>{children}</DashboardSidebarContainer>
      </div>
    </>
  );
}

export default DashboardLayout;
