const API_URL =
  'http://localhost:5000/api/reservations'


export const createReservation =
  async ({
    token,
    reservationData,
  }) => {

    const response = await fetch(
      API_URL,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify(
          reservationData
        ),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data.message ||
          'Unable to create reservation.'
      )
    }

    return data
  }


export const getMyReservations =
  async (token) => {

    const response = await fetch(
      `${API_URL}/my`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data.message ||
          'Unable to load reservations.'
      )
    }

    return data
  }