import Typesense from 'typesense';

export const client = new Typesense.Client({
  apiKey: process.env.TYPESENSE_ADMIN_API_KEY || 'xyz',
  nodes: process.env.NEXT_PUBLIC_TYPESENSE_URLS
    ? process.env.NEXT_PUBLIC_TYPESENSE_URLS.split(',').map((url: string) => ({
        url,
      }))
    : [
        {
          url: 'http://localhost:8108',
        },
      ],

  nearestNode: process.env.PUBLIC_TYPESENSE_NEAREST_NODE_URL
    ? {
        url: process.env.PUBLIC_TYPESENSE_NEAREST_NODE_URL,
      }
    : undefined,
  connectionTimeoutSeconds: 60 * 60,
});
