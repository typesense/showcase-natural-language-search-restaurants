import { z } from 'zod';

const envSchema = z.object({
  TYPESENSE_COLLECTION_NAME: z.string(),
  NL_MODEL_ID: z.string(),
});

export const clientEnv = envSchema.parse({
  TYPESENSE_COLLECTION_NAME: process.env.NEXT_PUBLIC_TYPESENSE_COLLECTION_NAME,
  NL_MODEL_ID: process.env.NEXT_PUBLIC_TYPESENSE_NL_MODEL_ID,
});
