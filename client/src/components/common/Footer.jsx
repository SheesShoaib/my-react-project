function Footer() {
  return (
    <footer className="footer-user">

      <div className="container">

        <div className="row g-5">

          {/* Brand */}
          <div className="col-lg-4">

            <div className="footer-brand-user">

              <a
                href="/"
                className="footer-logo-user"
              >
                <i className="bi bi-buildings me-2"></i>
                LuxuryStay
              </a>

              <p>
                Experience refined comfort, exceptional
                hospitality and unforgettable stays with
                LuxuryStay Hospitality.
              </p>

              <div className="footer-social-user">

                <a href="#facebook" aria-label="Facebook">
                  <i className="bi bi-facebook"></i>
                </a>

                <a href="#instagram" aria-label="Instagram">
                  <i className="bi bi-instagram"></i>
                </a>

                <a href="#twitter" aria-label="Twitter">
                  <i className="bi bi-twitter-x"></i>
                </a>

                <a href="#linkedin" aria-label="LinkedIn">
                  <i className="bi bi-linkedin"></i>
                </a>

              </div>

            </div>

          </div>

          {/* Navigation */}
          <div className="col-6 col-lg-2">

            <div className="footer-column-user">

              <h4>Explore</h4>

              <a href="/">Home</a>
              <a href="#rooms">Rooms</a>
              <a href="#services">Services</a>
              <a href="#about">About</a>

            </div>

          </div>

          {/* Services */}
          <div className="col-6 col-lg-2">

            <div className="footer-column-user">

              <h4>Services</h4>

              <a href="#services">Room Service</a>
              <a href="#services">Transportation</a>
              <a href="#services">Wake-up Calls</a>
              <a href="#booking">Reservations</a>

            </div>

          </div>

          {/* Contact */}
          <div className="col-lg-4">

            <div className="footer-column-user">

              <h4>Contact Us</h4>

              <div className="footer-contact-user">

                <div>
                  <i className="bi bi-geo-alt"></i>

                  <span>
                    LuxuryStay Hospitality
                    <br />
                    Karachi, Pakistan
                  </span>
                </div>

                <div>
                  <i className="bi bi-telephone"></i>

                  <span>
                    +92 300 1234567
                  </span>
                </div>

                <div>
                  <i className="bi bi-envelope"></i>

                  <span>
                    reservations@luxurystay.com
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="footer-bottom-user">

          <span>
            © 2026 LuxuryStay Hospitality. All rights reserved.
          </span>

          <div>
            <a href="#privacy">
              Privacy Policy
            </a>

            <a href="#terms">
              Terms & Conditions
            </a>
          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer