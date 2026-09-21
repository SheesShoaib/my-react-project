import {
  useState,
} from 'react'

import {
  checkRoomAvailability,
} from '../../services/roomService'

import RoomDetails
  from '../rooms/RoomDetails'

function SearchBooking() {
  const [formData, setFormData] =
    useState({
      checkIn: '',
      checkOut: '',
      guests: '1',
    })

  const [
    availableRooms,
    setAvailableRooms,
  ] = useState([])

  const [
    selectedRoom,
    setSelectedRoom,
  ] = useState(null)

  const [searched, setSearched] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const today =
    new Date()
      .toISOString()
      .split('T')[0]

  const handleChange = (event) => {
    const { name, value } =
      event.target

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

    const {
      checkIn,
      checkOut,
      guests,
    } = formData

    if (!checkIn || !checkOut) {
      setError(
        'Please select your check-in and check-out dates.'
      )
      return
    }

    if (
      new Date(checkOut) <=
      new Date(checkIn)
    ) {
      setError(
        'Check-out date must be after check-in date.'
      )
      return
    }

    try {
      setLoading(true)
      setError('')
      setSearched(false)

      const data =
        await checkRoomAvailability({
          checkIn,
          checkOut,
          guests,
        })

      setAvailableRooms(
        Array.isArray(data.rooms)
          ? data.rooms
          : []
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
      className="availability-section-user"
      id="booking"
    >
      <div className="container">
        <div className="availability-search-panel-user">
          <div className="availability-search-intro-user">
            <span>
              RESERVE YOUR STAY
            </span>

            <h2>
              Find Your Perfect Room
            </h2>

            <p>
              Discover rooms available
              for your selected dates.
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="availability-search-form-user"
          >
            <div className="availability-search-field-user">
              <label>
                CHECK IN
              </label>

              <div>
                <i className="bi bi-calendar3"></i>

                <input
                  type="date"
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
            </div>

            <div className="availability-search-field-user">
              <label>
                CHECK OUT
              </label>

              <div>
                <i className="bi bi-calendar3"></i>

                <input
                  type="date"
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
            </div>

            <div className="availability-search-field-user">
              <label>
                GUESTS
              </label>

              <div>
                <i className="bi bi-people"></i>

                <select
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
            </div>

            <button
              type="submit"
              className="availability-search-button-user"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm"></span>
                  Checking
                </>
              ) : (
                <>
                  Check Availability
                  <i className="bi bi-arrow-right"></i>
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="availability-error-user">
              <i className="bi bi-exclamation-circle"></i>
              {error}
            </div>
          )}
        </div>

        {searched && (
          <div className="availability-results-user">
            <header className="availability-results-header-user">
              <div>
                <span>
                  AVAILABLE ROOMS
                </span>

                <h2>
                  Choose Your Stay
                </h2>
              </div>

              <div className="availability-result-count-user">
                <strong>
                  {
                    availableRooms.length
                  }
                </strong>

                <span>
                  {availableRooms.length ===
                  1
                    ? 'ROOM FOUND'
                    : 'ROOMS FOUND'}
                </span>
              </div>
            </header>

            {availableRooms.length ===
            0 ? (
              <div className="availability-empty-user">
                <div>
                  <i className="bi bi-calendar2-x"></i>
                </div>

                <h3>
                  No rooms available
                </h3>

                <p>
                  Try different dates or
                  reduce your number of
                  guests.
                </p>
              </div>
            ) : (
              <div className="row g-4">
                {availableRooms.map(
                  (room) => (
                    <div
                      className="col-xl-4 col-md-6"
                      key={room._id}
                    >
                      <article className="available-room-card-user">
                        <div className="available-room-media-user">
                          <img
                            src={
                              room.image
                            }
                            alt={
                              room.name
                            }
                          />

                          <div className="available-room-overlay-user"></div>

                          <span className="available-room-type-user">
                            {room.type}
                          </span>

                          <span className="available-room-status-user">
                            <i className="bi bi-circle-fill"></i>
                            Available
                          </span>
                        </div>

                        <div className="available-room-content-user">
                          <div className="available-room-top-user">
                            <span>
                              ROOM{' '}
                              {
                                room.roomNumber
                              }
                            </span>

                            <div>
                              <strong>
                                PKR{' '}
                                {Number(
                                  room.price
                                ).toLocaleString()}
                              </strong>

                              <small>
                                / night
                              </small>
                            </div>
                          </div>

                          <h3>
                            {room.name}
                          </h3>

                          <p>
                            {
                              room.description
                            }
                          </p>

                          <div className="available-room-meta-user">
                            <div>
                              <i className="bi bi-people"></i>

                              <span>
                                {
                                  room.capacity
                                }{' '}
                                Guests
                              </span>
                            </div>

                            <div>
                              <i className="bi bi-moon"></i>

                              <span>
                                {room.beds}
                              </span>
                            </div>

                            {room.size && (
                              <div>
                                <i className="bi bi-arrows-fullscreen"></i>

                                <span>
                                  {
                                    room.size
                                  }
                                </span>
                              </div>
                            )}
                          </div>

                          <button
                            type="button"
                            className="available-room-button-user"
                            onClick={() =>
                              setSelectedRoom(
                                room
                              )
                            }
                          >
                            View & Book
                            <i className="bi bi-arrow-up-right"></i>
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
          bookingData={formData}
          onClose={() =>
            setSelectedRoom(null)
          }
        />
      )}
    </section>
  )
}

export default SearchBooking