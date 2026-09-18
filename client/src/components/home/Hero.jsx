function Hero() {
  return (
    <section className="hero-user">

      <div className="hero-overlay-user"></div>

      <div className="container">
        <div className="row align-items-center min-vh-75">

          {/* LEFT CONTENT */}
          <div className="col-lg-7">

            <div className="hero-content-user">

              <span className="hero-label-user reveal-user">
                LUXURYSTAY HOSPITALITY
              </span>

              <h1 className="reveal-user reveal-delay-1-user">
                Where Luxury
                <br />
                Meets <span>Exceptional</span> Hospitality.
              </h1>

              <p className="reveal-user reveal-delay-2-user">
                Experience refined comfort, world-class service,
                and unforgettable stays designed around you.
              </p>

              <div className="hero-buttons-user reveal-user reveal-delay-3-user">

                <a
                  href="#booking"
                  className="btn btn-luxury"
                >
                  Reserve Your Stay
                  <i className="bi bi-arrow-right ms-2"></i>
                </a>

                <a
                  href="#rooms"
                  className="btn btn-outline-light"
                >
                  Explore Rooms
                </a>

              </div>

              <div className="hero-features-user reveal-user reveal-delay-3-user">

                <div>
                  <i className="bi bi-stars"></i>
                  <span>Premium Hospitality</span>
                </div>

                <div>
                  <i className="bi bi-shield-check"></i>
                  <span>Secure Booking</span>
                </div>

                <div>
                  <i className="bi bi-headset"></i>
                  <span>24/7 Support</span>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="col-lg-5 d-none d-lg-block">

            <div className="hero-image-wrapper-user">

              <img
                src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85"
                alt="Luxury hotel interior"
                className="hero-image-user"
              />

              <div className="hero-floating-card-user">

                <div className="hero-rating-user">
                  <i className="bi bi-star-fill"></i>
                  <strong>4.9</strong>
                </div>

                <div>
                  <small>Guest Rating</small>
                  <p>Exceptional Experience</p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  )
}

export default Hero