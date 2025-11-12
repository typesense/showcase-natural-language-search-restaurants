<h1>
 🔥 🤖 🍖 Natural Language Search Restaurants powered by Typesense
</h1>
This demo restaurant search showcases the new Natural Language Search feature powered by Typesense. This allows users to search for restaurants using everyday language.
<br>
<br>
Instead of needing to use specific keywords or precise filters, you can simply type a free-form sentence into the search bar. Typesense then uses Large Language Models (LLMs) to understand your intent, automatically translating your natural language query into structured search parameters like filters, sort orders, and relevant keywords.
<br>
<br>
This means you can find exactly what you're looking for with ease and flexibility, even if your exact keywords aren't in the restaurant's description. Experience a more intuitive and powerful way to discover your next dining destination!
<br>
<br>
This demo uses the dataset "TripAdvisor European restaurants" which is available on <a href="https://www.kaggle.com/datasets/stefanoleone992/tripadvisor-european-restaurants" target="_blank">Kaggle</a>.

## Tech Stack

- <a href="https://github.com/typesense/typesense" target="_blank">Typesense</a>
- <a href="https://deepmind.google/technologies/gemini/" target="_blank">Google Gemini</a>
- NextJS
- Typescript
- Tailwind
- React Query

## Project Structure

```bash
├── scripts/
│   ├── data/
│   │   └── restaurants.jsonl
│   ├── indexTypesense.ts # script that create a collection and index data from restaurants.json into typesense server
│   └── createModel.ts # create a Typesense natural language search model, update system_prompt if model already exists
└── src/
    ├── app/
    │   └── page.tsx # main application
    ├── components/
    │   └── UI components...
    ├── hooks/
    │   └── getUserLocation.ts # provide the user location for the LLM to perform geosearch
    └── lib/
        ├── actions.ts # the search function used for pagination
        └── typesense.ts # typesense config
```

You can view the specific LLM instructions for this project in [createModel.ts](/scripts/createModel.ts)

## Development

To run this project locally, make sure you have docker and nodejs, clone this project, install dependencies and start the dev server:

Start typesense server

```shell
npm run start:typesense # or: docker compose up
```

Index data into typesense

```shell
npm run index:typesense
```

Create a natural language search model, this script is also used to update the model's `system_prompt`.

```shell
npm run createModel:typesense
```

Start the dev server

```shell
npm run dev
```

Open http://localhost:3000 to see the app ✌️

## Deployment

See [.env.example](.env.example) for environment variables.
