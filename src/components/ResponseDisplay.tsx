import { FileJson2 } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';

export default function ResponseDisplay({
  parsedNLQuery,
}: {
  parsedNLQuery: object;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={'ghost'}
          size={'icon'}
          className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full size-8'
        >
          <FileJson2 strokeWidth={1.5} className='stroke-gray-600' />
        </Button>
      </SheetTrigger>
      <SheetContent className='lg:!min-w-[500px]'>
        <SheetHeader>
          <SheetTitle>Generated Typesense query</SheetTitle>
          <SheetDescription>
            <a
              className='underline underline-offset-2'
              target='_blank'
              href='https://typesense.org/docs/latest/api/natural-language-search.html#response-fields'
            >
              See docs
            </a>{' '}
            for more details on response fields.
          </SheetDescription>
        </SheetHeader>
        <div className='mt-4 !text-sm'>
          <JsonView src={parsedNLQuery} theme='atom' />
        </div>
      </SheetContent>
    </Sheet>
  );
}
