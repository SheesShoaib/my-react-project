import {
  Link,
  useLocation,
} from 'react-router-dom'

function Navbar() {

  const location = useLocation()

  const homeSectionLink = (section) => {
    if (location.pathname === '/') {
      return section
    }

    return `/${section}`
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-user">

      <div className="container py-2">

        <Link
          className="navbar-brand navbar-brand-user fw-bold"
          to="/"
        >
          <i className="bi bi-buildings me-2"></i>
          LuxuryStay
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#luxuryStayNavbar"
          aria-controls="luxuryStayNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="luxuryStayNavbar"
        >

          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href={homeSectionLink('#rooms')}
              >
                Rooms
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href={homeSectionLink('#services')}
              >
                Services
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href={homeSectionLink('#about')}
              >
                About
              </a>
            </li>

            <li className="nav-item ms-lg-2">

              <Link
                className="nav-link navbar-login-user"
                to="/login"
              >
                <i className="bi bi-person me-1"></i>
                Sign In
              </Link>

            </li>

            <li className="nav-item ms-lg-2">

              <a
                className="btn btn-luxury px-4"
                href={homeSectionLink('#booking')}
              >
                Book Now
              </a>

            </li>

          </ul>

        </div>

      </div>

    </nav>
  )
}

export default Navbar