import DataTable from '@/components/molecules/community/data-table';
import { columns } from '@/components/molecules/community/data-table/columns';
import { getBlockedUsers } from '@/lib/block-service';
import { format } from 'date-fns';

async function CommunityPage() {
  const blockedUsers = await getBlockedUsers();

  const formattedData = blockedUsers.map((block) => ({
    ...block,
    userId: block.blocked.id,
    imageUrl: block.blocked.image,
    username: block.blocked.username,
    createdAt: format(new Date(block.blocked.createdAt), 'dd/MM/yyyy'),
  }));

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Community Settings</h1>
      </div>
      <DataTable columns={columns} data={formattedData} />
    </div>
  );
}

export default CommunityPage;
