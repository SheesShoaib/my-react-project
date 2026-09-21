import {
  useEffect,
  useState,
} from 'react'

import {
  useAuth,
} from '../../context/AuthContext'

import {
  getAdminDashboard,
} from '../../services/adminService'

function AdminDashboard() {
  const {
    token,
    user,
  } = useAuth()

  const [stats, setStats] =
    useState(null)

  const [
    recentReservations,
    setRecentReservations,
  ] = useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  useEffect(() => {
    const loadDashboard =
      async () => {
        try {
          setLoading(true)
          setError('')

          const data =
            await getAdminDashboard(
              token
            )

          setStats(data.stats)

          setRecentReservations(
            data.recentReservations ||
              []
          )
        } catch (error) {
          setError(error.message)
        } finally {
          setLoading(false)
        }
      }

    if (token) {
      loadDashboard()
    }
  }, [token])

  const formatCurrency = (
    amount
  ) => {
    return new Intl.NumberFormat(
      'en-PK'
    ).format(amount || 0)
  }

  const formatDate = (date) => {
    if (!date) {
      return '-'
    }

    return new Intl.DateTimeFormat(
      'en-GB',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }
    ).format(new Date(date))
  }

  const cards = stats
    ? [
        {
          title: 'Total Guests',
          value:
            stats.totalGuests,
          icon: 'bi-people',
          text:
            'Registered guests',
        },
        {
          title: 'Staff Members',
          value:
            stats.totalStaff,
          icon:
            'bi-person-badge',
          text:
            'Active hotel staff',
        },
        {
          title: 'Total Rooms',
          value:
            stats.totalRooms,
          icon: 'bi-door-open',
          text:
            'Active inventory',
        },
        {
          title:
            'Available Rooms',
          value:
            stats.availableRooms,
          icon:
            'bi-check-circle',
          text:
            'Ready for guests',
        },
        {
          title:
            'Active Reservations',
          value:
            stats.activeReservations,
          icon: 'bi-calendar2-check',
          text:
            'Current bookings',
        },
        {
          title: 'Total Revenue',
          value: `PKR ${formatCurrency(
            stats.totalRevenue
          )}`,
          icon: 'bi-wallet2',
          text:
            'Reservation revenue',
        },
      ]
    : []

  if (loading) {
    return (
      <div className="ls-admin-state-user">
        <div
          className="spinner-border"
          role="status"
        />

        <p>
          Preparing dashboard...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="ls-admin-error-user">
        <i className="bi bi-exclamation-circle"></i>

        <div>
          <strong>
            Dashboard unavailable
          </strong>

          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="ls-admin-page-user">
      <section className="ls-admin-welcome-user">
        <div>
          <span className="ls-admin-eyebrow-user">
            HOTEL ADMINISTRATION
          </span>

          <h1>
            Welcome back,
            <em>
              {' '}
              {user?.firstName ||
                'Admin'}
            </em>
          </h1>

          <p>
            Monitor hotel operations,
            reservations, rooms and
            staff from one place.
          </p>
        </div>

        <div className="ls-admin-welcome-badge-user">
          <i className="bi bi-shield-check"></i>

          <div>
            <span>
              ACCESS LEVEL
            </span>

            <strong>
              Administrator
            </strong>
          </div>
        </div>
      </section>

      <section className="ls-admin-stats-user">
        {cards.map((card) => (
          <article
            className="ls-admin-stat-card-user"
            key={card.title}
          >
            <div className="ls-admin-stat-icon-user">
              <i
                className={`bi ${card.icon}`}
              ></i>
            </div>

            <div className="ls-admin-stat-content-user">
              <span>
                {card.title}
              </span>

              <strong>
                {card.value}
              </strong>

              <small>
                {card.text}
              </small>
            </div>
          </article>
        ))}
      </section>

      <section className="ls-admin-content-grid-user">
        <div className="ls-admin-panel-user">
          <div className="ls-admin-panel-heading-user">
            <div>
              <span>
                RESERVATIONS
              </span>

              <h2>
                Recent Bookings
              </h2>
            </div>

            <div className="ls-admin-live-user">
              <span></span>
              Live
            </div>
          </div>

          {recentReservations.length >
          0 ? (
            <div className="ls-admin-table-wrap-user">
              <table className="ls-admin-table-user">
                <thead>
                  <tr>
                    <th>Guest</th>
                    <th>Room</th>
                    <th>Check In</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {recentReservations.map(
                    (
                      reservation
                    ) => (
                      <tr
                        key={
                          reservation._id
                        }
                      >
                        <td>
                          <div className="ls-admin-guest-user">
                            <div>
                              {reservation
                                .guest
                                ?.firstName?.[0] ||
                                'G'}
                            </div>

                            <span>
                              <strong>
                                {reservation
                                  .guest
                                  ?.firstName ||
                                  'Guest'}{' '}
                                {reservation
                                  .guest
                                  ?.lastName ||
                                  ''}
                              </strong>

                              <small>
                                {reservation
                                  .guest
                                  ?.email ||
                                  '-'}
                              </small>
                            </span>
                          </div>
                        </td>

                        <td>
                          <strong>
                            {reservation
                              .room
                              ?.roomNumber ||
                              '-'}
                          </strong>

                          <small className="d-block">
                            {reservation
                              .room
                              ?.type ||
                              ''}
                          </small>
                        </td>

                        <td>
                          {formatDate(
                            reservation.checkIn
                          )}
                        </td>

                        <td>
                          PKR{' '}
                          {formatCurrency(
                            reservation.totalAmount
                          )}
                        </td>

                        <td>
                          <span
                            className={`ls-admin-status-user status-${reservation.status}`}
                          >
                            {reservation.status}
                          </span>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="ls-admin-empty-user">
              <i className="bi bi-calendar-x"></i>

              <h3>
                No reservations yet
              </h3>

              <p>
                New reservations will
                appear here.
              </p>
            </div>
          )}
        </div>

        <aside className="ls-admin-quick-user">
          <span className="ls-admin-eyebrow-user">
            QUICK OVERVIEW
          </span>

          <h2>
            Room Inventory
          </h2>

          <div className="ls-admin-room-count-user">
            <strong>
              {stats?.availableRooms ||
                0}
            </strong>

            <span>
              rooms currently
              available
            </span>
          </div>

          <div className="ls-admin-progress-user">
            <div>
              <span>
                Availability
              </span>

              <strong>
                {stats?.totalRooms
                  ? Math.round(
                      (stats.availableRooms /
                        stats.totalRooms) *
                        100
                    )
                  : 0}
                %
              </strong>
            </div>

            <div className="ls-admin-progress-track-user">
              <span
                style={{
                  width: `${
                    stats?.totalRooms
                      ? Math.round(
                          (stats.availableRooms /
                            stats.totalRooms) *
                            100
                        )
                      : 0
                  }%`,
                }}
              ></span>
            </div>
          </div>

          <div className="ls-admin-mini-info-user">
            <div>
              <i className="bi bi-building"></i>

              <span>
                <small>
                  INVENTORY
                </small>

                <strong>
                  {stats?.totalRooms ||
                    0}{' '}
                  Rooms
                </strong>
              </span>
            </div>

            <div>
              <i className="bi bi-calendar-check"></i>

              <span>
                <small>
                  BOOKINGS
                </small>

                <strong>
                  {stats?.activeReservations ||
                    0}{' '}
                  Active
                </strong>
              </span>
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}

export default AdminDashboard