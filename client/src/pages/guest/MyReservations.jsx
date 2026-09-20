import {
  useEffect,
  useState,
} from 'react'

import {
  useAuth,
} from '../../context/AuthContext'

import {
  getMyReservations,
} from '../../services/reservationService'


function MyReservations() {
  const {
    token,
  } = useAuth()

  const [reservations, setReservations] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')


  useEffect(() => {
    const loadReservations =
      async () => {
        try {
          const data =
            await getMyReservations(
              token
            )

          setReservations(
            data.reservations
          )
        } catch (error) {
          setError(error.message)
        } finally {
          setLoading(false)
        }
      }

    if (token) {
      loadReservations()
    }

  }, [token])


  const formatDate = (date) =>
    new Date(date)
      .toLocaleDateString(
        'en-GB',
        {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }
      )


  return (
    <>
      <div className="dashboard-page-heading-user">

        <span>
          RESERVATIONS
        </span>

        <h1>
          My Reservations
        </h1>

        <p>
          View and manage your
          LuxuryStay reservations.
        </p>

      </div>


      {loading && (
        <div className="text-center py-5">

          <div className="spinner-border"></div>

          <p className="mt-3">
            Loading reservations...
          </p>

        </div>
      )}


      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}


      {!loading &&
        !error &&
        reservations.length === 0 && (

          <div className="guest-panel-user">

            <div className="guest-empty-user">

              <i className="bi bi-calendar2-x"></i>

              <h3>
                No reservations yet
              </h3>

              <p>
                Your confirmed hotel
                reservations will appear
                here.
              </p>

            </div>

          </div>

        )}


      <div className="row g-4">

        {reservations.map(
          (reservation) => (

            <div
              className="col-xl-6"
              key={reservation._id}
            >

              <article className="guest-panel-user h-100">

                {reservation.room?.image && (
                  <img
                    src={
                      reservation.room.image
                    }
                    alt={
                      reservation.room.name
                    }
                    className="reservation-image-user"
                  />
                )}


                <div className="d-flex justify-content-between gap-3 mt-4">

                  <div>
                    <span className="reservation-label-user">
                      ROOM
                    </span>

                    <h3>
                      {reservation.room?.name}
                    </h3>

                    <p className="text-muted">
                      Room{' '}
                      {reservation.room?.roomNumber}
                    </p>
                  </div>


                  <span
                    className={`reservation-status-user reservation-status-${reservation.status}`}
                  >
                    {reservation.status}
                  </span>

                </div>


                <div className="booking-details-grid-user mt-4">

                  <div>
                    <span>
                      Check In
                    </span>

                    <strong>
                      {formatDate(
                        reservation.checkIn
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Check Out
                    </span>

                    <strong>
                      {formatDate(
                        reservation.checkOut
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Nights
                    </span>

                    <strong>
                      {reservation.nights}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Guests
                    </span>

                    <strong>
                      {reservation.guests}
                    </strong>
                  </div>

                </div>


                <div className="booking-total-user mt-4">

                  <span>
                    Total Amount
                  </span>

                  <strong>
                    PKR{' '}
                    {reservation.totalAmount
                      .toLocaleString()}
                  </strong>

                </div>

              </article>

            </div>

          )
        )}

      </div>
    </>
  )
}

export default MyReservations