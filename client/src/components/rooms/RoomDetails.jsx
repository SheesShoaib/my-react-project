import BookingForm from '../booking/BookingForm'


function RoomDetails({
  room,
  bookingData = null,
  onClose,
}) {

  if (!room) {
    return null
  }


  const handleBackdropClick = (event) => {

    if (
      event.target ===
      event.currentTarget
    ) {
      onClose()
    }
  }


  const handleCheckAvailability = () => {

    onClose()

    setTimeout(() => {

      const bookingSection =
        document.getElementById(
          'booking'
        )

      if (bookingSection) {

        bookingSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })

      }

    }, 100)
  }


  return (
    <div
      className="room-modal-backdrop-user"
      onClick={handleBackdropClick}
    >

      <div className="room-modal-user">

        {/* =========================
            CLOSE BUTTON
        ========================== */}

        <button
          type="button"
          className="room-modal-close-user"
          onClick={onClose}
          aria-label="Close room details"
        >
          <i className="bi bi-x-lg"></i>
        </button>


        <div className="row g-0">


          {/* =========================
              ROOM IMAGE
          ========================== */}

          <div className="col-lg-6">

            <div className="room-modal-image-user">

              <img
                src={room.image}
                alt={room.name}
              />


              <div className="room-modal-image-overlay-user"></div>


              <div className="room-modal-image-content-user">

                <span>
                  {room.type}
                </span>

                <h2>
                  {room.name}
                </h2>

                {room.roomNumber && (
                  <p>
                    Room {room.roomNumber}
                  </p>
                )}

              </div>

            </div>

          </div>


          {/* =========================
              ROOM INFORMATION
          ========================== */}

          <div className="col-lg-6">

            <div className="room-modal-content-user">


              {/* HEADING */}

              <div className="room-modal-heading-user">

                <span>
                  LUXURY ACCOMMODATION
                </span>

                <h2>
                  {room.name}
                </h2>

                <p>
                  {room.description}
                </p>

              </div>


              {/* ROOM INFORMATION */}

              <div className="room-modal-features-user">

                <div>

                  <i className="bi bi-people"></i>

                  <div>
                    <span>
                      Guests
                    </span>

                    <strong>
                      Up to{' '}
                      {room.capacity ||
                        room.guests ||
                        1}
                    </strong>
                  </div>

                </div>


                <div>

                  <i className="bi bi-moon"></i>

                  <div>
                    <span>
                      Beds
                    </span>

                    <strong>
                      {room.beds ||
                        'Premium Bed'}
                    </strong>
                  </div>

                </div>


                <div>

                  <i className="bi bi-arrows-fullscreen"></i>

                  <div>
                    <span>
                      Room Size
                    </span>

                    <strong>
                      {room.size ||
                        'Spacious'}
                    </strong>
                  </div>

                </div>


                <div>

                  <i className="bi bi-door-open"></i>

                  <div>
                    <span>
                      Room
                    </span>

                    <strong>
                      {room.roomNumber ||
                        'Luxury Room'}
                    </strong>
                  </div>

                </div>

              </div>


              {/* AMENITIES */}

              {room.amenities &&
                room.amenities.length >
                  0 && (

                  <div className="room-modal-amenities-user">

                    <span className="room-modal-section-label-user">
                      ROOM AMENITIES
                    </span>

                    <div className="room-amenities-grid-user">

                      {room.amenities.map(
                        (
                          amenity,
                          index
                        ) => (

                          <div
                            key={`${amenity}-${index}`}
                          >

                            <i className="bi bi-check-circle"></i>

                            <span>
                              {amenity}
                            </span>

                          </div>

                        )
                      )}

                    </div>

                  </div>

                )}


              {/* PRICE */}

              <div className="room-modal-price-user">

                <div>

                  <span>
                    PRICE PER NIGHT
                  </span>

                  <strong>
                    PKR{' '}
                    {Number(
                      room.price || 0
                    ).toLocaleString()}
                  </strong>

                </div>

                <small>
                  Taxes and additional
                  services may apply.
                </small>

              </div>


              {/* =========================
                  BOOKING AREA
              ========================== */}

              {bookingData?.checkIn &&
              bookingData?.checkOut ? (

                <div className="room-modal-booking-user">

                  <div className="room-modal-divider-user"></div>

                  <div className="room-modal-booking-heading-user">

                    <span>
                      YOUR RESERVATION
                    </span>

                    <h3>
                      Complete Your Booking
                    </h3>

                    <p>
                      Review your stay details
                      and confirm your
                      reservation.
                    </p>

                  </div>


                  <BookingForm
                    room={room}
                    bookingData={
                      bookingData
                    }
                    onClose={onClose}
                  />

                </div>

              ) : (

                <div className="room-modal-action-user">

                  <button
                    type="button"
                    className="btn btn-luxury w-100"
                    onClick={
                      handleCheckAvailability
                    }
                  >
                    <i className="bi bi-calendar-check me-2"></i>

                    Check Availability
                  </button>


                  <small>
                    Select your check-in and
                    check-out dates to confirm
                    availability.
                  </small>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default RoomDetails