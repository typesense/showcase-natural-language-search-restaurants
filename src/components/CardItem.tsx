import { Badge } from './ui/badge';
import {
  capitalizeFirstLetter,
  TRANSMISSION_TYPE,
  USD_Formatter,
} from '@/utils/utils';
import { _Restaurant } from '@/lib/typesense';
import { MapPin } from 'lucide-react';

export default function CardItem({ data }: { data: _Restaurant }) {
  return (
    <li className='border-2 border-gray-700 rounded-xl py-4 px-5 flex flex-col gap-2 justify-between'>
      <div>
        <div className='text-xs mb-2 flex items-center gap-1.5'>
          <img
            src={`/countries/${data.country}.svg`}
            alt={data.country}
            width={32}
            className='rounded-sm'
          />
          {data.country} <span className='text-[10px]'>•</span>
          {data.region} <span className='text-[10px]'>•</span>
          {data.city}
        </div>
        <div className='flex gap-2 items-baseline'>
          <h2 className='font-bold text-xl'>{data.restaurant_name}</h2>
          <div className='flex gap-1'>
            {data.vegetarian_friendly ? (
              <Badge className='text-[10px] font-light leading-tight relative bottom-[3px] bg-green-800'>
                Vegan friendly
              </Badge>
            ) : null}
            {data.gluten_free ? (
              <Badge className='text-[10px] font-light leading-tight relative bottom-[3px] bg-yellow-800'>
                Gluten free
              </Badge>
            ) : null}
          </div>
        </div>
        <div className='font-extralight text-xs mt-1 min-h-3'>
          {data.popularity_detailed}
        </div>
      </div>
      <div className='font-normal text-sm leading-relaxed'>
        <div className='flex items-center gap-1'>
          <MapPin strokeWidth={1.5} size={20} />
          {data.address}
        </div>
        <div className='mt-3 flex items-baseline gap-1'>
          <span>Top tags:</span>
          {data.top_tags.map((tag, index) => (
            <Badge
              variant='outline'
              className='text-[10px] font-light leading-tight relative bottom-[3px]'
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div>Meals: {data.meals.join(', ')}</div>
        <div>Cuisines: {data.cuisines.join(', ')}</div>
        <div>Features: {data.features.join(', ')}</div>
      </div>

      <div className='flex justify-between text-lg'>
        <div className='flex flex-col'>
          <span>{`${data.price_min}€ - ${data.price_max}€`}</span>
          <span className='text-[10px] leading-tight'>Price range</span>
        </div>
        <div className='flex flex-col'>
          <span></span>
          <span className='text-[10px] leading-tight'>City/High MPG</span>
        </div>
      </div>
    </li>
  );
}
