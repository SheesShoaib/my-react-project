import {
  useState,
} from 'react'

import {
  NavLink,
  Outlet,
  useNavigate,
} from 'react-router-dom'

import {
  useAuth,
} from '../context/AuthContext'

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false)

  const {
    user,
    logout,
  } = useAuth()

  const navigate =
    useNavigate()

  const role =
    user?.role || 'guest'

  const navigation = {
    admin: [
      {
        label: 'Overview',
        path: '/admin/dashboard',
        icon: 'bi-grid',
      },
      {
        label: 'Staff Management',
        path: '/admin/staff',
        icon: 'bi-person-badge',
      },
      {
        label: 'Guests',
        path: '/admin/guests',
        icon: 'bi-people',
      },
      {
        label: 'Rooms',
        path: '/admin/rooms',
        icon: 'bi-door-open',
      },
      {
        label: 'Reservations',
        path: '/admin/reservations',
        icon: 'bi-calendar-check',
      },
      {
        label: 'Reports',
        path: '/admin/reports',
        icon: 'bi-bar-chart',
      },
      {
        label: 'Settings',
        path: '/admin/settings',
        icon: 'bi-gear',
      },
    ],

    manager: [
      {
        label: 'Overview',
        path: '/manager/dashboard',
        icon: 'bi-grid',
      },
      {
        label: 'Rooms',
        path: '/manager/rooms',
        icon: 'bi-door-open',
      },
      {
        label: 'Reservations',
        path: '/manager/reservations',
        icon: 'bi-calendar-check',
      },
      {
        label: 'Reports',
        path: '/manager/reports',
        icon: 'bi-bar-chart',
      },
    ],

    receptionist: [
      {
        label: 'Overview',
        path:
          '/receptionist/dashboard',
        icon: 'bi-grid',
      },
      {
        label: 'Reservations',
        path:
          '/receptionist/reservations',
        icon: 'bi-calendar-check',
      },
      {
        label: 'Check In / Out',
        path:
          '/receptionist/checkin',
        icon: 'bi-box-arrow-in-right',
      },
      {
        label: 'Guests',
        path:
          '/receptionist/guests',
        icon: 'bi-people',
      },
    ],

    housekeeping: [
      {
        label: 'Overview',
        path:
          '/housekeeping/dashboard',
        icon: 'bi-grid',
      },
      {
        label: 'Room Status',
        path:
          '/housekeeping/rooms',
        icon: 'bi-door-open',
      },
      {
        label: 'Cleaning Tasks',
        path:
          '/housekeeping/tasks',
        icon: 'bi-check2-square',
      },
      {
        label: 'Maintenance',
        path:
          '/housekeeping/maintenance',
        icon: 'bi-tools',
      },
    ],

    guest: [
      {
        label: 'Dashboard',
        path: '/guest/dashboard',
        icon: 'bi-grid',
      },
      {
        label: 'My Reservations',
        path:
          '/guest/reservations',
        icon: 'bi-calendar-check',
      },
      {
        label: 'Guest Services',
        path: '/guest/services',
        icon: 'bi-bell',
      },
      {
        label: 'Stay History',
        path: '/guest/history',
        icon: 'bi-clock-history',
      },
      {
        label: 'My Profile',
        path: '/guest/profile',
        icon: 'bi-person',
      },
    ],
  }

  const roleNames = {
    admin: 'Administrator',
    manager: 'Hotel Manager',
    receptionist: 'Receptionist',
    housekeeping: 'Housekeeping',
    guest: 'Guest',
  }

  const menuItems =
    navigation[role] ||
    navigation.guest

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="ls-dashboard-layout-user">
      <aside
        className={`ls-dashboard-sidebar-user ${
          sidebarOpen
            ? 'sidebar-open-user'
            : ''
        }`}
      >
        <div className="ls-dashboard-brand-user">
          <NavLink
            to="/"
            onClick={closeSidebar}
          >
            <div className="ls-dashboard-brand-mark-user">
              LS
            </div>

            <div>
              <strong>
                LuxuryStay
              </strong>

              <span>
                HOSPITALITY
              </span>
            </div>
          </NavLink>

          <button
            type="button"
            className="ls-dashboard-mobile-close-user"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="ls-dashboard-user-card-user">
          <div className="ls-dashboard-avatar-user">
            {user?.firstName?.[0]
              ?.toUpperCase() ||
              'U'}

            {user?.lastName?.[0]
              ?.toUpperCase() ||
              ''}
          </div>

          <div>
            <strong>
              {user?.firstName}{' '}
              {user?.lastName}
            </strong>

            <span>
              {roleNames[role] ||
                role}
            </span>
          </div>
        </div>

        <div className="ls-dashboard-menu-label-user">
          <span>
            MAIN MENU
          </span>
        </div>

        <nav className="ls-dashboard-nav-user">
          {menuItems.map(
            (item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={
                  closeSidebar
                }
                className={({
                  isActive,
                }) =>
                  `ls-dashboard-nav-link-user ${
                    isActive
                      ? 'active'
                      : ''
                  }`
                }
              >
                <i
                  className={`bi ${item.icon}`}
                ></i>

                <span>
                  {item.label}
                </span>

                <i className="bi bi-chevron-right ls-dashboard-nav-arrow-user"></i>
              </NavLink>
            )
          )}
        </nav>

        <div className="ls-dashboard-sidebar-bottom-user">
          <NavLink
            to="/"
            className="ls-dashboard-hotel-link-user"
          >
            <i className="bi bi-globe2"></i>

            <span>
              Hotel Website
            </span>
          </NavLink>

          <button
            type="button"
            onClick={
              handleLogout
            }
            className="ls-dashboard-logout-user"
          >
            <i className="bi bi-box-arrow-left"></i>

            <span>
              Sign Out
            </span>
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="ls-dashboard-overlay-user"
          onClick={closeSidebar}
        ></button>
      )}

      <div className="ls-dashboard-main-user">
        <header className="ls-dashboard-topbar-user">
          <div className="ls-dashboard-topbar-left-user">
            <button
              type="button"
              className="ls-dashboard-menu-button-user"
              onClick={() =>
                setSidebarOpen(
                  true
                )
              }
              aria-label="Open sidebar"
            >
              <i className="bi bi-list"></i>
            </button>

            <div>
              <span>
                LUXURYSTAY
              </span>

              <strong>
                {roleNames[role]}
                {' '}Portal
              </strong>
            </div>
          </div>

          <div className="ls-dashboard-topbar-right-user">
            <button
              type="button"
              className="ls-dashboard-notification-user"
              aria-label="Notifications"
            >
              <i className="bi bi-bell"></i>

              <span></span>
            </button>

            <div className="ls-dashboard-topbar-profile-user">
              <div>
                {user?.firstName?.[0]
                  ?.toUpperCase() ||
                  'U'}
              </div>

              <span>
                <strong>
                  {user?.firstName ||
                    'User'}
                </strong>

                <small>
                  {roleNames[role]}
                </small>
              </span>
            </div>
          </div>
        </header>

        <main className="ls-dashboard-content-user">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout