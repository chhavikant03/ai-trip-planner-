import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {

  const itinerary = trip.tripData?.itinerary
  // Extract city name to pass to each card for accurate image search
  const city = trip?.userSelection?.location?.label?.split(',')[0]?.trim() || ''

  return (
    <div>
      <h2 className='font-bold text-xl'>Places to Visit</h2>
      <div>
        {itinerary?.map((item, index) => {

          const places = item.plan 
            || item.places 
            || item.activities 
            || item.locations
            || [];

          const dayLabel = item.day 
            || item.day_number 
            || `Day ${index + 1}`;

          return (
            <div key={index} className='mt-5'>
              <h2 className='font-bold text-lg'>{dayLabel}</h2>
              <div className='grid md:grid-cols-2 gap-5'>
                {Array.isArray(places) && places.map((place, i) => (
                  <div key={i} className='my-2'>
                    <h2 className='font-medium text-sm text-orange-600'>
                      {place.time || place.best_time_to_visit || place.time_to_visit || ''}
                    </h2>
                    <PlaceCardItem place={place} city={city} />
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PlacesToVisit