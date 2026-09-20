import {
  useEffect,
  useState,
} from 'react'

import {
  getRooms,
} from '../../services/roomService'

import RoomDetails from '../rooms/RoomDetails'


function FeaturedRooms() {
  const [rooms, setRooms] =
    useState([])

  const [selectedRoom, setSelectedRoom] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')


  useEffect(() => {
    const loadRooms = async () => {
      try {
        const data =
          await getRooms()

        setRooms(data.rooms)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadRooms()
  }, [])


  return (
    <section
      className="featured-rooms-user"
      id="rooms"
    >
      <div className="container">

        <div className="section-heading-user text-center">
          <span>ACCOMMODATION</span>

          <h2>
            Featured Rooms & Suites
          </h2>

          <p>
            Discover refined spaces
            designed for comfort,
            privacy and exceptional
            hospitality.
          </p>
        </div>


        {loading && (
          <div className="text-center py-5">
            <div
              className="spinner-border"
              role="status"
            >
              <span className="visually-hidden">
                Loading...
              </span>
            </div>

            <p className="mt-3">
              Loading rooms...
            </p>
          </div>
        )}


        {error && (
          <div
            className="alert alert-danger"
            role="alert"
          >
            {error}
          </div>
        )}


        {!loading &&
          !error && (
            <div className="row g-4">

              {rooms.map((room) => (

                <div
                  className="col-lg-4"
                  key={room._id}
                >

                  <article className="room-card-user h-100">

                    <div className="room-image-user">

                      <img
                        src={room.image}
                        alt={room.name}
                      />

                      <span className="room-type-user">
                        {room.type}
                      </span>

                    </div>


                    <div className="room-card-body-user">

                      <div className="room-card-title-user">

                        <div>
                          <h3>
                            {room.name}
                          </h3>

                          <small>
                            Room {room.roomNumber}
                          </small>
                        </div>

                        <div className="room-price-user">
                          <strong>
                            PKR{' '}
                            {room.price.toLocaleString()}
                          </strong>

                          <span>
                            / night
                          </span>
                        </div>

                      </div>


                      <p>
                        {room.description}
                      </p>


                      <div className="room-features-user">

                        <span>
                          <i className="bi bi-people"></i>
                          {room.capacity}{' '}
                          Guests
                        </span>

                        <span>
                          <i className="bi bi-moon"></i>
                          {room.beds}
                        </span>

                      </div>


                      <button
                        type="button"
                        className="btn btn-outline-luxury w-100"
                        onClick={() =>
                          setSelectedRoom(
                            room
                          )
                        }
                      >
                        View Details
                      </button>

                    </div>

                  </article>

                </div>

              ))}

            </div>
          )}

      </div>


      {selectedRoom && (
        <RoomDetails
          room={selectedRoom}
          onClose={() =>
            setSelectedRoom(null)
          }
        />
      )}

    </section>
  )
}

export default FeaturedRooms