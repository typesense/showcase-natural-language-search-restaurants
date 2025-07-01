import Link from 'next/link';

export default function Heading() {
  return (
    <div className='mb-6 flex flex-col items-center gap-2'>
      <Link href={'/'}>
        <h1 className='text-3xl font-bold'>
          Natural language restaurant search
        </h1>
      </Link>
      <div className='flex items-center gap-2 text-sm'>
        Powered by
        <a
          href='https://typesense.org/'
          target='_blank'
          rel='noopener noreferrer'
          className='text-[#D90368]'
        >
          type<b>sense|</b>
        </a>
      </div>
    </div>
  );
}
