import Following, {
  FollowingSkeleton,
} from '@/components/molecules/browse/sidebar-following';
import Recommended, {
  RecommendedSkeleton,
} from '@/components/molecules/browse/sidebar-recommended';
import Wrapper from '@/components/molecules/browse/sidebar-wrapper';
import ToggleSidebar from '@/components/molecules/browse/toggle-sidebar';
import { getFollowedUsers } from '@/lib/follow-service';
import getRecommended from '@/lib/recommended-service';

async function Sidebar() {
  const recommended = await getRecommended();
  const following = await getFollowedUsers();
  return (
    <Wrapper>
      <ToggleSidebar />
      <div className="pt-4 space-y-4 lg:pt-0">
        <Following data={following} />
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
}

export default Sidebar;

export function SidebarSkeleton() {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-slate-900 z-50">
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
}
