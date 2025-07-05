import Typesense from 'typesense';
import 'dotenv/config';
import fs from 'fs/promises';
import { resolve } from 'path';

const COLLECTION_NAME =
  process.env.NEXT_PUBLIC_TYPESENSE_COLLECTION_NAME || 'restaurant';
const PATH_TO_DATASET = './scripts/data/restaurants.jsonl';

(async () => {
  console.log('Connecting to typesense server...');

  const typesense = new Typesense.Client({
    apiKey: process.env.TYPESENSE_ADMIN_API_KEY || 'xyz',
    nodes: [
      {
        url: process.env.NEXT_PUBLIC_TYPESENSE_URL || 'http://localhost:8108',
      },
    ],
    connectionTimeoutSeconds: 60 * 60,
  });

  try {
    await typesense.collections(COLLECTION_NAME).retrieve();
    console.log(`Found existing collection of ${COLLECTION_NAME}`);

    if (process.env.FORCE_REINDEX !== 'true')
      return console.log('FORCE_REINDEX = false. Canceling operation...');

    console.log('Deleting collection');
    await typesense.collections(COLLECTION_NAME).delete();
  } catch (err) {
    console.error(err);
  }

  console.log('Creating schema...');

  await typesense.collections().create({
    name: COLLECTION_NAME,
    fields: [
      { name: 'restaurant_name', type: 'string' },
      { name: 'address', type: 'string' },
      { name: 'country', type: 'string', facet: true },
      { name: 'region', type: 'string', optional: true, facet: true },
      { name: 'province', type: 'string', facet: true, optional: true },
      { name: 'city', type: 'string', optional: true, facet: true },
      { name: 'geopoint', type: 'geopoint' },
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

  try {
    const returnData = await typesense
      .collections(COLLECTION_NAME)
      .documents()
      .import(dataset);

    console.log('Return data: ', returnData);
  } catch (error) {
    console.log(error);
  }
})();
