import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export default function LocalTimeTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className='text-gray-400 hover:text-gray-600 transition-colors'>
            <HelpCircle className='w-4 h-4' />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p className='text-sm'>In restaurant's local time.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
