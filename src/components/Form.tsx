import { useEffect, useState } from 'react';
import { SearchIcon } from './icons';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { FileJson2, Sheet } from 'lucide-react';
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import ResponseDisplay from './ResponseDisplay';

export default function Form({ q }: { q: string }) {
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
      }}
      className='w-full flex gap-2.5 mb-4'
    >
      <div className='flex-1 relative'>
        <input
          className='w-full h-full px-5 pr-10 border border-gray-300 rounded-full focus:outline-none placeholder:font-light text-sm'
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type in the car's specification, e.g. newest manual Ford, V6, under $50K..."
        />
        <ResponseDisplay />
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
