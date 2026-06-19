import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

function HotelCardItem({ hotel, city }) {
  const [photoUrl, setPhotoUrl] = useState(null)

  const name = hotel?.name || hotel?.hotel_name || 'Unknown Hotel'
  const address = hotel?.address || hotel?.hotel_address || ''
  const price = hotel?.price || hotel?.price_per_night || ''
  const rating = hotel?.rating || ''
  const description = hotel?.description || ''

  useEffect(() => {
    fetchPhoto()
  }, [name])

  const fetchPhoto = async () => {
    try {
      // Search city + hotel for best results
      const query = city ? `${city} hotel` : 'luxury hotel'
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape&client_id=${UNSPLASH_KEY}`
      )
      const data = await res.json()
      if (data.results?.length > 0) {
        // Pick a random one from top 5 so hotels don't all look the same
        const random = Math.floor(Math.random() * data.results.length)
        setPhotoUrl(data.results[random].urls.small)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(name + ' ' + address)} target='_blank'>
      <div className='hover:scale-110 transition-all cursor-pointer mt-5 mb-8'>
        <img
          src={photoUrl || 'https://placehold.co/400x180?text=' + encodeURIComponent(name)}
          alt={name}
          className='rounded-xl h-[180px] w-full object-cover'
          onError={(e) => e.target.src = 'https://placehold.co/400x180?text=Hotel'}
        />
        <div className='my-2'>
          <h2 className='font-medium'>{name}</h2>
          <h2 className='text-xs text-gray-500'>📍 {address}</h2>
          <h2 className='text-sm'>💰 {price}</h2>
          <h2 className='text-sm'>⭐ {rating}</h2>
          {description && <p className='text-xs text-gray-500 mt-1'>{description}</p>}
        </div>
      </div>
    </Link>
  )
}

export default HotelCardItem