import Recommended, { RecommendedSkeleton } from '@/components/molecules/sidebar-recommended';
import Wrapper from '@/components/molecules/sidebar-wrapper';
import ToggleSidebar from '@/components/molecules/toggle-sidebar';
import getRecommended from '@/lib/recommended-service';

async function Sidebar() {
  const recommended = await getRecommended();
  return (
    <Wrapper>
      <ToggleSidebar />
      <div className="pt-4 space-y-4 lg:pt-0">
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
}

export default Sidebar;

export function SidebarSkeleton() {
  return (
    <aside className='fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-slate-900 z-50'>
      <RecommendedSkeleton />
    </aside>
  )
}