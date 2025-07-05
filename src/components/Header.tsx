import { ExternalLinkIcon, GithubIcon } from '@/components/icons';
import { GITHUB_LINK } from '@/utils/utils';

export default function Header() {
  return (
    <header className='w-full flex justify-end mb-2'>
      <nav className='flex gap-6 items-center'>
        <a
          className='text-sm flex items-center gap-1'
          href={'/'}
          target='_blank'
          rel='noopener noreferrer'
        >
          About <ExternalLinkIcon aria-label='Link to article' />
        </a>
        <a href={GITHUB_LINK} target='_blank' rel='noopener noreferrer'>
          <GithubIcon className='size-7' aria-label='Source code' />
        </a>
      </nav>
    </header>
  );
}
