import { ExternalLinkIcon, GithubIcon } from '@/components/icons';
import { GITHUB_LINK } from '@/utils/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';

export default function Header() {
  return (
    <header className='w-full flex justify-end mb-2'>
      <nav className='flex gap-6 items-center'>
        <Dialog>
          <DialogTrigger>
            <span className='text-sm flex items-center gap-1 hover:underline'>
              About
            </span>
          </DialogTrigger>
          <DialogContent className='md:min-w-[700px]'>
            <DialogHeader>
              <DialogTitle className='mb-2 text-left'>About</DialogTitle>
              <DialogDescription className='font-normal leading-6 text-left'>
                This demo restaurant search showcases the new Natural Language
                Search feature powered by Typesense. This allows users to search
                for restaurants using everyday language.
                <br />
                <br />
                Instead of needing to use specific keywords or precise filters,
                you can simply type a free-form sentence into the search bar.
                Typesense then uses Large Language Models (LLMs) to understand
                your intent, automatically translating your natural language
                query into structured search parameters like filters, sort
                orders, and relevant keywords.
                <br />
                <br />
                This means you can find exactly what you're looking for with
                ease and flexibility, even if your exact keywords aren't in the
                restaurant's description. Experience a more intuitive and
                powerful way to discover your next dining destination!
                <br />
                <br />
                This demo uses the dataset "TripAdvisor European restaurants"
                which is available on{' '}
                <a
                  className='text-[#5d7c1d] underline'
                  target='_blank'
                  href='https://www.kaggle.com/datasets/stefanoleone992/tripadvisor-european-restaurants'
                >
                  Kaggle
                </a>
                .
                <br />
                <br />
                For more details on this feature, visit the{' '}
                <a
                  className='text-[#5d7c1d] underline'
                  target='_blank'
                  href='https://typesense.org/docs/29.0/api/natural-language-search.html#use-case'
                >
                  Typesense Natural Language Search documentation
                </a>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <a href={GITHUB_LINK} target='_blank' rel='noopener noreferrer'>
          <GithubIcon className='size-7' aria-label='Source code' />
        </a>
      </nav>
    </header>
  );
}
