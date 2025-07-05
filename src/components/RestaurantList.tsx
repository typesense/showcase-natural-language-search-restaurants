import fetchData, { _searchData } from '@/lib/actions';
import { useInfiniteQuery } from '@tanstack/react-query';
import LoaderSVG from './LoaderSVG';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import RestaurantCard from './RestaurantCard';

export default function CarList({
  initialData,
  searchParams,
  queryKey,
}: {
  initialData: _searchData;
  searchParams: object;
  queryKey: string;
}) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['restaurants', queryKey],
    queryFn: fetchData(searchParams),
    initialData: { pages: [initialData], pageParams: [1] },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (status === 'error') {
    console.log(error);
    return 'Error';
  }
  return (
    <>
      <ul className='w-full grid grid-cols-2 gap-4 max-md:grid-cols-1'>
        {data.pages.map((page) =>
          page.data?.map(({ document }) => (
            <RestaurantCard restaurantData={document} key={document.id} />
          ))
        )}
      </ul>
      {isFetchingNextPage && hasNextPage ? (
        <LoaderSVG />
      ) : (
        <div className='w-full text-center text-sm mt-4'>
          No more restaurants found.
        </div>
      )}
      <div ref={ref} />
    </>
  );
}
