import { NLSearchModelUpdateSchema } from 'typesense/lib/Typesense/NLSearchModel';
import { typesense } from '../src/lib/typesense';
import 'dotenv/config';

const GOOGLE_AI_STUDIO_API_KEY = process.env.GOOGLE_AI_STUDIO_API_KEY || '';
const MODEL_ID = 'gemini-model';

(async () => {
  try {
    const model = await typesense({ isServer: true })
      .nlSearchModels(MODEL_ID)
      .retrieve();

    if (model) {
      console.log(`Found existing model with id: ${MODEL_ID}`);

      const updatedConfig: NLSearchModelUpdateSchema = {
        temperature: 0.2,
        system_prompt: 'You are a helpful assistant.',
      };

      console.log('Updating model with this configuration:', updatedConfig);
      await typesense({ isServer: true })
        .nlSearchModels(MODEL_ID)
        .update(updatedConfig);
      return;
    }
  } catch (err) {
    console.log(
      `Model with id: ${MODEL_ID} not found. Creating a new model...`
    );
  }

  await typesense({ isServer: true }).nlSearchModels().create({
    id: MODEL_ID,
    model_name: 'google/gemini-2.5-flash',
    api_key: GOOGLE_AI_STUDIO_API_KEY,
    max_bytes: 16000,
    temperature: 0.0,
  });
})();
