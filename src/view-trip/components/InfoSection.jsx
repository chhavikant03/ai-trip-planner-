import React, { useEffect, useState } from 'react'

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(null)

  const location = trip?.userSelection?.location?.label || 'Your Trip'
  const noOfDays = trip?.userSelection?.noOfDays
  const budget = trip?.userSelection?.budget
  const traveler = trip?.userSelection?.traveler
  const city = location.split(',')[0].trim()

  useEffect(() => {
    if (city) fetchPhoto(city)
  }, [city])

  const fetchPhoto = async (query) => {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + ' travel city')}&per_page=1&orientation=landscape&client_id=${UNSPLASH_KEY}`
      )
      const data = await res.json()
      if (data.results?.[0]?.urls?.regular) {
        setPhotoUrl(data.results[0].urls.regular)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <img
        src={photoUrl || 'https://placehold.co/1200x340?text=' + encodeURIComponent(location)}
        alt={location}
        className='h-[340px] w-full object-cover rounded-xl'
        onError={(e) => e.target.src = 'https://placehold.co/1200x340?text=' + encodeURIComponent(location)}
      />
      <div>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{location}</h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              📅 {noOfDays} Day
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              💰 {budget} Budget
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              👥 No. of traveler/s: {traveler}
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoSection