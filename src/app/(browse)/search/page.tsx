import SearchResults, {SearchResultsSkeleton} from '@/components/molecules/search/search-results';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

type TSearchPage = {
  searchParams: {
    search?: string;
  };
};

function SearchPage({ searchParams }: TSearchPage) {
  if (!searchParams.search) {
    redirect('/');
  }
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResults search={searchParams.search} />
      </Suspense>
    </div>
  );
}

export default SearchPage;
