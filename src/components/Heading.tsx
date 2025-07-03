import Link from 'next/link';

export default function Heading() {
  return (
    <div className='mb-6 flex flex-col items-center gap-2'>
      <Link href={'/'}>
        <h1 className='text-3xl font-bold capitalize'>
          Natural language restaurant search
        </h1>
      </Link>
      <div className='flex items-center gap-2 font-normal text-sm'>
        Powered by
        <a
          href='https://typesense.org/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            className='h-6'
            src='https://typesense.org/typesense-logo.svg'
            alt='Typesense logo'
          />
        </a>
      </div>
    </div>
  );
}
