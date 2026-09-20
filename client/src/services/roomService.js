const API_URL =
  'http://localhost:5000/api/rooms'


export const getRooms = async () => {
  const response = await fetch(API_URL)

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ||
        'Unable to load rooms.'
    )
  }

  return data
}


export const checkRoomAvailability =
  async ({
    checkIn,
    checkOut,
    guests,
  }) => {
    const params =
      new URLSearchParams({
        checkIn,
        checkOut,
        guests: String(guests),
      })

    const response = await fetch(
      `${API_URL}/availability?${params}`
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data.message ||
          'Unable to check availability.'
      )
    }

    return data
  }