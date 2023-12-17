import Skeleton from '@/components/atoms/skeleton';
import getSearch from '@/lib/search-service';
import SearchResultCard, {
  SearchResultCardSkeleton,
} from '../search-result-card';

type TSearchResults = {
  search?: string;
};

async function SearchResults({ search }: TSearchResults = {}) {
  const data = await getSearch(search || '');
  return (
    <div>
      <h1 className="text-lg font-semibold mb-4">
        Results for &quot;{search}&quot;
      </h1>
      {data.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No results found for &quot;{search}&quot;. Try searching for something
          else.
        </p>
      )}
      <div className="flex flex-col gap-y-4">
        {data.map((result) => (
          <SearchResultCard data={result} key={result.id} />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;

export function SearchResultsSkeleton() {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="flex flex-col gap-y-4">
        {[...Array(4)].map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <SearchResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
