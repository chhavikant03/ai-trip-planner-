import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

function PlaceCardItem({ place, city }) {
  const [photoUrl, setPhotoUrl] = useState(null)

  const name = place?.place || place?.name || place?.place_name || 'Unknown Place'
  const details = place?.details || place?.description || place?.place_details || ''
  const ticket = place?.ticket_pricing || place?.ticket_price || place?.ticketPricing || 'N/A'
  const rating = place?.rating || ''

  useEffect(() => {
    fetchPhoto()
  }, [name])

  const fetchPhoto = async () => {
    try {
      // Search "India Gate New Delhi" for accurate landmark photos
      const query = city ? `${name} ${city}` : name
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=squarish&client_id=${UNSPLASH_KEY}`
      )
      const data = await res.json()
      if (data.results?.[0]?.urls?.small) {
        setPhotoUrl(data.results[0].urls.small)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(name + ' ' + city)} target='_blank'>
      <div className='shadow-sm border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 hover:shadow-md cursor-pointer transition-all'>
        <img
          src={photoUrl || 'https://placehold.co/130x130?text=' + encodeURIComponent(name)}
          alt={name}
          className='w-[130px] h-[130px] rounded-xl object-cover'
          onError={(e) => e.target.src = 'https://placehold.co/130x130?text=Place'}
        />
        <div>
          <h2 className='font-bold text-lg'>{name}</h2>
          <p className='text-sm text-gray-500'>{details}</p>
          <h2 className='text-xs font-medium mt-2 mb-2'>🏷️ Ticket: {ticket}</h2>
          {rating && <h2 className='text-xs font-medium'>⭐ Rating: {rating}</h2>}
        </div>
      </div>
    </Link>
  )
}

export default PlaceCardItem