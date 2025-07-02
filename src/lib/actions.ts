import { SearchParams } from 'typesense/lib/Typesense/Documents';
import { _Restaurant, typesense } from './typesense';
import { clientEnv } from '@/utils/env';

export type _carsData = Awaited<ReturnType<ReturnType<typeof fetchCars>>>;

export default function fetchCars(
  searchParams: SearchParams<_Restaurant, string>
) {
  return async ({ pageParam }: { pageParam: number }) => {
    console.log(searchParams);
    const res = await typesense()
      .collections<_Restaurant>(clientEnv.TYPESENSE_COLLECTION_NAME)
      .documents()
      .search({
        ...searchParams,
        query_by: 'restaurant_name',
        per_page: 12,
        page: pageParam,
      });
    console.log(res);
    const { per_page = 0 } = res.request_params;

    return {
      data: res.hits,
      nextPage: pageParam * per_page < res.found ? pageParam + 1 : null,
    };
  };
}
