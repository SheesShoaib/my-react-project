function AboutSection() {
  return (
    <section
      id="about"
      className="about-section-user"
    >
      <div className="container">

        <div className="row align-items-center g-5">

          {/* Image */}
          <div className="col-lg-6">

            <div className="about-image-wrapper-user">

              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85"
                alt="LuxuryStay hotel"
                className="about-image-user"
              />

              <div className="about-experience-card-user">

                <strong>15+</strong>

                <span>
                  Years of
                  <br />
                  Hospitality
                </span>

              </div>

            </div>

          </div>

          {/* Content */}
          <div className="col-lg-6">

            <div className="about-content-user">

              <span className="about-label-user">
                ABOUT LUXURYSTAY
              </span>

              <h2>
                Hospitality
                <br />
                <span>Beyond Expectations.</span>
              </h2>

              <p className="about-lead-user">
                LuxuryStay Hospitality is built around one
                simple idea — every guest deserves an
                exceptional experience.
              </p>

              <p>
                From beautifully designed rooms to
                personalized guest services, we bring
                together comfort, elegance and thoughtful
                hospitality to create memorable stays.
              </p>

              <p>
                Our team is committed to delivering
                professional service while making every
                guest feel genuinely welcomed.
              </p>

              <div className="about-stats-user">

                <div className="about-stat-user">
                  <strong>50+</strong>
                  <span>Luxury Rooms</span>
                </div>

                <div className="about-stat-user">
                  <strong>4.9</strong>
                  <span>Guest Rating</span>
                </div>

                <div className="about-stat-user">
                  <strong>24/7</strong>
                  <span>Guest Support</span>
                </div>

              </div>

              <a
                href="#booking"
                className="btn btn-luxury mt-4"
              >
                Experience Luxury
                <i className="bi bi-arrow-right ms-2"></i>
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default AboutSection