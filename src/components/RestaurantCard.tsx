import React, { useState } from 'react';
import {
  Clock,
  MapPin,
  Star,
  Award,
  Euro,
  Leaf,
  Wheat,
  HelpCircle,
  SquareArrowOutUpRight,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { _Restaurant } from '@/lib/typesense';
import LocalTimeTooltip from './LocalTimeTooltip';

const RestaurantCard = ({
  restaurantData,
}: {
  restaurantData: _Restaurant;
}) => {
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isAwardsOpen, setIsAwardsOpen] = useState(false);

  // Convert decimal hours to time string (e.g., 12.5 -> "12:30")
  const formatTime = (decimalHour: number) => {
    const hours = Math.floor(decimalHour);
    const minutes = Math.round((decimalHour - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  };

  // Group hours by day
  const groupedHours = restaurantData.open_hours.reduce((acc, hour) => {
    if (!acc[hour.day]) {
      acc[hour.day] = [];
    }
    acc[hour.day].push({ open: hour.open, close: hour.close });
    return acc;
  }, {});

  // Define day order and full names
  const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayNames = {
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Friday',
    Sat: 'Saturday',
    Sun: 'Sunday',
  };

  // Render star rating
  const renderStars = (rating: number | null) => {
    if (!rating && rating !== 0) {
      return <span className='text-gray-500 text-xs'>No rating</span>;
    }
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className='w-3 h-3 fill-yellow-400 text-yellow-400' />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key='half'
          className='w-3 h-3 fill-yellow-400 text-yellow-400 opacity-50'
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className='w-3 h-3 text-gray-300' />);
    }

    return stars;
  };

  // Get percentage for review breakdown
  const getReviewPercentage = (value) => {
    if (restaurantData.total_reviews_count === 0) return 0;
    return Math.round((value / restaurantData.total_reviews_count) * 100);
  };
  // Check if restaurant is currently open (in restaurant's timezone)
  const isCurrentlyOpen = () => {
    // Get current time in restaurant's timezone (France = Europe/Paris)
    const now = new Date();
    const restaurantTime = new Date(
      now.toLocaleString('en-US', { timeZone: 'Europe/Paris' })
    );
    const currentDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
      restaurantTime.getDay()
    ];
    const currentTime =
      restaurantTime.getHours() + restaurantTime.getMinutes() / 60;

    if (groupedHours[currentDay]) {
      return groupedHours[currentDay].some(
        (slot) => currentTime >= slot.open && currentTime <= slot.close
      );
    }
    return false;
  };

  return (
    <div className='w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col justify-between'>
      <div>
        {/* Header */}
        <div className='bg-white p-6 border-b border-gray-200'>
          <div className='flex flex-col items-start gap-3'>
            <div className='flex-1 flex gap-4 items-center'>
              <img
                src={`/countries/${restaurantData.country}.svg`}
                alt={`${restaurantData.country} flag`}
                className='w-8 h-6 rounded-[2px] shadow-sm'
              />
              <h2 className='text-2xl font-bold text-gray-800'>
                {restaurantData.restaurant_name}
                <a
                  target='_blank'
                  href={`https://www.tripadvisor.com/Restaurant_Review-${restaurantData.restaurant_link}`}
                  className='text-gray-400 hover:text-gray-600 transition-colors ml-2 inline-block'
                >
                  <SquareArrowOutUpRight className='w-4 h-4' />
                </a>
              </h2>
            </div>
            <p className='text-gray-600 font-medium'>
              {restaurantData.top_tags.join(' • ')}
            </p>
          </div>
          {/* Rating and Reviews */}
          <div className='flex items-center gap-4 mt-3'>
            <Popover open={isReviewsOpen} onOpenChange={setIsReviewsOpen}>
              <PopoverTrigger asChild>
                <button className='flex items-center gap-1 hover:bg-gray-100 p-1 rounded-lg transition-colors'>
                  <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                  <span className='font-semibold text-gray-800'>
                    {restaurantData.avg_rating}
                  </span>
                  <span className='text-gray-500 text-sm'>
                    ({restaurantData.total_reviews_count} reviews)
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className='w-80'>
                <div className='space-y-4'>
                  <h4 className='font-medium text-gray-900'>
                    Review Breakdown
                  </h4>
                  {/* Overall ratings */}
                  <div className='space-y-2'>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm text-gray-600'>Food</span>
                      <div className='flex items-center gap-1'>
                        <div className='flex'>
                          {renderStars(restaurantData.food)}
                        </div>
                        <span className='text-sm font-medium text-gray-700'>
                          {restaurantData.food}
                        </span>
                      </div>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm text-gray-600'>Service</span>
                      <div className='flex items-center gap-1'>
                        <div className='flex'>
                          {renderStars(restaurantData.service)}
                        </div>
                        <span className='text-sm font-medium text-gray-700'>
                          {restaurantData.service}
                        </span>
                      </div>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm text-gray-600'>Value</span>
                      <div className='flex items-center gap-1'>
                        <div className='flex'>
                          {renderStars(restaurantData.value)}
                        </div>
                        <span className='text-sm font-medium text-gray-700'>
                          {restaurantData.value}
                        </span>
                      </div>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm text-gray-600'>Atmosphere</span>
                      <div className='flex items-center gap-1'>
                        <div className='flex'>
                          {renderStars(restaurantData.atmosphere)}
                        </div>
                        <span className='text-sm font-medium text-gray-700'>
                          {restaurantData.atmosphere}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='border-t pt-3'>
                    <h5 className='font-medium text-gray-900 mb-2'>
                      Rating Distribution
                    </h5>
                    <div className='space-y-1'>
                      {[
                        { label: 'Excellent', value: restaurantData.excellent },
                        { label: 'Very Good', value: restaurantData.very_good },
                        { label: 'Average', value: restaurantData.average },
                        { label: 'Poor', value: restaurantData.poor },
                        { label: 'Terrible', value: restaurantData.terrible },
                      ].map((rating) => (
                        <div
                          key={rating.label}
                          className='flex items-center gap-2'
                        >
                          <span className='text-xs text-gray-500 w-16'>
                            {rating.label}
                          </span>
                          <div className='flex-1 bg-gray-200 rounded-full h-2'>
                            <div
                              className='bg-yellow-400 h-2 rounded-full'
                              style={{
                                width: `${getReviewPercentage(rating.value)}%`,
                              }}
                            ></div>
                          </div>
                          <span className='text-xs text-gray-600 w-8'>
                            {getReviewPercentage(rating.value)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <div className='flex items-center gap-1 text-gray-600'>
              <Euro className='w-4 h-4' />
              <span className='text-sm'>
                {restaurantData.price_min}-{restaurantData.price_max}
              </span>
            </div>
          </div>
          {/* Status and Badges */}
          <div className='flex items-center gap-2 mt-3 flex-wrap'>
            <div
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                isCurrentlyOpen()
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full mr-1 ${
                  isCurrentlyOpen() ? 'bg-green-500' : 'bg-gray-400'
                }`}
              ></div>
              {isCurrentlyOpen() ? 'Open Now' : 'Closed'}
            </div>
            {restaurantData.awards.includes("Travellers' Choice") && (
              <div className='inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium'>
                <Award className='w-3 h-3 mr-1' />
                Travellers' Choice
              </div>
            )}
            {restaurantData.vegetarian_friendly && (
              <div className='inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium'>
                <Leaf className='w-3 h-3 mr-1' />
                Vegan Friendly
              </div>
            )}
            {restaurantData.gluten_free && (
              <div className='inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium'>
                <Wheat className='w-3 h-3 mr-1' />
                Gluten Free
              </div>
            )}
          </div>
        </div>
        {/* Contact Info */}
        <div className='p-4 border-b border-gray-200'>
          <div className='flex items-center gap-2 text-gray-600 mb-2'>
            <MapPin className='w-4 h-4' />
            <span className='text-sm font-normal'>
              {restaurantData.address}
            </span>
          </div>
          <div className='text-sm text-gray-600 mb-2'>
            {restaurantData.popularity_detailed}
          </div>
          <div className='flex flex-wrap gap-1 mt-2'>
            {restaurantData.cuisines.map((cuisine, index) => (
              <span
                key={index}
                className='inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs'
              >
                {cuisine}
              </span>
            ))}
          </div>
          {/* Meals */}
          <div className='mt-3'>
            <div className='text-sm text-gray-600 mb-1'>Meals served:</div>
            <div className='flex flex-wrap gap-1'>
              {restaurantData.meals.map((meal, index) => (
                <span
                  key={index}
                  className='inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium'
                >
                  {meal}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          {restaurantData.features && restaurantData.features.length > 0 && (
            <div className='mt-3'>
              <div className='text-sm text-gray-600 mb-1'>Features:</div>
              <div className='flex flex-wrap gap-1'>
                {restaurantData.features.map((feature, index) => (
                  <span
                    key={index}
                    className='inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium'
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Opening Hours */}
        <div className='p-4'>
          <div className='flex items-center gap-2 mb-3'>
            <Clock className='w-5 h-5 text-gray-600' />
            <h3 className='text-lg font-semibold text-gray-800'>
              Opening Hours
            </h3>
            <LocalTimeTooltip />
          </div>
          <div className='space-y-2 font-normal'>
            {dayOrder.map((day) => (
              <div key={day} className='flex justify-between items-center py-1'>
                <span
                  className={`${
                    groupedHours[day] ? 'text-gray-800' : 'text-gray-400'
                  }`}
                >
                  {dayNames[day]}
                </span>
                <div className='text-right'>
                  {groupedHours[day] ? (
                    <div className='space-y-1'>
                      {groupedHours[day].map((slot, index) => (
                        <div key={index} className='text-sm text-gray-600'>
                          {formatTime(slot.open)} - {formatTime(slot.close)}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className='text-sm text-gray-400'>Closed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='bg-gray-50 px-4 py-3'>
        <div className='flex items-center justify-between text-xs text-gray-500'>
          <span>Hours may vary on holidays</span>
          <span>
            €{restaurantData.price_min}-{restaurantData.price_max} per person
          </span>
        </div>
        {restaurantData.awards.length > 1 && (
          <div className='mt-2 text-xs'>
            <Popover open={isAwardsOpen} onOpenChange={setIsAwardsOpen}>
              <PopoverTrigger asChild>
                <button className='text-blue-600 hover:text-blue-800 hover:underline transition-colors'>
                  {
                    restaurantData.awards.filter((award) =>
                      award.includes('Certificate')
                    ).length
                  }{' '}
                  Certificate
                  {restaurantData.awards.filter((award) =>
                    award.includes('Certificate')
                  ).length !== 1
                    ? 's'
                    : ''}{' '}
                  of Excellence
                </button>
              </PopoverTrigger>
              <PopoverContent className='w-80'>
                <div className='space-y-3'>
                  <h4 className='font-medium text-gray-900 flex items-center gap-2'>
                    <Award className='w-4 h-4 text-orange-500' />
                    Awards & Recognition
                  </h4>

                  <div className='space-y-2'>
                    {restaurantData.awards.map((award, index) => (
                      <div
                        key={index}
                        className='flex items-center gap-2 p-2 bg-gray-50 rounded-lg'
                      >
                        <Award className='w-4 h-4 text-orange-500 flex-shrink-0' />
                        <span className='text-sm text-gray-700'>{award}</span>
                      </div>
                    ))}
                  </div>

                  <div className='border-t pt-3'>
                    <p className='text-xs text-gray-500'>
                      These awards recognize excellence in dining experience,
                      service quality, and customer satisfaction.
                    </p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;
