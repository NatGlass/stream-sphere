import DashboardSidebarNavigation from "@/components/molecules/dashboard/dashboard-sidebar-navigation";
import DashboardSidebarWrapper from "@/components/molecules/dashboard/dashboard-sidebar-wrapper";
import ToggleDashboardSidebar from "@/components/molecules/dashboard/toggle-dashboard-sidebar";

function DashboardSidebar() {
  return <DashboardSidebarWrapper>
    <ToggleDashboardSidebar />
    <DashboardSidebarNavigation />
  </DashboardSidebarWrapper>;
}

export default DashboardSidebar;
