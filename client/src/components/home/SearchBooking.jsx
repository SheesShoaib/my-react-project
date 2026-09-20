import {
  useState,
} from 'react'

import {
  checkRoomAvailability,
} from '../../services/roomService'

import RoomDetails from '../rooms/RoomDetails'


function SearchBooking() {
  const [formData, setFormData] =
    useState({
      checkIn: '',
      checkOut: '',
      guests: '1',
    })

  const [availableRooms, setAvailableRooms] =
    useState([])

  const [searched, setSearched] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const [selectedRoom, setSelectedRoom] =
    useState(null)


  const today =
    new Date()
      .toISOString()
      .split('T')[0]


  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setError('')
  }


  const handleSearch = async (
    event
  ) => {
    event.preventDefault()

    setError('')
    setSearched(false)
    setAvailableRooms([])

    const {
      checkIn,
      checkOut,
      guests,
    } = formData


    if (
      !checkIn ||
      !checkOut ||
      !guests
    ) {
      setError(
        'Please complete all booking fields.'
      )
      return
    }


    if (
      new Date(checkOut) <=
      new Date(checkIn)
    ) {
      setError(
        'Check-out must be after check-in.'
      )
      return
    }


    try {
      setLoading(true)

      const data =
        await checkRoomAvailability({
          checkIn,
          checkOut,
          guests,
        })

      setAvailableRooms(
        data.rooms
      )

      setSearched(true)

    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <section
      className="booking-search-user"
      id="booking"
    >
      <div className="container">

        <div className="booking-search-box-user">

          <div className="booking-search-heading-user">
            <span>
              RESERVATIONS
            </span>

            <h2>
              Find Your Perfect Stay
            </h2>
          </div>


          <form
            onSubmit={handleSearch}
          >
            <div className="row g-3 align-items-end">

              <div className="col-md-3">

                <label>
                  Check In
                </label>

                <input
                  type="date"
                  className="form-control"
                  name="checkIn"
                  min={today}
                  value={
                    formData.checkIn
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>


              <div className="col-md-3">

                <label>
                  Check Out
                </label>

                <input
                  type="date"
                  className="form-control"
                  name="checkOut"
                  min={
                    formData.checkIn ||
                    today
                  }
                  value={
                    formData.checkOut
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>


              <div className="col-md-3">

                <label>
                  Guests
                </label>

                <select
                  className="form-select"
                  name="guests"
                  value={
                    formData.guests
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option value="1">
                    1 Guest
                  </option>

                  <option value="2">
                    2 Guests
                  </option>

                  <option value="3">
                    3 Guests
                  </option>

                  <option value="4">
                    4 Guests
                  </option>
                </select>

              </div>


              <div className="col-md-3">

                <button
                  type="submit"
                  className="btn btn-luxury w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Checking...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-search me-2"></i>
                      Check Availability
                    </>
                  )}
                </button>

              </div>

            </div>
          </form>


          {error && (
            <div className="auth-alert-user mt-4">
              <i className="bi bi-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}

        </div>


        {searched && (
          <div className="availability-results-user">

            <div className="section-heading-user text-center">
              <span>
                SEARCH RESULTS
              </span>

              <h2>
                Available Rooms
              </h2>

              <p>
                {availableRooms.length}{' '}
                room
                {availableRooms.length !== 1
                  ? 's'
                  : ''}{' '}
                available for your
                selected dates.
              </p>
            </div>


            {availableRooms.length ===
            0 ? (

              <div className="guest-empty-user">
                <i className="bi bi-calendar2-x"></i>

                <h3>
                  No rooms available
                </h3>

                <p>
                  Try different dates or
                  reduce the number of
                  guests.
                </p>
              </div>

            ) : (

              <div className="row g-4">

                {availableRooms.map(
                  (room) => (

                    <div
                      className="col-lg-4"
                      key={room._id}
                    >

                      <article className="room-card-user h-100">

                        <div className="room-image-user">

                          <img
                            src={
                              room.image
                            }
                            alt={
                              room.name
                            }
                          />

                          <span className="room-type-user">
                            {room.type}
                          </span>

                        </div>


                        <div className="room-card-body-user">

                          <h3>
                            {room.name}
                          </h3>

                          <p>
                            Room{' '}
                            {room.roomNumber}
                          </p>

                          <div className="room-price-user mb-3">

                            <strong>
                              PKR{' '}
                              {room.price.toLocaleString()}
                            </strong>

                            <span>
                              {' '}
                              / night
                            </span>

                          </div>


                          <button
                            type="button"
                            className="btn btn-luxury w-100"
                            onClick={() =>
                              setSelectedRoom(
                                room
                              )
                            }
                          >
                            Select Room
                          </button>

                        </div>

                      </article>

                    </div>

                  )
                )}

              </div>

            )}

          </div>
        )}

      </div>


      {selectedRoom && (
        <RoomDetails
          room={selectedRoom}
          bookingData={
            formData
          }
          onClose={() =>
            setSelectedRoom(null)
          }
        />
      )}

    </section>
  )
}

export default SearchBooking