import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  useAuth,
} from '../../context/AuthContext'

import {
  getStaff,
  createStaff,
  updateStaff,
  toggleStaffStatus,
} from '../../services/adminService'

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  role: 'receptionist',
}

function StaffManagement() {
  const { token } = useAuth()

  const [staff, setStaff] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  const [success, setSuccess] =
    useState('')

  const [search, setSearch] =
    useState('')

  const [roleFilter, setRoleFilter] =
    useState('all')

  const [statusFilter, setStatusFilter] =
    useState('all')

  const [modalOpen, setModalOpen] =
    useState(false)

  const [editingStaff, setEditingStaff] =
    useState(null)

  const [formData, setFormData] =
    useState(emptyForm)

  const [formError, setFormError] =
    useState('')

  const [saving, setSaving] =
    useState(false)

  const [statusLoadingId, setStatusLoadingId] =
    useState(null)

  const loadStaff = async () => {
    try {
      setLoading(true)
      setError('')

      const data =
        await getStaff(token)

      setStaff(
        Array.isArray(data.staff)
          ? data.staff
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
      loadStaff()
    }
  }, [token])

  useEffect(() => {
    if (!modalOpen) {
      return
    }

    const handleEscape = (
      event
    ) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    document.body.style.overflow =
      'hidden'

    window.addEventListener(
      'keydown',
      handleEscape
    )

    return () => {
      document.body.style.overflow =
        ''

      window.removeEventListener(
        'keydown',
        handleEscape
      )
    }
  }, [modalOpen])

  const filteredStaff =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase()

      return staff.filter(
        (member) => {
          const fullName =
            `${member.firstName} ${member.lastName}`
              .toLowerCase()

          const matchesSearch =
            !query ||
            fullName.includes(
              query
            ) ||
            member.email
              ?.toLowerCase()
              .includes(query) ||
            member.phone
              ?.toLowerCase()
              .includes(query)

          const matchesRole =
            roleFilter === 'all' ||
            member.role ===
              roleFilter

          const matchesStatus =
            statusFilter === 'all' ||
            (statusFilter ===
              'active' &&
              member.isActive) ||
            (statusFilter ===
              'inactive' &&
              !member.isActive)

          return (
            matchesSearch &&
            matchesRole &&
            matchesStatus
          )
        }
      )
    }, [
      staff,
      search,
      roleFilter,
      statusFilter,
    ])

  const statistics = useMemo(
    () => ({
      total: staff.length,

      managers:
        staff.filter(
          (member) =>
            member.role ===
            'manager'
        ).length,

      receptionists:
        staff.filter(
          (member) =>
            member.role ===
            'receptionist'
        ).length,

      housekeeping:
        staff.filter(
          (member) =>
            member.role ===
            'housekeeping'
        ).length,

      active:
        staff.filter(
          (member) =>
            member.isActive
        ).length,
    }),
    [staff]
  )

  const openCreateModal = () => {
    setEditingStaff(null)

    setFormData({
      ...emptyForm,
    })

    setFormError('')
    setModalOpen(true)
  }

  const openEditModal = (
    member
  ) => {
    setEditingStaff(member)

    setFormData({
      firstName:
        member.firstName || '',

      lastName:
        member.lastName || '',

      email:
        member.email || '',

      phone:
        member.phone || '',

      password: '',

      role:
        member.role ||
        'receptionist',
    })

    setFormError('')
    setModalOpen(true)
  }

  const closeModal = () => {
    if (saving) {
      return
    }

    setModalOpen(false)
    setEditingStaff(null)
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
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.role
    ) {
      return (
        'Please complete all required fields.'
      )
    }

    if (
      !editingStaff &&
      formData.password.length < 6
    ) {
      return (
        'Password must be at least 6 characters.'
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

      try {
        setSaving(true)

        if (editingStaff) {
          await updateStaff(
            token,
            editingStaff._id ||
              editingStaff.id,
            {
              firstName:
                formData.firstName,
              lastName:
                formData.lastName,
              email:
                formData.email,
              phone:
                formData.phone,
              role:
                formData.role,
            }
          )

          setSuccess(
            'Staff member updated successfully.'
          )
        } else {
          await createStaff(
            token,
            formData
          )

          setSuccess(
            'New staff member created successfully.'
          )
        }

        setModalOpen(false)
        setEditingStaff(null)

        await loadStaff()
      } catch (error) {
        setFormError(
          error.message
        )
      } finally {
        setSaving(false)
      }
    }

  const handleStatusToggle =
    async (member) => {
      const id =
        member._id ||
        member.id

      const action =
        member.isActive
          ? 'deactivate'
          : 'activate'

      const confirmed =
        window.confirm(
          `Are you sure you want to ${action} ${member.firstName} ${member.lastName}'s account?`
        )

      if (!confirmed) {
        return
      }

      try {
        setStatusLoadingId(id)
        setError('')
        setSuccess('')

        const data =
          await toggleStaffStatus(
            token,
            id
          )

        setStaff(
          (previous) =>
            previous.map(
              (item) =>
                (item._id ||
                  item.id) ===
                id
                  ? {
                      ...item,
                      isActive:
                        data.staff
                          .isActive,
                    }
                  : item
            )
        )

        setSuccess(
          data.message
        )
      } catch (error) {
        setError(error.message)
      } finally {
        setStatusLoadingId(
          null
        )
      }
    }

  const roleLabel = (
    role
  ) => {
    const labels = {
      manager:
        'Manager',

      receptionist:
        'Receptionist',

      housekeeping:
        'Housekeeping',
    }

    return labels[role] || role
  }

  const formatDate = (
    date
  ) => {
    if (!date) {
      return '-'
    }

    return new Intl.DateTimeFormat(
      'en-GB',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }
    ).format(
      new Date(date)
    )
  }

  return (
    <div className="ls-staff-page-user">
      <section className="ls-staff-header-user">
        <div>
          <span className="ls-staff-eyebrow-user">
            USER MANAGEMENT
          </span>

          <h1>
            Staff
            <em> Management</em>
          </h1>

          <p>
            Create and manage hotel
            staff accounts, roles and
            system access.
          </p>
        </div>

        <button
          type="button"
          className="ls-staff-add-user"
          onClick={
            openCreateModal
          }
        >
          <i className="bi bi-plus-lg"></i>

          <span>
            Add Staff Member
          </span>
        </button>
      </section>

      {success && (
        <div className="ls-staff-message-user success">
          <i className="bi bi-check-circle"></i>

          <span>
            {success}
          </span>

          <button
            type="button"
            onClick={() =>
              setSuccess('')
            }
          >
            <i className="bi bi-x"></i>
          </button>
        </div>
      )}

      {error && (
        <div className="ls-staff-message-user error">
          <i className="bi bi-exclamation-circle"></i>

          <span>
            {error}
          </span>

          <button
            type="button"
            onClick={() =>
              setError('')
            }
          >
            <i className="bi bi-x"></i>
          </button>
        </div>
      )}

      <section className="ls-staff-stat-grid-user">
        <article>
          <div>
            <i className="bi bi-people"></i>
          </div>

          <span>
            <small>
              TOTAL STAFF
            </small>

            <strong>
              {statistics.total}
            </strong>
          </span>
        </article>

        <article>
          <div>
            <i className="bi bi-person-workspace"></i>
          </div>

          <span>
            <small>
              MANAGERS
            </small>

            <strong>
              {statistics.managers}
            </strong>
          </span>
        </article>

        <article>
          <div>
            <i className="bi bi-person-badge"></i>
          </div>

          <span>
            <small>
              RECEPTIONISTS
            </small>

            <strong>
              {statistics.receptionists}
            </strong>
          </span>
        </article>

        <article>
          <div>
            <i className="bi bi-stars"></i>
          </div>

          <span>
            <small>
              HOUSEKEEPING
            </small>

            <strong>
              {statistics.housekeeping}
            </strong>
          </span>
        </article>

        <article>
          <div>
            <i className="bi bi-check-circle"></i>
          </div>

          <span>
            <small>
              ACTIVE
            </small>

            <strong>
              {statistics.active}
            </strong>
          </span>
        </article>
      </section>

      <section className="ls-staff-panel-user">
        <div className="ls-staff-toolbar-user">
          <div className="ls-staff-search-user">
            <i className="bi bi-search"></i>

            <input
              type="search"
              placeholder="Search staff by name, email or phone..."
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

          <div className="ls-staff-filters-user">
            <select
              value={
                roleFilter
              }
              onChange={(
                event
              ) =>
                setRoleFilter(
                  event.target.value
                )
              }
            >
              <option value="all">
                All Roles
              </option>

              <option value="manager">
                Manager
              </option>

              <option value="receptionist">
                Receptionist
              </option>

              <option value="housekeeping">
                Housekeeping
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

              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>
            </select>
          </div>
        </div>

        <div className="ls-staff-table-heading-user">
          <div>
            <span>
              STAFF DIRECTORY
            </span>

            <h2>
              Team Members
            </h2>
          </div>

          <p>
            Showing{' '}
            <strong>
              {
                filteredStaff.length
              }
            </strong>{' '}
            of{' '}
            <strong>
              {staff.length}
            </strong>
          </p>
        </div>

        {loading ? (
          <div className="ls-staff-loading-user">
            <div
              className="spinner-border"
              role="status"
            />

            <p>
              Loading staff
              directory...
            </p>
          </div>
        ) : filteredStaff.length ===
          0 ? (
          <div className="ls-staff-empty-user">
            <div>
              <i className="bi bi-person-x"></i>
            </div>

            <h3>
              No staff found
            </h3>

            <p>
              No staff members match
              the current filters.
            </p>
          </div>
        ) : (
          <div className="ls-staff-table-wrapper-user">
            <table className="ls-staff-table-user">
              <thead>
                <tr>
                  <th>
                    Staff Member
                  </th>

                  <th>
                    Contact
                  </th>

                  <th>
                    Role
                  </th>

                  <th>
                    Joined
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredStaff.map(
                  (member) => {
                    const id =
                      member._id ||
                      member.id

                    return (
                      <tr key={id}>
                        <td>
                          <div className="ls-staff-person-user">
                            <div className="ls-staff-avatar-user">
                              {member.firstName?.[0]?.toUpperCase()}

                              {member.lastName?.[0]?.toUpperCase()}
                            </div>

                            <div>
                              <strong>
                                {
                                  member.firstName
                                }{' '}
                                {
                                  member.lastName
                                }
                              </strong>

                              <span>
                                ID:{' '}
                                {String(
                                  id
                                ).slice(
                                  -6
                                )}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="ls-staff-contact-user">
                            <span>
                              <i className="bi bi-envelope"></i>
                              {
                                member.email
                              }
                            </span>

                            <span>
                              <i className="bi bi-telephone"></i>
                              {
                                member.phone
                              }
                            </span>
                          </div>
                        </td>

                        <td>
                          <span
                            className={`ls-staff-role-user role-${member.role}`}
                          >
                            {roleLabel(
                              member.role
                            )}
                          </span>
                        </td>

                        <td>
                          {formatDate(
                            member.createdAt
                          )}
                        </td>

                        <td>
                          <span
                            className={`ls-staff-status-user ${
                              member.isActive
                                ? 'active'
                                : 'inactive'
                            }`}
                          >
                            <i className="bi bi-circle-fill"></i>

                            {member.isActive
                              ? 'Active'
                              : 'Inactive'}
                          </span>
                        </td>

                        <td>
                          <div className="ls-staff-actions-user">
                            <button
                              type="button"
                              className="edit"
                              title="Edit staff"
                              onClick={() =>
                                openEditModal(
                                  member
                                )
                              }
                            >
                              <i className="bi bi-pencil"></i>
                            </button>

                            <button
                              type="button"
                              className={
                                member.isActive
                                  ? 'deactivate'
                                  : 'activate'
                              }
                              title={
                                member.isActive
                                  ? 'Deactivate account'
                                  : 'Activate account'
                              }
                              disabled={
                                statusLoadingId ===
                                id
                              }
                              onClick={() =>
                                handleStatusToggle(
                                  member
                                )
                              }
                            >
                              {statusLoadingId ===
                              id ? (
                                <span className="spinner-border spinner-border-sm"></span>
                              ) : (
                                <i
                                  className={`bi ${
                                    member.isActive
                                      ? 'bi-person-x'
                                      : 'bi-person-check'
                                  }`}
                                ></i>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  }
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {modalOpen && (
        <div
          className="ls-staff-modal-backdrop-user"
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
          <div className="ls-staff-modal-user">
            <div className="ls-staff-modal-header-user">
              <div>
                <span>
                  {editingStaff
                    ? 'UPDATE ACCOUNT'
                    : 'NEW TEAM MEMBER'}
                </span>

                <h2>
                  {editingStaff
                    ? 'Edit Staff Member'
                    : 'Add Staff Member'}
                </h2>

                <p>
                  {editingStaff
                    ? 'Update staff information and access role.'
                    : 'Create a secure account for a hotel staff member.'}
                </p>
              </div>

              <button
                type="button"
                onClick={
                  closeModal
                }
                disabled={saving}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <form
              onSubmit={
                handleSubmit
              }
              className="ls-staff-form-user"
            >
              <div className="ls-staff-form-grid-user">
                <div className="ls-staff-field-user">
                  <label>
                    First Name
                    <span>*</span>
                  </label>

                  <div>
                    <i className="bi bi-person"></i>

                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={
                        formData.firstName
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />
                  </div>
                </div>

                <div className="ls-staff-field-user">
                  <label>
                    Last Name
                    <span>*</span>
                  </label>

                  <div>
                    <i className="bi bi-person"></i>

                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={
                        formData.lastName
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />
                  </div>
                </div>

                <div className="ls-staff-field-user full">
                  <label>
                    Email Address
                    <span>*</span>
                  </label>

                  <div>
                    <i className="bi bi-envelope"></i>

                    <input
                      type="email"
                      name="email"
                      placeholder="staff@luxurystay.com"
                      value={
                        formData.email
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />
                  </div>
                </div>

                <div className="ls-staff-field-user">
                  <label>
                    Phone Number
                    <span>*</span>
                  </label>

                  <div>
                    <i className="bi bi-telephone"></i>

                    <input
                      type="text"
                      name="phone"
                      placeholder="+92 300 0000000"
                      value={
                        formData.phone
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />
                  </div>
                </div>

                <div className="ls-staff-field-user">
                  <label>
                    Staff Role
                    <span>*</span>
                  </label>

                  <div>
                    <i className="bi bi-person-badge"></i>

                    <select
                      name="role"
                      value={
                        formData.role
                      }
                      onChange={
                        handleChange
                      }
                    >
                      <option value="manager">
                        Manager
                      </option>

                      <option value="receptionist">
                        Receptionist
                      </option>

                      <option value="housekeeping">
                        Housekeeping
                      </option>
                    </select>
                  </div>
                </div>

                {!editingStaff && (
                  <div className="ls-staff-field-user full">
                    <label>
                      Temporary Password
                      <span>*</span>
                    </label>

                    <div>
                      <i className="bi bi-lock"></i>

                      <input
                        type="password"
                        name="password"
                        placeholder="Minimum 6 characters"
                        value={
                          formData.password
                        }
                        onChange={
                          handleChange
                        }
                        minLength="6"
                        required
                      />
                    </div>

                    <small>
                      Staff will use
                      this password to
                      sign in to their
                      portal.
                    </small>
                  </div>
                )}
              </div>

              {formError && (
                <div className="ls-staff-form-error-user">
                  <i className="bi bi-exclamation-circle"></i>

                  <span>
                    {formError}
                  </span>
                </div>
              )}

              <div className="ls-staff-modal-footer-user">
                <button
                  type="button"
                  className="cancel"
                  onClick={
                    closeModal
                  }
                  disabled={saving}
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
                      <span>
                        {editingStaff
                          ? 'Save Changes'
                          : 'Create Staff'}
                      </span>

                      <i className="bi bi-arrow-right"></i>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default StaffManagement