import React from 'react'
import HotelCardItem from './HotelCardItem'

function Hotels({ trip }) {
  const hotels = trip?.tripData?.hotel_options 
    || trip?.tripData?.hotels 
    || trip?.tripData?.hotelOptions 
    || []

  // Extract city name for accurate image search
  const city = trip?.userSelection?.location?.label?.split(',')[0]?.trim() || ''

  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {hotels.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel} city={city} />
        ))}
      </div>
    </div>
  )
}

export default Hotels