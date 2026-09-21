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

import AdminDashboard from '../pages/admin/AdminDashboard'

import StaffManagement from '../pages/admin/StaffManagement'

import StaffDashboard from '../pages/staff/StaffDashboard'

import RoomManagement from '../pages/admin/RoomManagement'


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

      <Route
        element={
          <ProtectedRoute
            allowedRoles={['admin']}
          />
        }
      >
        <Route
          element={<DashboardLayout />}
        >
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/staff"
            element={
              <StaffManagement />
            }
          />
          <Route
            path="/admin/rooms"
            element={<RoomManagement />}
          />
        </Route>
      </Route>

      {/* =========================
    MANAGER
========================= */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={[
              'manager',
            ]}
          />
        }
      >
        <Route
          element={
            <DashboardLayout />
          }
        >
          <Route
            path="/manager/dashboard"
            element={
              <StaffDashboard />
            }
          />
        </Route>
      </Route>


      {/* =========================
    RECEPTIONIST
========================= */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={[
              'receptionist',
            ]}
          />
        }
      >
        <Route
          element={
            <DashboardLayout />
          }
        >
          <Route
            path="/receptionist/dashboard"
            element={
              <StaffDashboard />
            }
          />
        </Route>
      </Route>


      {/* =========================
    HOUSEKEEPING
========================= */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={[
              'housekeeping',
            ]}
          />
        }
      >
        <Route
          element={
            <DashboardLayout />
          }
        >
          <Route
            path="/housekeeping/dashboard"
            element={
              <StaffDashboard />
            }
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