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

export default function ResponseDisplay() {
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
      <SheetContent className='w-[85vw]'>
        <SheetHeader>
          <SheetTitle>Generated filter query</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className='mt-4'>
          <JsonView src={{ hello: true }} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
