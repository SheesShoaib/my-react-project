function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-user">
      <div className="container py-2">

        <a className="navbar-brand navbar-brand-user fw-bold" href="/">
          <i className="bi bi-buildings me-2"></i>
          LuxuryStay
        </a>

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
              <a className="nav-link" href="/">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#rooms">
                Rooms
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#services">
                Services
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#about">
                About
              </a>
            </li>

            <li className="nav-item ms-lg-2">
              <a
                className="btn btn-luxury px-4"
                href="#booking"
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