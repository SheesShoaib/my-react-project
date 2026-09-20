import { useState } from 'react'
import {
  Outlet,
  NavLink,
  useNavigate,
} from 'react-router-dom'

import {
  useAuth,
} from '../context/AuthContext'

function DashboardLayout() {
  const navigate = useNavigate()

  const {
    user,
    logout,
  } = useAuth()

  const [sidebarOpen, setSidebarOpen] =
    useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const guestLinks = [
    {
      name: 'Dashboard',
      icon: 'bi-grid',
      path: '/guest/dashboard',
    },
    {
      name: 'My Reservations',
      icon: 'bi-calendar-check',
      path: '/guest/reservations',
    },
    {
      name: 'Guest Services',
      icon: 'bi-bell',
      path: '/guest/services',
    },
    {
      name: 'Stay History',
      icon: 'bi-clock-history',
      path: '/guest/history',
    },
    {
      name: 'My Profile',
      icon: 'bi-person',
      path: '/guest/profile',
    },
  ]

  const links =
    user?.role === 'guest'
      ? guestLinks
      : []

  return (
    <div className="dashboard-layout-user">

      {sidebarOpen && (
        <div
          className="dashboard-overlay-user"
          onClick={() =>
            setSidebarOpen(false)
          }
        ></div>
      )}

      <aside
        className={`dashboard-sidebar-user ${
          sidebarOpen
            ? 'dashboard-sidebar-open-user'
            : ''
        }`}
      >
        <div className="dashboard-brand-user">
          <div className="dashboard-brand-icon-user">
            <i className="bi bi-buildings"></i>
          </div>

          <div>
            <strong>LuxuryStay</strong>
            <span>Hospitality</span>
          </div>

          <button
            type="button"
            className="dashboard-close-user d-lg-none"
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="dashboard-user-mini-user">
          <div className="dashboard-avatar-user">
            {user?.firstName
              ?.charAt(0)
              .toUpperCase()}

            {user?.lastName
              ?.charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <strong>
              {user?.firstName}{' '}
              {user?.lastName}
            </strong>

            <span>
              {user?.role}
            </span>
          </div>
        </div>

        <div className="dashboard-menu-label-user">
          MENU
        </div>

        <nav className="dashboard-nav-user">
          {links.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={
                item.path ===
                '/guest/dashboard'
              }
              onClick={() =>
                setSidebarOpen(false)
              }
              className={({
                isActive,
              }) =>
                `dashboard-nav-link-user ${
                  isActive
                    ? 'dashboard-nav-active-user'
                    : ''
                }`
              }
            >
              <i
                className={`bi ${item.icon}`}
              ></i>

              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="dashboard-sidebar-bottom-user">
          <button
            type="button"
            onClick={() =>
              navigate('/')
            }
            className="dashboard-bottom-link-user"
          >
            <i className="bi bi-house"></i>
            <span>Hotel Website</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="dashboard-bottom-link-user dashboard-logout-user"
          >
            <i className="bi bi-box-arrow-right"></i>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <div className="dashboard-main-user">

        <header className="dashboard-topbar-user">

          <div className="dashboard-topbar-left-user">
            <button
              type="button"
              className="dashboard-menu-button-user d-lg-none"
              onClick={() =>
                setSidebarOpen(true)
              }
            >
              <i className="bi bi-list"></i>
            </button>

            <div>
              <span>
                LUXURYSTAY PORTAL
              </span>

              <strong>
                Guest Account
              </strong>
            </div>
          </div>

          <div className="dashboard-topbar-actions-user">

            <button
              type="button"
              className="dashboard-icon-button-user"
              aria-label="Notifications"
            >
              <i className="bi bi-bell"></i>
              <span></span>
            </button>

            <div className="dashboard-topbar-profile-user">
              <div className="dashboard-topbar-avatar-user">
                {user?.firstName
                  ?.charAt(0)
                  .toUpperCase()}
              </div>

              <div className="d-none d-md-block">
                <strong>
                  {user?.firstName}{' '}
                  {user?.lastName}
                </strong>

                <span>
                  {user?.email}
                </span>
              </div>
            </div>

          </div>

        </header>

        <main className="dashboard-content-user">
          <Outlet />
        </main>

      </div>
    </div>
  )
}

export default DashboardLayout