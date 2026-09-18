import { useState } from 'react'
import rooms from '../../services/roomData'
import BookingForm from '../booking/BookingForm'

function SearchBooking() {

  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState('2')

  const [availableRooms, setAvailableRooms] = useState([])
  const [selectedRoom, setSelectedRoom] = useState(null)

  const [searched, setSearched] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = (event) => {
    event.preventDefault()

    setError('')
    setSelectedRoom(null)

    if (!checkIn || !checkOut) {
      setError(
        'Please select both check-in and check-out dates.'
      )
      return
    }

    const startDate = new Date(checkIn)
    const endDate = new Date(checkOut)

    if (endDate <= startDate) {
      setError(
        'Check-out date must be after check-in date.'
      )
      return
    }

    const guestCount = Number(guests)

    const filteredRooms = rooms.filter(
      (room) => room.guests >= guestCount
    )

    setAvailableRooms(filteredRooms)
    setSearched(true)
  }

  return (
    <>
      {/* =================================================
          BOOKING SEARCH
      ================================================= */}

      <section
        id="booking"
        className="booking-section-user"
      >

        <div className="container">

          <div className="booking-card-user">

            <div className="booking-heading-user">

              <span>
                PLAN YOUR STAY
              </span>

              <h2>
                Find Your Perfect Stay
              </h2>

            </div>

            <form onSubmit={handleSearch}>

              <div className="row g-3">

                {/* CHECK IN */}
                <div className="col-md-6 col-lg-3">

                  <label htmlFor="checkIn">
                    <i className="bi bi-calendar3 me-2"></i>
                    Check In
                  </label>

                  <input
                    id="checkIn"
                    type="date"
                    className="form-control"
                    value={checkIn}
                    onChange={(event) =>
                      setCheckIn(event.target.value)
                    }
                    min={
                      new Date()
                        .toISOString()
                        .split('T')[0]
                    }
                    required
                  />

                </div>

                {/* CHECK OUT */}
                <div className="col-md-6 col-lg-3">

                  <label htmlFor="checkOut">
                    <i className="bi bi-calendar3 me-2"></i>
                    Check Out
                  </label>

                  <input
                    id="checkOut"
                    type="date"
                    className="form-control"
                    value={checkOut}
                    onChange={(event) =>
                      setCheckOut(event.target.value)
                    }
                    min={checkIn || undefined}
                    required
                  />

                </div>

                {/* GUESTS */}
                <div className="col-md-6 col-lg-3">

                  <label htmlFor="guests">
                    <i className="bi bi-people me-2"></i>
                    Guests
                  </label>

                  <select
                    id="guests"
                    className="form-select"
                    value={guests}
                    onChange={(event) =>
                      setGuests(event.target.value)
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

                {/* SEARCH */}
                <div className="col-md-6 col-lg-3 d-flex align-items-end">

                  <button
                    type="submit"
                    className="btn btn-luxury w-100"
                  >
                    Check Availability
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>

                </div>

              </div>

            </form>

            {/* ERROR */}
            {error && (

              <div className="booking-error-user mt-3">

                <i className="bi bi-exclamation-circle me-2"></i>

                {error}

              </div>

            )}

          </div>

        </div>

      </section>


      {/* =================================================
          SEARCH RESULTS
      ================================================= */}

      {searched && (

        <section className="availability-results-user">

          <div className="container">

            <div className="section-heading-user text-center">

              <span>
                AVAILABLE ACCOMMODATION
              </span>

              <h2>
                Rooms Matching Your Search
              </h2>

              <p>
                Showing rooms suitable for {guests}{' '}
                {Number(guests) === 1
                  ? 'guest'
                  : 'guests'}.
              </p>

            </div>

            {availableRooms.length > 0 ? (

              <div className="row g-4">

                {availableRooms.map((room) => (

                  <div
                    className="col-md-6 col-xl-4"
                    key={room.id}
                  >

                    <article className="availability-card-user">

                      {/* IMAGE */}
                      <div className="availability-image-user">

                        <img
                          src={room.image}
                          alt={room.name}
                        />

                        <span>
                          Available
                        </span>

                      </div>

                      {/* CONTENT */}
                      <div className="availability-content-user">

                        <div className="d-flex justify-content-between gap-3">

                          <div>

                            <small>
                              {room.type}
                            </small>

                            <h3>
                              {room.name}
                            </h3>

                          </div>

                          <div className="availability-price-user">

                            <strong>
                              PKR {room.price.toLocaleString()}
                            </strong>

                            <span>
                              / night
                            </span>

                          </div>

                        </div>

                        <p>
                          {room.description}
                        </p>

                        <div className="availability-meta-user">

                          <span>
                            <i className="bi bi-people"></i>
                            {room.guests} Guests
                          </span>

                          <span>
                            <i className="bi bi-house"></i>
                            {room.size}
                          </span>

                        </div>

                        {/* SELECT ROOM */}
                        <button
                          type="button"
                          className="btn btn-luxury w-100 mt-3"
                          onClick={() =>
                            setSelectedRoom(room)
                          }
                        >
                          Select Room
                          <i className="bi bi-arrow-right ms-2"></i>
                        </button>

                      </div>

                    </article>

                  </div>

                ))}

              </div>

            ) : (

              <div className="no-rooms-user text-center">

                <i className="bi bi-building-x"></i>

                <h3>
                  No rooms available
                </h3>

                <p>
                  No room currently matches
                  the selected guest capacity.
                </p>

              </div>

            )}

          </div>

        </section>

      )}


      {/* =================================================
          BOOKING FORM
      ================================================= */}

      <BookingForm
        room={selectedRoom}
        checkIn={checkIn}
        checkOut={checkOut}
        guests={guests}
        onClose={() => setSelectedRoom(null)}
      />

    </>
  )
}

export default SearchBooking