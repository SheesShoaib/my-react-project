import {
  useEffect,
} from 'react'

import BookingForm
  from '../booking/BookingForm'

function RoomDetails({
  room,
  bookingData,
  onClose,
}) {
  useEffect(() => {
    document.body.style.overflow =
      'hidden'

    const handleEscape = (
      event
    ) => {
      if (
        event.key === 'Escape'
      ) {
        onClose()
      }
    }

    window.addEventListener(
      'keydown',
      handleEscape
    )

    return () => {
      document.body.style.overflow =
        ''

      window.removeEventListener(
        'keydown',
        handleEscape
      )
    }
  }, [onClose])

  if (!room) {
    return null
  }

  return (
    <div
      className="room-detail-backdrop-user"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose()
        }
      }}
    >
      <div className="room-detail-modal-user">
        <button
          type="button"
          className="room-detail-close-user"
          onClick={onClose}
        >
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="room-detail-grid-user">
          <div className="room-detail-visual-user">
            <img
              src={room.image}
              alt={room.name}
            />

            <div className="room-detail-visual-overlay-user"></div>

            <div className="room-detail-visual-top-user">
              <span>
                {room.type}
              </span>

              <span>
                ROOM{' '}
                {room.roomNumber}
              </span>
            </div>

            <div className="room-detail-visual-bottom-user">
              <span>
                LUXURYSTAY
              </span>

              <h2>
                {room.name}
              </h2>

              <p>
                Refined comfort.
                Exceptional hospitality.
              </p>
            </div>
          </div>

          <div className="room-detail-content-user">
            <div className="room-detail-heading-user">
              <span>
                YOUR PRIVATE RETREAT
              </span>

              <h2>
                {room.name}
              </h2>

              <p>
                {room.description}
              </p>
            </div>

            <div className="room-detail-info-grid-user">
              <div>
                <i className="bi bi-people"></i>

                <span>
                  CAPACITY
                </span>

                <strong>
                  {room.capacity}{' '}
                  Guests
                </strong>
              </div>

              <div>
                <i className="bi bi-moon"></i>

                <span>
                  BED
                </span>

                <strong>
                  {room.beds}
                </strong>
              </div>

              <div>
                <i className="bi bi-arrows-fullscreen"></i>

                <span>
                  SIZE
                </span>

                <strong>
                  {room.size ||
                    'Spacious'}
                </strong>
              </div>

              <div>
                <i className="bi bi-door-open"></i>

                <span>
                  ROOM
                </span>

                <strong>
                  #{room.roomNumber}
                </strong>
              </div>
            </div>

            {room.amenities?.length >
              0 && (
                <div className="room-detail-amenities-user">
                  <span className="room-detail-label-user">
                    AMENITIES
                  </span>

                  <div className="room-detail-amenities-grid-user">
                    {room.amenities.map(
                      (
                        amenity,
                        index
                      ) => (
                        <div
                          key={`${amenity}-${index}`}
                        >
                          <i className="bi bi-check2"></i>

                          <span>
                            {amenity}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

            <div className="room-detail-price-user">
              <div>
                <span>
                  RATE PER NIGHT
                </span>

                <strong>
                  PKR{' '}
                  {Number(
                    room.price
                  ).toLocaleString()}
                </strong>
              </div>

              <small>
                Taxes and additional
                services may apply
              </small>
            </div>

            {bookingData?.checkIn &&
              bookingData?.checkOut ? (
              <div className="room-detail-reservation-user">
                <div className="room-detail-reservation-title-user">
                  <span>
                    RESERVATION
                  </span>

                  <h3>
                    Complete Your Stay
                  </h3>
                </div>

                <BookingForm
                  room={room}
                  bookingData={bookingData}
                  onClose={onClose}
                />
              </div>
            ) : (
              <div className="room-detail-availability-action-user">
                <div>
                  <span>
                    READY TO RESERVE?
                  </span>

                  <h3>
                    Check Room Availability
                  </h3>

                  <p>
                    Select your stay dates and
                    number of guests to continue
                    with your reservation.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onClose()

                    setTimeout(() => {
                      document
                        .getElementById(
                          'booking'
                        )
                        ?.scrollIntoView({
                          behavior:
                            'smooth',
                          block:
                            'start',
                        })
                    }, 100)
                  }}
                >
                  Check Availability

                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomDetails