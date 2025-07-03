export const USD_Formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const TRANSMISSION_TYPE = {
  MANUAL: 'Manual',
  AUTOMATIC: 'Automatic',
  AUTOMATED_MANUAL: 'Automated manual',
  DIRECT_DRIVE: 'Direct drive',
  UNKNOWN: 'Unknown',
};

export const EXAMPLE_SEARCH_TERMS = [
  'Best pizza in Italy',
  'Restaurant with 5 stars food and service rating',
  '5€ quick lunch in Paris',
  'Free wifi and wheelchair accessible',
  'Good restaurants in Berlin',
  'I am vegan',
  'I like spicy food',
  'Restaurants open 5 am to 11 pm',
  'Restaurants good for kids',
];

export const TYPESENSE_CONFIG = {
  per_page: 12,
  query_by: 'restaurant_name,address',
};

export function booleanToYesNo(bool: boolean | null | undefined) {
  return bool ? 'Yes' : 'No';
}
