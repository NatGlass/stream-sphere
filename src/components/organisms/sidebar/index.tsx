import Recommended from '@/components/molecules/sidebar-recommended';
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
