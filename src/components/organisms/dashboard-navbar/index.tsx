import Logo from '@/components/molecules/logo';
import DashboardActions from '@/components/molecules/dashboard-navbar-actions';

function DashboardNavbar() {
  return (
    <nav className="fixed top-0 w-full h-20 z-[40] bg-slate-900 border-r px-2 lg:px-4 flex justify-between items-center shadow-sm">
      <Logo />
      <DashboardActions />
    </nav>
  );
}

export default DashboardNavbar;
