import Skeleton from '@/components/atoms/skeleton';
import getStreams from '@/lib/feed';
import ResultCard, { ResultCardSkeleton } from '../result-card';

async function Results() {
  const data = await getStreams();
  return (
    <div>
      <h1 className="text-lg font-semibold mb-4">
        Recommended streams for you
      </h1>
      {data.length === 0 && (
        <div className="text-muted-foreground text-sm">
          <p>No streams found</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data.map((result) => (
          <ResultCard key={result.id} data={result} />
        ))}
      </div>
    </div>
  );
}

export default Results;

export function ResultsSkeleton() {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(4)].map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
