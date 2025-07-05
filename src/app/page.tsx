'use client';
import RestaurantList from '@/components/RestaurantList';
import ExampleSearchTerms from '@/components/ExampleSearchTerms';
import Heading from '@/components/Heading';
import { _Restaurant, typesense } from '@/lib/typesense';
import { Suspense, useEffect, useState } from 'react';
import {
  SearchResponse,
  SearchParams,
} from 'typesense/lib/Typesense/Documents';
import { useSearchParams, useRouter } from 'next/navigation';
import Form from '@/components/Form';
import LoaderSVG from '@/components/LoaderSVG';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { TYPESENSE_CONFIG } from '@/utils/utils';
import Header from '@/components/Header';
import { clientEnv } from '@/utils/env';
import React from 'react';
import { RequestMalformed } from 'typesense/lib/Typesense/Errors';
import getUserLocation from '@/hooks/getUserLocation';

// This version of typesense-js hasn't had support for NL search types yet
declare module 'typesense/lib/Typesense/Documents' {
  interface SearchResponse<T> {
    parsed_nl_query: {
      augmented_params: object;
      generated_params: object;
      parse_time_ms: number;
    };
  }
  interface SearchParams<
    TDoc extends DocumentSchema,
    Infix extends string = string
  > {
    nl_query?: boolean;
    nl_model_id?: string;
    nl_query_debug?: boolean;
  }
}

export default function Home() {
  return (
    <main className='flex flex-col items-center px-2 py-10 max-w-screen-lg m-auto font-medium'>
      <Header />
      <Heading />
      <Suspense fallback={<LoaderSVG />}>
        <Search />
      </Suspense>
    </main>
  );
}

export type _TypesenseQuery = any;

function Search() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const router = useRouter();
  const [parsedNLQuery, setParsedNLQuery] = useState<object | null>(null);
  const { location, error } = getUserLocation();

  const [loadingState, setLoadingState] = useState<'searching' | 'finished'>(
    'finished'
  );

  const [data, setData] = useState<{
    params: _TypesenseQuery;
    searchResponse: SearchResponse<_Restaurant>;
  }>();

  const found = data?.searchResponse.found || 0;
  const nextPage = 1 * TYPESENSE_CONFIG.per_page < found ? 2 : null;

  // Here we perform an initial search to get the llm generated params which we will then use for subsequent pagination requests
  async function getCars(q: string) {
    toast({}).dismiss();
    setParsedNLQuery(null);
    setData(undefined);
    setLoadingState('searching');

    try {
      // embedding the user location inside the query
      const query =
        q + (location ? ` USER:${location}` : 'USER:permissionDenied');

      const searchResponse = await typesense()
        .collections<_Restaurant>(clientEnv.TYPESENSE_COLLECTION_NAME)
        .documents()
        .search({
          q: query,
          nl_query: true,
          nl_model_id: 'gemini-model',
          query_by: TYPESENSE_CONFIG.query_by,
          per_page: TYPESENSE_CONFIG.per_page,
        });

      setParsedNLQuery(searchResponse.parsed_nl_query);

      setData({
        params: searchResponse.parsed_nl_query.augmented_params,
        searchResponse,
      });
    } catch (error) {
      let errorMsg = '';
      console.log(error);
      if (error instanceof RequestMalformed) {
        errorMsg = error.message;
      }
      errorToast(errorMsg || 'Please try again with a different query.');
    } finally {
      setLoadingState('finished');
    }
  }

  const errorToast = (msg: string) =>
    toast({
      variant: 'destructive',
      title: `Error processing your request!`,
      description: msg,
      duration: 5000,
      action: (
        <ToastAction onClick={() => getCars(q)} altText='Try again'>
          Try again
        </ToastAction>
      ),
    });

  useEffect(() => {
    setParsedNLQuery(null);
    setData(undefined);
  }, [q]);

  useEffect(() => {
    // Initial search
    if (q && (location || error)) getCars(q);
  }, [q, location, error]);

  const render = () => {
    if (loadingState !== 'finished') return <LoaderSVG />;

    if (data) {
      const parsedTime = data.searchResponse.parsed_nl_query.parse_time_ms;
      const searchTime = data.searchResponse.search_time_ms - parsedTime;
      return found == 0 ? (
        <div className='mt-20 text-light'>
          Oops! Couldn't find what you are looking for.
        </div>
      ) : (
        <>
          <div className='self-start mb-4 text-sm'>
            Found {found} {found > 1 ? 'results' : 'result'} in {searchTime}ms,
            parsing took {parsedTime}ms.
          </div>
          <RestaurantList
            initialData={{
              data: data.searchResponse.hits,
              nextPage,
            }}
            queryKey={JSON.stringify(parsedNLQuery)}
            // Pass the generated params to use for pagination
            searchParams={data.params}
          />
        </>
      );
    }

    return (
      <ExampleSearchTerms
        onClick={(searchTerm) => router.push(`?q=${searchTerm}`)}
      />
    );
  };

  return (
    <>
      <Form q={q} parsedNLQuery={parsedNLQuery} onSubmit={(q) => getCars(q)} />
      {render()}
    </>
  );
}
