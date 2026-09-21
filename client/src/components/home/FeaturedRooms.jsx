import {
  useEffect,
  useState,
} from 'react'

import {
  getRooms,
} from '../../services/roomService'

import RoomDetails
  from '../rooms/RoomDetails'

function FeaturedRooms() {
  const [rooms, setRooms] =
    useState([])

  const [
    selectedRoom,
    setSelectedRoom,
  ] = useState(null)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoading(true)
        setError('')

        const data =
          await getRooms()

        setRooms(
          Array.isArray(data.rooms)
            ? data.rooms
            : []
        )
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
        <header className="featured-heading-user">
          <span>
            ACCOMMODATION
          </span>

          <h2>
            Featured Rooms
            <em>&amp; Suites</em>
          </h2>

          <p>
            Discover refined spaces
            designed for comfort,
            privacy and exceptional
            hospitality.
          </p>
        </header>

        {loading && (
          <div className="featured-loading-user">
            <div
              className="spinner-border"
              role="status"
            >
              <span className="visually-hidden">
                Loading...
              </span>
            </div>

            <p>
              Preparing our finest
              rooms...
            </p>
          </div>
        )}

        {error && (
          <div className="featured-error-user">
            <i className="bi bi-exclamation-circle"></i>

            <span>{error}</span>
          </div>
        )}

        {!loading &&
          !error &&
          rooms.length === 0 && (
            <div className="featured-empty-user">
              <i className="bi bi-door-closed"></i>

              <h3>
                No rooms available
              </h3>

              <p>
                Please check again
                shortly.
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          rooms.length > 0 && (
            <div className="row g-4">
              {rooms.map(
                (room, index) => (
                  <div
                    className="col-xl-4 col-md-6"
                    key={room._id}
                  >
                    <article
                      className="featured-room-card-user"
                      style={{
                        '--room-delay':
                          `${index * 0.08}s`,
                      }}
                    >
                      <div className="featured-room-image-user">
                        <img
                          src={room.image}
                          alt={room.name}
                        />

                        <div className="featured-room-image-overlay-user"></div>

                        <div className="featured-room-badges-user">
                          <span className="featured-room-type-user">
                            {room.type}
                          </span>

                          <span className="featured-room-number-badge-user">
                            ROOM{' '}
                            {
                              room.roomNumber
                            }
                          </span>
                        </div>

                        <button
                          type="button"
                          className="featured-room-image-action-user"
                          onClick={() =>
                            setSelectedRoom(
                              room
                            )
                          }
                          aria-label={`View ${room.name}`}
                        >
                          <i className="bi bi-arrow-up-right"></i>
                        </button>
                      </div>

                      <div className="featured-room-body-user">
                        <div className="featured-room-title-row-user">
                          <div>
                            <span className="featured-room-kicker-user">
                              LUXURY
                              ACCOMMODATION
                            </span>

                            <h3>
                              {room.name}
                            </h3>
                          </div>

                          <div className="featured-room-price-user">
                            <strong>
                              PKR{' '}
                              {Number(
                                room.price
                              ).toLocaleString()}
                            </strong>

                            <span>
                              PER NIGHT
                            </span>
                          </div>
                        </div>

                        <p className="featured-room-description-user">
                          {
                            room.description
                          }
                        </p>

                        <div className="featured-room-details-user">
                          <div>
                            <i className="bi bi-people"></i>

                            <span>
                              <small>
                                GUESTS
                              </small>

                              <strong>
                                {
                                  room.capacity
                                }{' '}
                                Guests
                              </strong>
                            </span>
                          </div>

                          <div>
                            <i className="bi bi-moon"></i>

                            <span>
                              <small>
                                BED
                              </small>

                              <strong>
                                {room.beds}
                              </strong>
                            </span>
                          </div>

                          {room.size && (
                            <div>
                              <i className="bi bi-arrows-fullscreen"></i>

                              <span>
                                <small>
                                  SIZE
                                </small>

                                <strong>
                                  {
                                    room.size
                                  }
                                </strong>
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="featured-room-footer-user">
                          <button
                            type="button"
                            className="featured-room-view-user"
                            onClick={() =>
                              setSelectedRoom(
                                room
                              )
                            }
                          >
                            <span>
                              Explore Room
                            </span>

                            <i className="bi bi-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    </article>
                  </div>
                )
              )}
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