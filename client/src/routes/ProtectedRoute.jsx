import {
  Navigate,
  Outlet,
} from 'react-router-dom'

import {
  useAuth,
} from '../context/AuthContext'


function ProtectedRoute({
  allowedRoles,
}) {

  const {
    user,
    isAuthenticated,
    authLoading,
  } = useAuth()


  if (authLoading) {

    return (
      <div className="auth-page-loader-user">

        <div
          className="spinner-border"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>

        <p>
          Verifying your session...
        </p>

      </div>
    )
  }


  if (!isAuthenticated) {

    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }


  if (
    allowedRoles &&
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