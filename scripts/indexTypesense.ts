import Typesense from 'typesense';
import 'dotenv/config';
import fs from 'fs/promises';
import { resolve } from 'path';
import { typesense } from '@/lib/typesense';

const COLLECTION_NAME =
  process.env.NEXT_PUBLIC_TYPESENSE_COLLECTION_NAME || 'restaurant';
const PATH_TO_DATASET = './scripts/data/restaurants.jsonl';
const isServer = true;
(async () => {
  try {
    await typesense({ isServer }).collections(COLLECTION_NAME).retrieve();
    console.log(`Found existing collection of ${COLLECTION_NAME}`);

    if (process.env.FORCE_REINDEX !== 'true')
      return console.log('FORCE_REINDEX = false. Canceling operation...');

    console.log('FORCE_REINDEX = true. Deleting collection');
    await typesense({ isServer }).collections(COLLECTION_NAME).delete();

    console.log('Creating schema...');

    await typesense({ isServer })
      .collections()
      .create({
        name: COLLECTION_NAME,
        fields: [
          { name: 'restaurant_name', type: 'string' },
          { name: 'address', type: 'string' },
          { name: 'country', type: 'string', facet: true },
          { name: 'region', type: 'string', optional: true, facet: true },
          { name: 'province', type: 'string', facet: true, optional: true },
          { name: 'city', type: 'string', optional: true, facet: true },
          { name: 'location', type: 'geopoint' },
          { name: 'awards', type: 'string[]' },
          { name: 'top_tags', type: 'string[]' },
          { name: 'price_min', type: 'float' },
          { name: 'price_max', type: 'float' },
          { name: 'meals', type: 'string[]', facet: true },
          { name: 'cuisines', type: 'string[]', facet: true },
          { name: 'features', type: 'string[]', facet: true },
          { name: 'vegetarian_friendly', type: 'bool' },
          { name: 'gluten_free', type: 'bool' },
          { name: 'open_hours', type: 'object[]' },
          { name: 'open_days_per_week', type: 'int32' },
          { name: 'avg_rating', type: 'float' },
          { name: 'total_reviews_count', type: 'int32' },
          // specific rating score
          { name: 'food', type: 'float' },
          { name: 'service', type: 'float', optional: true },
          { name: 'value', type: 'float', optional: true },
          { name: 'atmosphere', type: 'float', optional: true },
        ],
        enable_nested_fields: true,
      });

    console.log('Indexing data');

    const dataset = await fs.readFile(
      resolve(resolve(), PATH_TO_DATASET),
      'utf-8'
    );

    const returnData = await typesense({ isServer })
      .collections(COLLECTION_NAME)
      .documents()
      .import(dataset);

    console.log('Return data: ', returnData);
  } catch (err) {
    console.error(err);
  }
})();
