'use client';

import { Search as SearchIcon, X } from 'lucide-react';
import qs from 'query-string';

import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function Search() {
  const router = useRouter();
  const [value, setValue] = useState('');

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!value) {
      return null;
    }

    const url = qs.stringifyUrl(
      {
        url: '/search',
        query: { search: value },
      },
      { skipNull: true }
    );

    return router.push(url);
  }

  function onClear() {
    setValue('');
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative w-1/2 lg:w-[400px] flex items-center"
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      {value && (
        <X
          onClick={() => onClear()}
          className="absolute w-5 h-5 top-2.5 right-14 text-muted-foreground cursor-pointer hover:opacity-75 transition"
        />
      )}
      <Button
        size="sm"
        type="submit"
        variant="ghost"
        className="rounded-l-none"
      >
        <SearchIcon className="w-5 h-5 text-muted-foreground" />
      </Button>
    </form>
  );
}

export default Search;
