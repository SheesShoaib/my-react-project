function RoomDetails({ room, onClose }) {
  if (!room) return null

  return (
    <div className="room-details-overlay-user">
      <div className="room-details-modal-user">

        {/* CLOSE BUTTON */}
        <button
          type="button"
          className="room-details-close-user"
          onClick={onClose}
          aria-label="Close room details"
        >
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="row g-0">

          {/* IMAGE */}
          <div className="col-lg-6">

            <div className="room-details-image-wrapper-user">
              <img
                src={room.image}
                alt={room.name}
                className="room-details-image-user"
              />

              <span className="room-details-type-user">
                {room.type}
              </span>

            </div>

          </div>

          {/* CONTENT */}
          <div className="col-lg-6">

            <div className="room-details-content-user">

              <span className="room-details-label-user">
                LUXURYSTAY ACCOMMODATION
              </span>

              <h2>{room.name}</h2>

              <div className="room-details-rating-user">
                <i className="bi bi-star-fill"></i>
                <strong>4.9</strong>
                <span>Exceptional Guest Rating</span>
              </div>

              <p className="room-details-description-user">
                {room.description}
              </p>

              {/* PRICE */}
              <div className="room-details-price-user">
                <strong>
                  PKR {room.price.toLocaleString()}
                </strong>

                <span>/ night</span>
              </div>

              {/* ROOM INFO */}
              <div className="room-details-info-user">

                <div>
                  <i className="bi bi-people"></i>
                  <span>
                    <small>Guests</small>
                    {room.guests}
                  </span>
                </div>

                <div>
                  <i className="bi bi-house"></i>
                  <span>
                    <small>Room Size</small>
                    {room.size}
                  </span>
                </div>

                <div>
                  <i className="bi bi-moon-stars"></i>
                  <span>
                    <small>Bed</small>
                    {room.beds}
                  </span>
                </div>

              </div>

              {/* AMENITIES */}
              <div className="room-details-amenities-user">

                <h4>Room Amenities</h4>

                <div className="row g-2">

                  {room.amenities.map((amenity) => (

                    <div
                      className="col-sm-6"
                      key={amenity}
                    >
                      <div className="room-amenity-item-user">
                        <i className="bi bi-check-circle-fill"></i>
                        <span>{amenity}</span>
                      </div>
                    </div>

                  ))}

                </div>

              </div>

              {/* ACTIONS */}
              <div className="room-details-actions-user">

                <button
                  type="button"
                  className="btn btn-luxury"
                  onClick={() => {
                    onClose()
                    document
                      .getElementById('booking')
                      ?.scrollIntoView({
                        behavior: 'smooth',
                      })
                  }}
                >
                  Book This Room
                  <i className="bi bi-arrow-right ms-2"></i>
                </button>

                <button
                  type="button"
                  className="btn btn-outline-luxury"
                  onClick={onClose}
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default RoomDetails