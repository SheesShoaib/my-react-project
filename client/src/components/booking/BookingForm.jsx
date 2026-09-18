function BookingForm({
  room,
  checkIn,
  checkOut,
  guests,
  onClose,
}) {
  if (!room) return null

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1

    const start = new Date(checkIn)
    const end = new Date(checkOut)

    const difference = end - start
    const nights = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    )

    return nights > 0 ? nights : 1
  }

  const nights = calculateNights()
  const total = room.price * nights

  const handleSubmit = (event) => {
    event.preventDefault()

    alert(
      `Booking request submitted for ${room.name}.`
    )
  }

  return (
    <div className="booking-form-overlay-user">

      <div className="booking-form-modal-user">

        {/* CLOSE */}
        <button
          type="button"
          className="booking-form-close-user"
          onClick={onClose}
          aria-label="Close booking form"
        >
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="row g-0">

          {/* LEFT - ROOM SUMMARY */}
          <div className="col-lg-5">

            <div className="booking-summary-user">

              <div className="booking-summary-image-user">

                <img
                  src={room.image}
                  alt={room.name}
                />

              </div>

              <span className="booking-summary-label-user">
                YOUR SELECTED ROOM
              </span>

              <h2>{room.name}</h2>

              <div className="booking-summary-rating-user">
                <i className="bi bi-star-fill"></i>
                <strong>4.9</strong>
                <span>Exceptional</span>
              </div>

              <div className="booking-summary-details-user">

                <div>
                  <i className="bi bi-calendar-check"></i>

                  <span>
                    <small>Check In</small>
                    {checkIn}
                  </span>
                </div>

                <div>
                  <i className="bi bi-calendar-x"></i>

                  <span>
                    <small>Check Out</small>
                    {checkOut}
                  </span>
                </div>

                <div>
                  <i className="bi bi-people"></i>

                  <span>
                    <small>Guests</small>
                    {guests}
                  </span>
                </div>

              </div>

              {/* PRICE */}
              <div className="booking-total-user">

                <div>
                  <span>
                    PKR {room.price.toLocaleString()} × {nights}{' '}
                    {nights === 1 ? 'night' : 'nights'}
                  </span>

                  <strong>
                    PKR {total.toLocaleString()}
                  </strong>
                </div>

                <small>
                  Taxes and additional services will be
                  calculated during the final billing process.
                </small>

              </div>

            </div>

          </div>

          {/* RIGHT - FORM */}
          <div className="col-lg-7">

            <div className="booking-form-content-user">

              <span className="booking-form-label-user">
                RESERVATION DETAILS
              </span>

              <h2>
                Complete Your Booking
              </h2>

              <p>
                Enter your details below to request
                your reservation.
              </p>

              <form onSubmit={handleSubmit}>

                <div className="row g-3">

                  {/* NAME */}
                  <div className="col-md-6">

                    <label htmlFor="guestName">
                      Full Name
                    </label>

                    <input
                      id="guestName"
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                      required
                    />

                  </div>

                  {/* EMAIL */}
                  <div className="col-md-6">

                    <label htmlFor="guestEmail">
                      Email Address
                    </label>

                    <input
                      id="guestEmail"
                      type="email"
                      className="form-control"
                      placeholder="example@email.com"
                      required
                    />

                  </div>

                  {/* PHONE */}
                  <div className="col-md-6">

                    <label htmlFor="guestPhone">
                      Phone Number
                    </label>

                    <input
                      id="guestPhone"
                      type="tel"
                      className="form-control"
                      placeholder="+92 300 1234567"
                      required
                    />

                  </div>

                  {/* GUESTS */}
                  <div className="col-md-6">

                    <label htmlFor="bookingGuests">
                      Number of Guests
                    </label>

                    <select
                      id="bookingGuests"
                      className="form-select"
                      defaultValue={guests}
                      required
                    >
                      <option value="1">
                        1 Guest
                      </option>

                      <option value="2">
                        2 Guests
                      </option>

                      <option value="3">
                        3 Guests
                      </option>

                      <option value="4">
                        4 Guests
                      </option>
                    </select>

                  </div>

                  {/* SPECIAL REQUEST */}
                  <div className="col-12">

                    <label htmlFor="specialRequest">
                      Special Request
                    </label>

                    <textarea
                      id="specialRequest"
                      className="form-control"
                      rows="4"
                      placeholder="Any special requirements?"
                    ></textarea>

                  </div>

                </div>

                {/* CONFIRM */}
                <button
                  type="submit"
                  className="btn btn-luxury w-100 mt-4"
                >
                  Confirm Booking Request
                  <i className="bi bi-check2-circle ms-2"></i>
                </button>

                <p className="booking-secure-note-user">
                  <i className="bi bi-shield-check"></i>
                  Your booking information is handled securely.
                </p>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default BookingForm