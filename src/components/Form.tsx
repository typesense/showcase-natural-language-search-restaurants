import { useEffect, useState } from 'react';
import { SearchIcon } from './icons';
import { useRouter } from 'next/navigation';
import { ParsedNLQuery } from '@/app/page';

export default function Form({
  q,
  onSubmit,
}: {
  q: string;
  onSubmit: (q: string) => any;
}) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    setQuery(q);
  }, [q]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`?q=${query}`);
        // we only fire a search event if the query changes, this check if the user is retrying a search
        if (q === query) onSubmit(query);
      }}
      className='w-full flex gap-2.5 mb-4'
    >
      <div className='flex-1 relative'>
        <input
          className='w-full h-full font-normal px-5 pr-10 border border-gray-300 rounded-full focus:outline-none placeholder:font-light text-sm'
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type in what you're looking for in a restaurant , e.g. 'best pizza in Italy' or 'sushi in Paris'"
        />
      </div>
      <button
        className='bg-[#cffc75] aspect-square w-11 grid place-content-center rounded-full hover:bg-[#bee76b] transition'
        type='submit'
      >
        <SearchIcon className='size-5 fill-white' />
      </button>
    </form>
  );
}
