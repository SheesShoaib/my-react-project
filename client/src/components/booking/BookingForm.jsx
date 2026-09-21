import {
  useMemo,
  useState,
} from 'react'

import {
  useLocation,
  useNavigate,
} from 'react-router-dom'

import {
  useAuth,
} from '../../context/AuthContext'

import {
  createReservation,
} from '../../services/reservationService'

function BookingForm({
  room,
  bookingData,
  onClose,
}) {
  const navigate =
    useNavigate()

  const location =
    useLocation()

  const {
    token,
    isAuthenticated,
  } = useAuth()

  const [
    specialRequests,
    setSpecialRequests,
  ] = useState('')

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const [success, setSuccess] =
    useState('')

  const nights = useMemo(() => {
    if (
      !bookingData?.checkIn ||
      !bookingData?.checkOut
    ) {
      return 0
    }

    const start =
      new Date(
        `${bookingData.checkIn}T00:00:00`
      )

    const end =
      new Date(
        `${bookingData.checkOut}T00:00:00`
      )

    const difference =
      end.getTime() -
      start.getTime()

    return Math.max(
      0,
      Math.round(
        difference /
          (1000 * 60 * 60 * 24)
      )
    )
  }, [
    bookingData?.checkIn,
    bookingData?.checkOut,
  ])

  const pricePerNight =
    Number(room?.price || 0)

  const estimatedTotal =
    nights * pricePerNight

  const formatDate = (date) => {
    if (!date) {
      return ''
    }

    return new Intl.DateTimeFormat(
      'en-GB',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }
    ).format(
      new Date(`${date}T00:00:00`)
    )
  }

  const handleReservation =
    async (event) => {
      event.preventDefault()

      setError('')
      setSuccess('')

      if (
        !bookingData?.checkIn ||
        !bookingData?.checkOut
      ) {
        setError(
          'Please select your check-in and check-out dates first.'
        )
        return
      }

      if (nights <= 0) {
        setError(
          'Check-out date must be after check-in date.'
        )
        return
      }

      if (!isAuthenticated) {
        onClose?.()

        navigate(
          '/login',
          {
            state: {
              from:
                location.pathname,
              message:
                'Please sign in to confirm your reservation.',
            },
          }
        )

        return
      }

      try {
        setLoading(true)

        const data =
          await createReservation({
            token,

            reservationData: {
              roomId: room._id,

              checkIn:
                bookingData.checkIn,

              checkOut:
                bookingData.checkOut,

              guests:
                Number(
                  bookingData.guests
                ),

              specialRequests:
                specialRequests.trim(),
            },
          })

        setSuccess(
          data.message ||
            'Your reservation has been confirmed successfully.'
        )

        setTimeout(() => {
          onClose?.()

          navigate(
            '/guest/reservations'
          )
        }, 1200)
      } catch (error) {
        setError(
          error.message ||
            'Unable to create reservation.'
        )
      } finally {
        setLoading(false)
      }
    }

  return (
    <div className="lux-booking-user">
      <div className="lux-booking-room-user">
        <div className="lux-booking-room-icon-user">
          <i className="bi bi-door-open"></i>
        </div>

        <div className="lux-booking-room-name-user">
          <span>
            SELECTED ROOM
          </span>

          <h4>
            {room.name}
          </h4>

          <p>
            Room {room.roomNumber}
          </p>
        </div>

        <div className="lux-booking-night-price-user">
          <strong>
            PKR{' '}
            {pricePerNight.toLocaleString()}
          </strong>

          <span>
            PER NIGHT
          </span>
        </div>
      </div>

      <div className="lux-booking-stay-user">
        <div className="lux-booking-stay-item-user">
          <div className="lux-booking-stay-icon-user">
            <i className="bi bi-calendar3"></i>
          </div>

          <div>
            <span>
              CHECK IN
            </span>

            <strong>
              {formatDate(
                bookingData?.checkIn
              )}
            </strong>
          </div>
        </div>

        <div className="lux-booking-stay-item-user">
          <div className="lux-booking-stay-icon-user">
            <i className="bi bi-calendar-check"></i>
          </div>

          <div>
            <span>
              CHECK OUT
            </span>

            <strong>
              {formatDate(
                bookingData?.checkOut
              )}
            </strong>
          </div>
        </div>

        <div className="lux-booking-stay-item-user">
          <div className="lux-booking-stay-icon-user">
            <i className="bi bi-people"></i>
          </div>

          <div>
            <span>
              GUESTS
            </span>

            <strong>
              {bookingData?.guests ||
                1}{' '}
              {Number(
                bookingData?.guests ||
                  1
              ) === 1
                ? 'Guest'
                : 'Guests'}
            </strong>
          </div>
        </div>

        <div className="lux-booking-stay-item-user">
          <div className="lux-booking-stay-icon-user">
            <i className="bi bi-moon-stars"></i>
          </div>

          <div>
            <span>
              DURATION
            </span>

            <strong>
              {nights}{' '}
              {nights === 1
                ? 'Night'
                : 'Nights'}
            </strong>
          </div>
        </div>
      </div>

      <form
        className="lux-booking-form-user"
        onSubmit={
          handleReservation
        }
      >
        <div className="lux-booking-request-user">
          <div className="lux-booking-field-heading-user">
            <div>
              <label
                htmlFor="specialRequests"
              >
                Special Requests
              </label>

              <p>
                Optional
              </p>
            </div>

            <span>
              {specialRequests.length}
              /500
            </span>
          </div>

          <div className="lux-booking-textarea-user">
            <i className="bi bi-chat-left-text"></i>

            <textarea
              id="specialRequests"
              rows="3"
              maxLength="500"
              placeholder="Airport transfer, additional pillows, dietary requirements..."
              value={
                specialRequests
              }
              onChange={(event) =>
                setSpecialRequests(
                  event.target.value
                )
              }
            />
          </div>
        </div>

        <div className="lux-booking-price-box-user">
          <div className="lux-booking-price-line-user">
            <span>
              PKR{' '}
              {pricePerNight.toLocaleString()}
              {' × '}
              {nights}{' '}
              {nights === 1
                ? 'night'
                : 'nights'}
            </span>

            <strong>
              PKR{' '}
              {estimatedTotal.toLocaleString()}
            </strong>
          </div>

          <div className="lux-booking-price-divider-user"></div>

          <div className="lux-booking-total-user">
            <div>
              <span>
                ESTIMATED TOTAL
              </span>

              <small>
                Taxes and additional
                services may apply
              </small>
            </div>

            <strong>
              PKR{' '}
              {estimatedTotal.toLocaleString()}
            </strong>
          </div>
        </div>

        {error && (
          <div className="lux-booking-error-user">
            <i className="bi bi-exclamation-circle"></i>

            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="lux-booking-success-user">
            <i className="bi bi-check-circle"></i>

            <span>
              {success}
            </span>
          </div>
        )}

        <button
          type="submit"
          className="lux-booking-submit-user"
          disabled={
            loading ||
            success
          }
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm"></span>

              <span>
                Confirming
                Reservation...
              </span>
            </>
          ) : success ? (
            <>
              <i className="bi bi-check2-circle"></i>

              <span>
                Reservation
                Confirmed
              </span>
            </>
          ) : (
            <>
              <span>
                Confirm Reservation
              </span>

              <i className="bi bi-arrow-right"></i>
            </>
          )}
        </button>

        {!isAuthenticated && (
          <p className="lux-booking-login-note-user">
            <i className="bi bi-lock"></i>

            You'll be asked to sign
            in before confirming your
            reservation.
          </p>
        )}

        <div className="lux-booking-security-user">
          <span>
            <i className="bi bi-shield-check"></i>
            Secure reservation
          </span>

          <span>
            <i className="bi bi-check2"></i>
            Instant confirmation
          </span>
        </div>
      </form>
    </div>
  )
}

export default BookingForm