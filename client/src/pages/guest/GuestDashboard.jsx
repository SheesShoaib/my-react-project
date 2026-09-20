import {
  useAuth,
} from '../../context/AuthContext'

function GuestDashboard() {
  const {
    user,
  } = useAuth()

  return (
    <>
      <div className="dashboard-page-heading-user">
        <div>
          <span>OVERVIEW</span>

          <h1>
            Welcome back,{' '}
            {user?.firstName}
          </h1>

          <p>
            Here's an overview of your
            LuxuryStay account and upcoming
            stays.
          </p>
        </div>
      </div>

      <div className="row g-4">

        <div className="col-md-6 col-xl-3">
          <article className="guest-stat-card-user">
            <div className="guest-stat-icon-user">
              <i className="bi bi-calendar-check"></i>
            </div>

            <span>
              Active Reservations
            </span>

            <strong>0</strong>

            <small>
              No active reservations
            </small>
          </article>
        </div>

        <div className="col-md-6 col-xl-3">
          <article className="guest-stat-card-user">
            <div className="guest-stat-icon-user">
              <i className="bi bi-clock-history"></i>
            </div>

            <span>
              Previous Stays
            </span>

            <strong>0</strong>

            <small>
              Your stay history
            </small>
          </article>
        </div>

        <div className="col-md-6 col-xl-3">
          <article className="guest-stat-card-user">
            <div className="guest-stat-icon-user">
              <i className="bi bi-bell"></i>
            </div>

            <span>
              Service Requests
            </span>

            <strong>0</strong>

            <small>
              No pending requests
            </small>
          </article>
        </div>

        <div className="col-md-6 col-xl-3">
          <article className="guest-stat-card-user">
            <div className="guest-stat-icon-user">
              <i className="bi bi-star"></i>
            </div>

            <span>Feedback</span>

            <strong>—</strong>

            <small>
              Share your experience
            </small>
          </article>
        </div>

      </div>

      <div className="row g-4 mt-1">

        <div className="col-xl-8">

          <div className="guest-panel-user">

            <div className="guest-panel-heading-user">
              <div>
                <span>RESERVATIONS</span>
                <h2>
                  Upcoming Stays
                </h2>
              </div>
            </div>

            <div className="guest-empty-user">
              <i className="bi bi-calendar2-x"></i>

              <h3>
                No upcoming reservations
              </h3>

              <p>
                Your confirmed reservations
                will appear here.
              </p>
            </div>

          </div>

        </div>

        <div className="col-xl-4">

          <div className="guest-panel-user">

            <div className="guest-panel-heading-user">
              <div>
                <span>PROFILE</span>
                <h2>Guest Details</h2>
              </div>
            </div>

            <div className="guest-profile-user">

              <div className="guest-avatar-user">
                {user?.firstName
                  ?.charAt(0)
                  .toUpperCase()}

                {user?.lastName
                  ?.charAt(0)
                  .toUpperCase()}
              </div>

              <h3>
                {user?.firstName}{' '}
                {user?.lastName}
              </h3>

              <p>{user?.email}</p>

              <div className="guest-profile-info-user">

                <div>
                  <span>Phone</span>
                  <strong>
                    {user?.phone}
                  </strong>
                </div>

                <div>
                  <span>Account Type</span>
                  <strong>Guest</strong>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  )
}

export default GuestDashboard