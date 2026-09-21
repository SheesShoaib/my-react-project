import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  useAuth,
} from '../../context/AuthContext'

import {
  getAdminRooms,
  createRoom,
  updateRoom,
  updateRoomStatus,
  updateRoomActiveStatus,
} from '../../services/adminService'

const emptyForm = {
  roomNumber: '',
  name: '',
  type: 'Deluxe',
  description: '',
  price: '',
  capacity: '2',
  beds: '',
  size: '',
  image: '',
  amenities: '',
}

function RoomManagement() {
  const { token } = useAuth()

  const [rooms, setRooms] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  const [success, setSuccess] =
    useState('')

  const [search, setSearch] =
    useState('')

  const [typeFilter, setTypeFilter] =
    useState('all')

  const [
    statusFilter,
    setStatusFilter,
  ] = useState('all')

  const [
    activeFilter,
    setActiveFilter,
  ] = useState('all')

  const [
    modalOpen,
    setModalOpen,
  ] = useState(false)

  const [
    editingRoom,
    setEditingRoom,
  ] = useState(null)

  const [
    formData,
    setFormData,
  ] = useState(emptyForm)

  const [
    formError,
    setFormError,
  ] = useState('')

  const [saving, setSaving] =
    useState(false)

  const [
    actionLoading,
    setActionLoading,
  ] = useState('')

  const loadRooms = async () => {
    try {
      setLoading(true)
      setError('')

      const data =
        await getAdminRooms(
          token
        )

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

  useEffect(() => {
    if (token) {
      loadRooms()
    }
  }, [token])

  const filteredRooms =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase()

      return rooms.filter(
        (room) => {
          const matchesSearch =
            !query ||
            room.roomNumber
              ?.toLowerCase()
              .includes(query) ||
            room.name
              ?.toLowerCase()
              .includes(query)

          const matchesType =
            typeFilter === 'all' ||
            room.type ===
              typeFilter

          const matchesStatus =
            statusFilter ===
              'all' ||
            room.status ===
              statusFilter

          const matchesActive =
            activeFilter ===
              'all' ||
            (activeFilter ===
              'active' &&
              room.isActive) ||
            (activeFilter ===
              'inactive' &&
              !room.isActive)

          return (
            matchesSearch &&
            matchesType &&
            matchesStatus &&
            matchesActive
          )
        }
      )
    }, [
      rooms,
      search,
      typeFilter,
      statusFilter,
      activeFilter,
    ])

  const statistics =
    useMemo(
      () => ({
        total:
          rooms.length,

        available:
          rooms.filter(
            (room) =>
              room.status ===
                'available' &&
              room.isActive
          ).length,

        occupied:
          rooms.filter(
            (room) =>
              room.status ===
              'occupied'
          ).length,

        cleaning:
          rooms.filter(
            (room) =>
              room.status ===
              'cleaning'
          ).length,

        maintenance:
          rooms.filter(
            (room) =>
              room.status ===
              'maintenance'
          ).length,
      }),
      [rooms]
    )

  const showMessage = (
    message
  ) => {
    setSuccess(message)

    window.setTimeout(
      () => {
        setSuccess('')
      },
      3500
    )
  }

  const openCreateModal =
    () => {
      setEditingRoom(null)

      setFormData({
        ...emptyForm,
      })

      setFormError('')
      setModalOpen(true)
    }

  const openEditModal = (
    room
  ) => {
    setEditingRoom(room)

    setFormData({
      roomNumber:
        room.roomNumber || '',

      name:
        room.name || '',

      type:
        room.type || 'Deluxe',

      description:
        room.description || '',

      price:
        String(
          room.price ?? ''
        ),

      capacity:
        String(
          room.capacity ?? ''
        ),

      beds:
        room.beds || '',

      size:
        room.size || '',

      image:
        room.image || '',

      amenities:
        Array.isArray(
          room.amenities
        )
          ? room.amenities.join(
              ', '
            )
          : '',
    })

    setFormError('')
    setModalOpen(true)
  }

  const closeModal = () => {
    if (saving) {
      return
    }

    setModalOpen(false)
    setEditingRoom(null)
    setFormError('')
  }

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    )
  }

  const validateForm = () => {
    if (
      !formData.roomNumber.trim() ||
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.beds.trim()
    ) {
      return (
        'Please complete all required fields.'
      )
    }

    if (
      Number(
        formData.price
      ) <= 0
    ) {
      return (
        'Price must be greater than zero.'
      )
    }

    if (
      Number(
        formData.capacity
      ) < 1
    ) {
      return (
        'Capacity must be at least 1.'
      )
    }

    return ''
  }

  const handleSubmit =
    async (event) => {
      event.preventDefault()

      setFormError('')
      setSuccess('')

      const validationError =
        validateForm()

      if (validationError) {
        setFormError(
          validationError
        )

        return
      }

      const roomData = {
        roomNumber:
          formData.roomNumber,

        name:
          formData.name,

        type:
          formData.type,

        description:
          formData.description,

        price:
          Number(
            formData.price
          ),

        capacity:
          Number(
            formData.capacity
          ),

        beds:
          formData.beds,

        size:
          formData.size,

        image:
          formData.image,

        amenities:
          formData.amenities
            .split(',')
            .map(
              (item) =>
                item.trim()
            )
            .filter(Boolean),
      }

      try {
        setSaving(true)

        if (editingRoom) {
          await updateRoom(
            token,
            editingRoom._id,
            roomData
          )

          showMessage(
            'Room updated successfully.'
          )
        } else {
          await createRoom(
            token,
            roomData
          )

          showMessage(
            'Room added successfully.'
          )
        }

        setModalOpen(false)
        setEditingRoom(null)

        await loadRooms()
      } catch (error) {
        setFormError(
          error.message
        )
      } finally {
        setSaving(false)
      }
    }

  const handleStatusChange =
    async (
      room,
      status
    ) => {
      const actionKey =
        `status-${room._id}`

      try {
        setActionLoading(
          actionKey
        )

        setError('')

        const data =
          await updateRoomStatus(
            token,
            room._id,
            status
          )

        setRooms(
          (previous) =>
            previous.map(
              (item) =>
                item._id ===
                room._id
                  ? data.room
                  : item
            )
        )

        showMessage(
          'Room status updated successfully.'
        )
      } catch (error) {
        setError(
          error.message
        )
      } finally {
        setActionLoading('')
      }
    }

  const handleActiveToggle =
    async (room) => {
      const newStatus =
        !room.isActive

      const confirmed =
        window.confirm(
          newStatus
            ? `Activate Room ${room.roomNumber}?`
            : `Deactivate Room ${room.roomNumber}? It will no longer appear as an active room on the public website.`
        )

      if (!confirmed) {
        return
      }

      const actionKey =
        `active-${room._id}`

      try {
        setActionLoading(
          actionKey
        )

        setError('')

        const data =
          await updateRoomActiveStatus(
            token,
            room._id,
            newStatus
          )

        setRooms(
          (previous) =>
            previous.map(
              (item) =>
                item._id ===
                room._id
                  ? data.room
                  : item
            )
        )

        showMessage(
          data.message
        )
      } catch (error) {
        setError(
          error.message
        )
      } finally {
        setActionLoading('')
      }
    }

  const formatPrice = (
    price
  ) => {
    return new Intl.NumberFormat(
      'en-PK'
    ).format(
      Number(price) || 0
    )
  }

  return (
    <div className="ls-room-admin-page-user">

      {/* PAGE HEADER */}

      <section className="ls-room-admin-header-user">
        <div>
          <span>
            ROOM INVENTORY
          </span>

          <h1>
            Room
            <em> Management</em>
          </h1>

          <p>
            Manage room inventory,
            pricing, availability and
            operational status.
          </p>
        </div>

        <button
          type="button"
          onClick={
            openCreateModal
          }
          className="ls-room-admin-add-user"
        >
          <i className="bi bi-plus-lg"></i>

          Add New Room
        </button>
      </section>


      {/* MESSAGES */}

      {success && (
        <div className="ls-room-admin-message-user success">
          <i className="bi bi-check-circle"></i>
          {success}
        </div>
      )}

      {error && (
        <div className="ls-room-admin-message-user error">
          <i className="bi bi-exclamation-circle"></i>
          {error}
        </div>
      )}


      {/* STATS */}

      <section className="ls-room-admin-stats-user">
        <article>
          <i className="bi bi-building"></i>

          <div>
            <span>
              TOTAL ROOMS
            </span>

            <strong>
              {statistics.total}
            </strong>
          </div>
        </article>

        <article>
          <i className="bi bi-check2-circle"></i>

          <div>
            <span>
              AVAILABLE
            </span>

            <strong>
              {statistics.available}
            </strong>
          </div>
        </article>

        <article>
          <i className="bi bi-door-closed"></i>

          <div>
            <span>
              OCCUPIED
            </span>

            <strong>
              {statistics.occupied}
            </strong>
          </div>
        </article>

        <article>
          <i className="bi bi-stars"></i>

          <div>
            <span>
              CLEANING
            </span>

            <strong>
              {statistics.cleaning}
            </strong>
          </div>
        </article>

        <article>
          <i className="bi bi-tools"></i>

          <div>
            <span>
              MAINTENANCE
            </span>

            <strong>
              {statistics.maintenance}
            </strong>
          </div>
        </article>
      </section>


      {/* INVENTORY */}

      <section className="ls-room-admin-panel-user">

        <div className="ls-room-admin-toolbar-user">
          <div className="ls-room-admin-search-user">
            <i className="bi bi-search"></i>

            <input
              type="search"
              placeholder="Search by room number or name..."
              value={search}
              onChange={(
                event
              ) =>
                setSearch(
                  event.target.value
                )
              }
            />
          </div>

          <div className="ls-room-admin-filters-user">
            <select
              value={typeFilter}
              onChange={(
                event
              ) =>
                setTypeFilter(
                  event.target.value
                )
              }
            >
              <option value="all">
                All Types
              </option>

              <option value="Deluxe">
                Deluxe
              </option>

              <option value="Suite">
                Suite
              </option>

              <option value="Luxury">
                Luxury
              </option>
            </select>

            <select
              value={
                statusFilter
              }
              onChange={(
                event
              ) =>
                setStatusFilter(
                  event.target.value
                )
              }
            >
              <option value="all">
                All Status
              </option>

              <option value="available">
                Available
              </option>

              <option value="occupied">
                Occupied
              </option>

              <option value="cleaning">
                Cleaning
              </option>

              <option value="maintenance">
                Maintenance
              </option>
            </select>

            <select
              value={
                activeFilter
              }
              onChange={(
                event
              ) =>
                setActiveFilter(
                  event.target.value
                )
              }
            >
              <option value="all">
                All Inventory
              </option>

              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>
            </select>
          </div>
        </div>


        {loading ? (
          <div className="ls-room-admin-loading-user">
            <div
              className="spinner-border"
              role="status"
            ></div>

            <p>
              Loading room
              inventory...
            </p>
          </div>
        ) : filteredRooms.length ===
          0 ? (
          <div className="ls-room-admin-empty-user">
            <i className="bi bi-door-closed"></i>

            <h3>
              No rooms found
            </h3>

            <p>
              No room matches your
              current filters.
            </p>
          </div>
        ) : (
          <div className="ls-room-admin-grid-user">
            {filteredRooms.map(
              (room) => (
                <article
                  key={room._id}
                  className={`ls-room-admin-card-user ${
                    !room.isActive
                      ? 'inactive'
                      : ''
                  }`}
                >

                  {/* IMAGE */}

                  <div className="ls-room-admin-image-user">
                    {room.image ? (
                      <img
                        src={
                          room.image
                        }
                        alt={
                          room.name
                        }
                      />
                    ) : (
                      <div className="ls-room-admin-no-image-user">
                        <i className="bi bi-image"></i>
                      </div>
                    )}

                    <span className="ls-room-admin-number-user">
                      ROOM{' '}
                      {
                        room.roomNumber
                      }
                    </span>

                    {!room.isActive && (
                      <span className="ls-room-admin-inactive-user">
                        INACTIVE
                      </span>
                    )}
                  </div>


                  {/* BODY */}

                  <div className="ls-room-admin-body-user">
                    <div className="ls-room-admin-title-user">
                      <div>
                        <span>
                          {room.type}
                        </span>

                        <h3>
                          {room.name}
                        </h3>
                      </div>

                      <div>
                        <strong>
                          PKR{' '}
                          {formatPrice(
                            room.price
                          )}
                        </strong>

                        <small>
                          / NIGHT
                        </small>
                      </div>
                    </div>

                    <div className="ls-room-admin-info-user">
                      <span>
                        <i className="bi bi-people"></i>
                        {
                          room.capacity
                        }{' '}
                        Guests
                      </span>

                      <span>
                        <i className="bi bi-moon"></i>
                        {room.beds}
                      </span>

                      {room.size && (
                        <span>
                          <i className="bi bi-arrows-fullscreen"></i>
                          {
                            room.size
                          }
                        </span>
                      )}
                    </div>


                    {/* STATUS */}

                    <div className="ls-room-admin-status-row-user">
                      <label>
                        ROOM STATUS
                      </label>

                      <select
                        value={
                          room.status
                        }
                        disabled={
                          actionLoading ===
                          `status-${room._id}`
                        }
                        className={`status-${room.status}`}
                        onChange={(
                          event
                        ) =>
                          handleStatusChange(
                            room,
                            event
                              .target
                              .value
                          )
                        }
                      >
                        <option value="available">
                          Available
                        </option>

                        <option value="occupied">
                          Occupied
                        </option>

                        <option value="cleaning">
                          Cleaning
                        </option>

                        <option value="maintenance">
                          Maintenance
                        </option>
                      </select>
                    </div>


                    {/* ACTIONS */}

                    <div className="ls-room-admin-actions-user">
                      <button
                        type="button"
                        className="edit"
                        onClick={() =>
                          openEditModal(
                            room
                          )
                        }
                      >
                        <i className="bi bi-pencil"></i>
                        Edit Room
                      </button>

                      <button
                        type="button"
                        className={
                          room.isActive
                            ? 'deactivate'
                            : 'activate'
                        }
                        disabled={
                          actionLoading ===
                          `active-${room._id}`
                        }
                        onClick={() =>
                          handleActiveToggle(
                            room
                          )
                        }
                      >
                        {actionLoading ===
                        `active-${room._id}` ? (
                          <span className="spinner-border spinner-border-sm"></span>
                        ) : (
                          <i
                            className={`bi ${
                              room.isActive
                                ? 'bi-eye-slash'
                                : 'bi-eye'
                            }`}
                          ></i>
                        )}

                        {room.isActive
                          ? 'Deactivate'
                          : 'Activate'}
                      </button>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </section>


      {/* ADD / EDIT MODAL */}

      {modalOpen && (
        <div
          className="ls-room-admin-modal-backdrop-user"
          onMouseDown={(
            event
          ) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeModal()
            }
          }}
        >
          <div className="ls-room-admin-modal-user">

            <header className="ls-room-admin-modal-header-user">
              <div>
                <span>
                  {editingRoom
                    ? 'UPDATE INVENTORY'
                    : 'NEW ACCOMMODATION'}
                </span>

                <h2>
                  {editingRoom
                    ? 'Edit Room'
                    : 'Add New Room'}
                </h2>

                <p>
                  Manage room details,
                  pricing and guest
                  capacity.
                </p>
              </div>

              <button
                type="button"
                disabled={saving}
                onClick={
                  closeModal
                }
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </header>


            <form
              className="ls-room-admin-form-user"
              onSubmit={
                handleSubmit
              }
            >
              <div className="ls-room-admin-form-grid-user">

                <div className="ls-room-admin-field-user">
                  <label>
                    Room Number *
                  </label>

                  <input
                    type="text"
                    name="roomNumber"
                    placeholder="e.g. 401"
                    value={
                      formData.roomNumber
                    }
                    onChange={
                      handleChange
                    }
                  />
                </div>

                <div className="ls-room-admin-field-user">
                  <label>
                    Room Type *
                  </label>

                  <select
                    name="type"
                    value={
                      formData.type
                    }
                    onChange={
                      handleChange
                    }
                  >
                    <option value="Deluxe">
                      Deluxe
                    </option>

                    <option value="Suite">
                      Suite
                    </option>

                    <option value="Luxury">
                      Luxury
                    </option>
                  </select>
                </div>


                <div className="ls-room-admin-field-user full">
                  <label>
                    Room Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Royal Executive Suite"
                    value={
                      formData.name
                    }
                    onChange={
                      handleChange
                    }
                  />
                </div>


                <div className="ls-room-admin-field-user">
                  <label>
                    Price Per Night
                    (PKR) *
                  </label>

                  <input
                    type="number"
                    name="price"
                    min="1"
                    value={
                      formData.price
                    }
                    onChange={
                      handleChange
                    }
                  />
                </div>

                <div className="ls-room-admin-field-user">
                  <label>
                    Guest Capacity *
                  </label>

                  <input
                    type="number"
                    name="capacity"
                    min="1"
                    value={
                      formData.capacity
                    }
                    onChange={
                      handleChange
                    }
                  />
                </div>


                <div className="ls-room-admin-field-user">
                  <label>
                    Beds *
                  </label>

                  <input
                    type="text"
                    name="beds"
                    placeholder="1 King Bed"
                    value={
                      formData.beds
                    }
                    onChange={
                      handleChange
                    }
                  />
                </div>

                <div className="ls-room-admin-field-user">
                  <label>
                    Room Size
                  </label>

                  <input
                    type="text"
                    name="size"
                    placeholder="450 sq ft"
                    value={
                      formData.size
                    }
                    onChange={
                      handleChange
                    }
                  />
                </div>


                <div className="ls-room-admin-field-user full">
                  <label>
                    Image URL
                  </label>

                  <input
                    type="text"
                    name="image"
                    placeholder="https://..."
                    value={
                      formData.image
                    }
                    onChange={
                      handleChange
                    }
                  />
                </div>

                {formData.image && (
                  <div className="ls-room-admin-preview-user full">
                    <img
                      src={
                        formData.image
                      }
                      alt="Room preview"
                      onError={(
                        event
                      ) => {
                        event.currentTarget.style.display =
                          'none'
                      }}
                    />
                  </div>
                )}


                <div className="ls-room-admin-field-user full">
                  <label>
                    Amenities
                  </label>

                  <input
                    type="text"
                    name="amenities"
                    placeholder="WiFi, Smart TV, Mini Bar, Air Conditioning"
                    value={
                      formData.amenities
                    }
                    onChange={
                      handleChange
                    }
                  />

                  <small>
                    Separate each
                    amenity with a
                    comma.
                  </small>
                </div>


                <div className="ls-room-admin-field-user full">
                  <label>
                    Description *
                  </label>

                  <textarea
                    name="description"
                    rows="4"
                    placeholder="Describe the room..."
                    value={
                      formData.description
                    }
                    onChange={
                      handleChange
                    }
                  ></textarea>
                </div>
              </div>


              {formError && (
                <div className="ls-room-admin-form-error-user">
                  <i className="bi bi-exclamation-circle"></i>

                  {formError}
                </div>
              )}


              <footer className="ls-room-admin-modal-footer-user">
                <button
                  type="button"
                  className="cancel"
                  disabled={saving}
                  onClick={
                    closeModal
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span className="spinner-border spinner-border-sm"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      {editingRoom
                        ? 'Save Changes'
                        : 'Add Room'}

                      <i className="bi bi-arrow-right"></i>
                    </>
                  )}
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default RoomManagement