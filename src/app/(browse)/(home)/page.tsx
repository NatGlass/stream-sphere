import Results, { ResultsSkeleton } from '@/components/molecules/home/results';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="max-w-screen-2xl p-8 h-full mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </div>
  );
}
