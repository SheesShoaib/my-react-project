import {
  useMemo,
  useState,
} from 'react'

import {
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

  const {
    token,
    isAuthenticated,
  } = useAuth()

  const [specialRequests, setSpecialRequests] =
    useState('')

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
        bookingData.checkIn
      )

    const end =
      new Date(
        bookingData.checkOut
      )

    const difference =
      end.getTime() -
      start.getTime()

    return Math.max(
      0,
      Math.ceil(
        difference /
          (1000 * 60 * 60 * 24)
      )
    )
  }, [bookingData])


  const estimatedTotal =
    nights * room.price


  const handleReservation =
    async (event) => {
      event.preventDefault()

      setError('')
      setSuccess('')


      if (!isAuthenticated) {
        navigate('/login')
        return
      }


      if (
        !bookingData?.checkIn ||
        !bookingData?.checkOut
      ) {
        setError(
          'Please select your booking dates first.'
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

              specialRequests,
            },
          })


        setSuccess(
          data.message ||
            'Reservation created successfully.'
        )


        setTimeout(() => {
          onClose?.()

          navigate(
            '/guest/reservations'
          )
        }, 1200)

      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }


  return (
    <div className="booking-form-user">

      <div className="booking-summary-user">

        <div>
          <span>
            SELECTED ROOM
          </span>

          <h3>
            {room.name}
          </h3>

          <p>
            Room {room.roomNumber}
          </p>
        </div>

        <strong>
          PKR{' '}
          {room.price.toLocaleString()}
          <small>
            {' '}
            / night
          </small>
        </strong>

      </div>


      {bookingData?.checkIn &&
        bookingData?.checkOut && (

          <div className="booking-details-grid-user">

            <div>
              <span>
                Check In
              </span>

              <strong>
                {bookingData.checkIn}
              </strong>
            </div>

            <div>
              <span>
                Check Out
              </span>

              <strong>
                {bookingData.checkOut}
              </strong>
            </div>

            <div>
              <span>
                Guests
              </span>

              <strong>
                {bookingData.guests}
              </strong>
            </div>

            <div>
              <span>
                Nights
              </span>

              <strong>
                {nights}
              </strong>
            </div>

          </div>

        )}


      <form
        onSubmit={
          handleReservation
        }
      >

        <div className="mb-3">

          <label className="form-label">
            Special Requests
          </label>

          <textarea
            className="form-control"
            rows="3"
            maxLength="500"
            placeholder="Airport transfer, additional pillows, special requirements..."
            value={
              specialRequests
            }
            onChange={(event) =>
              setSpecialRequests(
                event.target.value
              )
            }
          ></textarea>

        </div>


        {nights > 0 && (
          <div className="booking-total-user">

            <span>
              Estimated Total
            </span>

            <strong>
              PKR{' '}
              {estimatedTotal.toLocaleString()}
            </strong>

          </div>
        )}


        {error && (
          <div className="auth-alert-user mb-3">
            <i className="bi bi-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        )}


        {success && (
          <div className="auth-success-user mb-3">
            <i className="bi bi-check-circle"></i>
            <span>{success}</span>
          </div>
        )}


        <button
          type="submit"
          className="btn btn-luxury w-100"
          disabled={loading}
        >

          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Confirming...
            </>
          ) : (
            <>
              <i className="bi bi-calendar-check me-2"></i>
              Confirm Reservation
            </>
          )}

        </button>

      </form>

    </div>
  )
}

export default BookingForm