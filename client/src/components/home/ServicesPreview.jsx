import { useState } from 'react'

const services = [
  {
    id: 1,
    title: 'Room Service',
    icon: 'bi-cup-hot',
    shortText:
      'Enjoy carefully prepared meals and refreshments delivered directly to your room.',
    details:
      'Order meals, refreshments and selected dining options from the comfort and privacy of your room.',
    features: [
      'In-room dining',
      'Breakfast service',
      'Refreshments',
      '24/7 service availability',
    ],
  },
  {
    id: 2,
    title: 'Transportation',
    icon: 'bi-car-front',
    shortText:
      'Move comfortably with our reliable airport and city transportation services.',
    details:
      'Travel comfortably with professionally coordinated transportation for airport transfers and selected city journeys.',
    features: [
      'Airport transfers',
      'City transportation',
      'Professional drivers',
      'Scheduled pickup',
    ],
  },
  {
    id: 3,
    title: 'Wake-up Calls',
    icon: 'bi-alarm',
    shortText:
      'Personalized wake-up assistance to help you start every day on time.',
    details:
      'Request a personalized wake-up call according to your preferred time and start your day without worrying about missing an important schedule.',
    features: [
      'Scheduled wake-up',
      'Personalized timing',
      'Front desk assistance',
      'Guest convenience',
    ],
  },
]

function ServicesPreview() {

  const [selectedService, setSelectedService] = useState(null)

  return (
    <>
      <section
        id="services"
        className="services-section-user"
      >

        <div className="container">

          {/* HEADER */}
          <div className="section-heading-user text-center">

            <span>
              PERSONALIZED SERVICES
            </span>

            <h2>
              Everything You Need,
              <br />
              Right When You Need It
            </h2>

            <p>
              Our guest services are designed to make your
              stay comfortable, convenient and memorable.
            </p>

          </div>

          {/* SERVICES */}
          <div className="row g-4">

            {services.map((service, index) => (

              <div
                className="col-md-4"
                key={service.id}
              >

                <article
                  className={`service-item-user service-${index + 1}-user`}
                >

                  <div className="service-number-user">
                    0{index + 1}
                  </div>

                  <div className="service-icon-user">
                    <i
                      className={`bi ${service.icon}`}
                    ></i>
                  </div>

                  <h3>
                    {service.title}
                  </h3>

                  <p>
                    {service.shortText}
                  </p>

                  <button
                    type="button"
                    className="service-link-user"
                    onClick={() =>
                      setSelectedService(service)
                    }
                  >
                    Learn More
                    <i className="bi bi-arrow-right"></i>
                  </button>

                </article>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* SERVICE DETAILS MODAL */}
      {selectedService && (

        <div className="service-modal-overlay-user">

          <div className="service-modal-user">

            <button
              type="button"
              className="service-modal-close-user"
              onClick={() =>
                setSelectedService(null)
              }
              aria-label="Close service details"
            >
              <i className="bi bi-x-lg"></i>
            </button>

            <div className="service-modal-icon-user">
              <i
                className={`bi ${selectedService.icon}`}
              ></i>
            </div>

            <span className="service-modal-label-user">
              LUXURYSTAY GUEST SERVICE
            </span>

            <h2>
              {selectedService.title}
            </h2>

            <p className="service-modal-description-user">
              {selectedService.details}
            </p>

            <div className="service-modal-features-user">

              {selectedService.features.map(
                (feature) => (

                  <div
                    key={feature}
                  >
                    <i className="bi bi-check-circle-fill"></i>
                    <span>{feature}</span>
                  </div>

                )
              )}

            </div>

            <button
              type="button"
              className="btn btn-luxury w-100"
              onClick={() =>
                setSelectedService(null)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

    </>
  )
}

export default ServicesPreview