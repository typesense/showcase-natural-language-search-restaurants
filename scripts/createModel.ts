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
        system_prompt: `Filtering Nested Arrays of Objects:
When filtering on fields inside nested array objects, you need to use a special syntax to ensure the filters are applied to the same object within the array. The syntax is: <nested_field_parent>.{<filter_conditions>}.
E.g: open_hours.{day:=Mon && close:>=11}

To search within a Radius use this syntax in the filter_by: geopoint:(lat, long, X km). You can also use miles "mi".
E.g: geopoint:(48.90615915923891, 2.3435897727061175, 2 mi)
The user's location will always be embedded in the query in case they want to find restaurant near them (always remove it from your query after processing): USER:lat,long
Use this user location for geosearch only if the query contains phrases like "near me".
An user might ask to find restaurant near a place, in that case, use your knowlegde about the geolocation of that place.
`,
      };

      console.log('Updating model with this configuration:', updatedConfig);
      await typesense({ isServer: true })
        .nlSearchModels(MODEL_ID)
        .update(updatedConfig);
    } else {
      console.log(
        `Model with id: ${MODEL_ID} not found. Creating a new model...`
      );
      await typesense({ isServer: true }).nlSearchModels().create({
        id: MODEL_ID,
        model_name: 'google/gemini-2.5-flash',
        api_key: GOOGLE_AI_STUDIO_API_KEY,
        max_bytes: 16000,
        temperature: 0.0,
      });
    }
  } catch (err) {
    console.log(err);
    return;
  }
  console.log('Success!');
})();
