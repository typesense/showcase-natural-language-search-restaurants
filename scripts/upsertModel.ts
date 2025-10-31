import 'dotenv/config';
import { client } from './typesense-client';
import { ObjectNotFound, TypesenseError } from 'typesense/lib/Typesense/Errors';
import { NLSearchModelBase } from 'typesense/lib/Typesense/NLSearchModels';

const GOOGLE_AI_STUDIO_API_KEY = process.env.GOOGLE_AI_STUDIO_API_KEY || '';
const MODEL_ID =
  process.env.NEXT_PUBLIC_TYPESENSE_NL_MODEL_ID || 'gemini_restaurant';

(async () => {
  let model;
  try {
    model = await client.nlSearchModels(MODEL_ID).retrieve();
  } catch (err) {
    if (err instanceof TypesenseError && err instanceof ObjectNotFound) {
      console.log(err.message);
    }
  }

  try {
    if (model) {
      console.log(`Found existing model with id: ${MODEL_ID}`);

      const updatedConfig: NLSearchModelBase = {
        model_name: 'google/gemini-2.5-flash-lite',
        temperature: 0.2,
        system_prompt: `Filtering Nested Arrays of Objects:
When filtering on fields inside nested array objects, you need to use a special syntax to ensure the filters are applied to the same object within the array. The syntax is: <nested_field_parent>.{<filter_conditions>}.
E.g: open_hours.{day:=Mon && close:>=11}

Only include keywords from the user query that could be part of a restaurant name or address in the \`q\` parameter.

price_min and price_max represent the restaurant's general price range for a meal or dish:
- price_min -> the lowest typical price the restaurant offers (e.g., cheapest dish or small portion).
- price_max -> the highest typical price the restaurant offers (e.g., premium dish or full meal).

When comparing with an user's budget, treat this as a range:
A restaurant matches if its price_min <= user_budget <= price_max.
This means the restaurant offers options within or below the user's budget.

To search within a Radius use this syntax in the filter_by: location:(lat, long, X km). You can also use miles "mi".
E.g: location:(48.9, 2.34, 2 mi)
The user's location will be embedded in the query in case they want to find restaurant near them (always remove it from your query after processing), in this format: USER:lat,long
Use this user location for geosearch only if the query contains phrases like "near me".
An user might ask to find restaurant near a place, in that case, use your knowlegde about the geolocation of that place.

You must use three-letter weekday abbreviation (Mon, Tue,...) to filter on the day field of "open_hours".`,
      };

      console.log('Updating model with this configuration:', updatedConfig);
      await client.nlSearchModels(MODEL_ID).update(updatedConfig);
    } else {
      console.log(
        `Model with id: ${MODEL_ID} not found. Creating a new model...`
      );
      await client.nlSearchModels().create({
        id: MODEL_ID,
        model_name: 'google/gemini-2.5-flash-lite',
        api_key: GOOGLE_AI_STUDIO_API_KEY,
        max_bytes: 16000,
        temperature: 0.0,
      });
    }

    console.log('Success!');
  } catch (err) {
    console.log(err);
    return;
  }
})();
