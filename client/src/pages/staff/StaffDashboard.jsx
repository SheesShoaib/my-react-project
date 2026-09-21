import {
  useAuth,
} from '../../context/AuthContext'

function StaffDashboard() {
  const {
    user,
  } = useAuth()

  const roleConfig = {
    manager: {
      title:
        'Manager Dashboard',

      subtitle:
        'Monitor hotel operations, rooms, reservations and performance.',

      icon:
        'bi-person-workspace',
    },

    receptionist: {
      title:
        'Reception Dashboard',

      subtitle:
        'Manage reservations, guest arrivals, check-ins and check-outs.',

      icon:
        'bi-person-badge',
    },

    housekeeping: {
      title:
        'Housekeeping Dashboard',

      subtitle:
        'Manage room cleaning, room status and maintenance requests.',

      icon:
        'bi-stars',
    },
  }

  const config =
    roleConfig[user?.role] ||
    {
      title:
        'Staff Dashboard',

      subtitle:
        'Welcome to LuxuryStay Hospitality.',

      icon:
        'bi-grid',
    }

  return (
    <div className="ls-staff-dashboard-user">
      <section className="ls-staff-dashboard-welcome-user">
        <div>
          <span>
            LUXURYSTAY HOSPITALITY
          </span>

          <h1>
            Welcome back,{' '}
            <em>
              {user?.firstName ||
                'Staff'}
            </em>
          </h1>

          <p>
            {config.subtitle}
          </p>
        </div>

        <div className="ls-staff-dashboard-welcome-icon-user">
          <i
            className={`bi ${config.icon}`}
          ></i>
        </div>
      </section>

      <section className="ls-staff-dashboard-heading-user">
        <span>
          STAFF PORTAL
        </span>

        <h2>
          {config.title}
        </h2>
      </section>

      <div className="ls-staff-dashboard-cards-user">
        <article>
          <div>
            <i className="bi bi-calendar-check"></i>
          </div>

          <span>
            <small>
              RESERVATIONS
            </small>

            <strong>
              Manage Bookings
            </strong>
          </span>
        </article>

        <article>
          <div>
            <i className="bi bi-door-open"></i>
          </div>

          <span>
            <small>
              ROOM STATUS
            </small>

            <strong>
              View Rooms
            </strong>
          </span>
        </article>

        <article>
          <div>
            <i className="bi bi-people"></i>
          </div>

          <span>
            <small>
              GUESTS
            </small>

            <strong>
              Guest Services
            </strong>
          </span>
        </article>
      </div>
    </div>
  )
}

export default StaffDashboard