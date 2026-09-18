import { useState } from 'react'
import rooms from '../../services/roomData'
import RoomDetails from '../rooms/RoomDetails'

function FeaturedRooms() {

  const [selectedRoom, setSelectedRoom] = useState(null)

  return (
    <>
      <section
        id="rooms"
        className="rooms-section-user"
      >

        <div className="container">

          {/* SECTION HEADER */}
          <div className="section-heading-user text-center">

            <span>OUR ACCOMMODATION</span>

            <h2>
              Rooms Designed
              <br />
              Around Your Comfort
            </h2>

            <p>
              Discover elegant spaces created for relaxation,
              privacy and exceptional stays.
            </p>

          </div>

          {/* ROOM CARDS */}
          <div className="row g-4">

            {rooms.map((room) => (

              <div
                className="col-md-6 col-xl-4"
                key={room.id}
              >

                <article className="room-card-user">

                  {/* IMAGE */}
                  <div className="room-image-wrapper-user">

                    <img
                      src={room.image}
                      alt={room.name}
                      className="room-image-user"
                    />

                    <span className="room-type-user">
                      {room.type}
                    </span>

                    <button
                      className="room-favorite-user"
                      type="button"
                      aria-label={`Save ${room.name}`}
                    >
                      <i className="bi bi-heart"></i>
                    </button>

                  </div>

                  {/* CONTENT */}
                  <div className="room-content-user">

                    <div className="d-flex justify-content-between align-items-start gap-3">

                      <div>

                        <h3>{room.name}</h3>

                        <div className="room-rating-user">
                          <i className="bi bi-star-fill"></i>
                          <span>4.9</span>
                          <small>Exceptional</small>
                        </div>

                      </div>

                      <div className="room-price-user">

                        <strong>
                          PKR {room.price.toLocaleString()}
                        </strong>

                        <small>
                          / night
                        </small>

                      </div>

                    </div>

                    <p className="room-description-user">
                      {room.description}
                    </p>

                    {/* ROOM INFO */}
                    <div className="room-info-user">

                      <span>
                        <i className="bi bi-people"></i>
                        {room.guests} Guests
                      </span>

                      <span>
                        <i className="bi bi-house"></i>
                        {room.size}
                      </span>

                      <span>
                        <i className="bi bi-moon-stars"></i>
                        {room.beds}
                      </span>

                    </div>

                    {/* AMENITIES */}
                    <div className="room-amenities-user">

                      {room.amenities
                        .slice(0, 3)
                        .map((amenity) => (

                          <span key={amenity}>
                            <i className="bi bi-check2"></i>
                            {amenity}
                          </span>

                        ))}

                    </div>

                    {/* ACTION */}
                    <button
                      type="button"
                      className="btn btn-outline-luxury w-100 mt-4"
                      onClick={() => setSelectedRoom(room)}
                    >
                      View Room Details
                      <i className="bi bi-arrow-right ms-2"></i>
                    </button>

                  </div>

                </article>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ROOM DETAILS */}
      <RoomDetails
        room={selectedRoom}
        onClose={() => setSelectedRoom(null)}
      />

    </>
  )
}

export default FeaturedRooms