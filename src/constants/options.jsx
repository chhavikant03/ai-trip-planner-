export const SelectTravelList = [
    {
        id:1,
        title: 'Just Me',
        desc: 'Solo Traveler',
        icon: '✈️',
        people:'1 person'
    },
    {
        id:2,
        title: 'A Couple',
        desc: 'Two traveles in tandem',
        icon: '🥂',
        people:'2 people'
    },
    {
        id:3,
        title: 'Family',
        desc: 'A group of fun loving adventure',
        icon: '🏡',
        people:'3 to 5 People'
    },
    {
        id:4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekes',
        icon: '⛵',
        people:'5 to 10 people'
    }
]

export const SelectBudgetOptions = [
    {
        id:1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵',
    },
    {
        id:2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰',
    },
    {
        id:3,
        title: 'Luxury',
        desc: 'Dont worry about cost',
        icon: '💸',
    }
]

export const AI_PROMPT = 'Generate a travel plan for {location}, {totalDays} days, {traveler}, {budget} budget. Return JSON with: hotels array (name, address, price_per_night as a number in Indian Rupees like "₹5000", rating as number, description, geo_coordinates) and itinerary array (day as number, places array with name, details, ticket_price as string in Indian Rupees like "₹500 per person", rating as number, best_time_to_visit, geo_coordinates).'