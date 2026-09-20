import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

// Layouts
import PublicLayout from '../layouts/PublicLayout'
import DashboardLayout from '../layouts/DashboardLayout'

// Route Protection
import ProtectedRoute from './ProtectedRoute'

// Public Pages
import Home from '../pages/Home'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Unauthorized from '../pages/Unauthorized'

// Guest Pages
import GuestDashboard from '../pages/guest/GuestDashboard'
import MyReservations from '../pages/guest/MyReservations'


function AppRoutes() {
  return (
    <Routes>

      {/* =========================================
          PUBLIC ROUTES
      ========================================== */}

      <Route element={<PublicLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Route>


      {/* =========================================
          GUEST PROTECTED ROUTES
      ========================================== */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={['guest']}
          />
        }
      >

        <Route
          element={<DashboardLayout />}
        >

          <Route
            path="/guest/dashboard"
            element={<GuestDashboard />}
          />

          <Route
            path="/guest/reservations"
            element={<MyReservations />}
          />

        </Route>

      </Route>


      {/* =========================================
          UNAUTHORIZED
      ========================================== */}

      <Route
        path="/unauthorized"
        element={<Unauthorized />}
      />


      {/* =========================================
          404 / UNKNOWN ROUTES
      ========================================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  )
}

export default AppRoutes