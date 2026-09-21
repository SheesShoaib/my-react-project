import {
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom'

import {
  useAuth,
} from '../context/AuthContext'

function ProtectedRoute({
  allowedRoles = [],
}) {
  const {
    user,
    token,
    loading,
    isAuthenticated,
  } = useAuth()

  const location =
    useLocation()

  /*
    Important:
    Refresh ke waqt AuthContext
    /api/auth/me verify kar raha hota hai.

    Is waqt login page par redirect
    nahi karna.
  */

  if (loading) {
    return (
      <div className="auth-route-loading-user">
        <div
          className="spinner-border"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>

        <p>
          Restoring your session...
        </p>
      </div>
    )
  }

  if (
    !token ||
    !isAuthenticated ||
    !user
  ) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from:
            location.pathname,
        }}
      />
    )
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(
      user.role
    )
  ) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    )
  }

  return <Outlet />
}

export default ProtectedRoute