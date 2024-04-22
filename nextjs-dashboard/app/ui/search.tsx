'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import debounce from '@/app/lib/debounce';
import { useCallback } from 'react';

export default function Search({ placeholder }: { placeholder: string }) {
  console.log("Search Renderered");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    // console.log(`Searching: ${term}`);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    // naviguate to the constructed href
    // the url is update without reloading the page thanks to
    // Next's client side navigation
    replace(`${pathname}?${params.toString()}`);
  }

  const debounceHandleSearch = debounce(handleSearch, 5000);

  // React by default will create a new debounceHandleSearch function at each
  // render, which will create multiple function and hence demultiply the delay
  // TODO: why developpement mode (two renders of the same component) doesn't disturb us ?
  // TODO: slowness on the client, with sometimes 2 seconds (???) after handleSearch fired
  const cachedDebounceHandleSearch = useCallback(debounceHandleSearch, []);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(event) => {
          cachedDebounceHandleSearch(event.target.value);
        }}
        // we use defaultValue instead of value
        // it is not a react controlled component (data from the state)
        // but a standard component as the data is in the url
        // the native input will manage its own state
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
