import { Badge } from './ui/badge';
import {
  capitalizeFirstLetter,
  TRANSMISSION_TYPE,
  USD_Formatter,
} from '@/utils/utils';
import { _Restaurant } from '@/lib/typesense';

export default function CardItem({ data }: { data: _Restaurant }) {
  return (
    <li className='border-2 border-gray-700 rounded-xl py-4 px-5 flex flex-col gap-2 justify-between'>
      <div>
        <div className='text-xs mb-0.5 flex items-center gap-1.5'>
          {data.country} <span className='text-[10px]'>|</span>
          {data.region}
        </div>
        <h2 className='font-bold text-xl'>
          {data.restaurant_name}
          <Badge className='text-[10px] font-light leading-tight ml-2 relative bottom-[3px]'>
            {data.awards}
          </Badge>
        </h2>
      </div>
      <div className='font-normal text-sm leading-relaxed'>
        <div>Fuel type: {data.country}</div>
        <div>Number of doors: {data.address}</div>
        <div>
          Market categories:{' '}
          {Array.isArray(data.awards) ? data.awards.join(', ') : 'N/A'}
        </div>
      </div>
      <div className='flex justify-between text-lg'>
        <div className='flex flex-col'>
          <span>{`${data.price_min}-${data.price_max}$`}</span>
          <span className='text-[10px] leading-tight'>Starting MSRP</span>
        </div>
        <div className='flex flex-col'>
          <span></span>
          <span className='text-[10px] leading-tight'>City/High MPG</span>
        </div>
      </div>
    </li>
  );
}
