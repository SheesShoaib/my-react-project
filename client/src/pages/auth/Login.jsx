import {
  useState,
} from 'react'

import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import {
  useAuth,
} from '../../context/AuthContext'

function Login() {
  const navigate =
    useNavigate()

  const location =
    useLocation()

  const { login } =
    useAuth()

  const [formData, setFormData] =
    useState({
      email: '',
      password: '',
      remember: true,
    })

  const [showPassword, setShowPassword] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === 'checkbox'
          ? checked
          : value,
    }))

    setError('')
  }

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault()

    if (
      !formData.email.trim() ||
      !formData.password
    ) {
      setError(
        'Please enter your email and password.'
      )
      return
    }

    try {
      setLoading(true)
      setError('')

      const data = await login(
        {
          email:
            formData.email.trim(),
          password:
            formData.password,
        },
        formData.remember
      )

      const role =
        data.user.role

      const requestedPath =
        location.state?.from

      if (requestedPath) {
        navigate(
          requestedPath,
          {
            replace: true,
          }
        )
        return
      }

      switch (role) {
        case 'admin':
          navigate(
            '/admin/dashboard',
            {
              replace: true,
            }
          )
          break

        case 'manager':
          navigate(
            '/manager/dashboard',
            {
              replace: true,
            }
          )
          break

        case 'receptionist':
          navigate(
            '/receptionist/dashboard',
            {
              replace: true,
            }
          )
          break

        case 'housekeeping':
          navigate(
            '/housekeeping/dashboard',
            {
              replace: true,
            }
          )
          break

        default:
          navigate(
            '/guest/dashboard',
            {
              replace: true,
            }
          )
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-page-user">
      <div className="container">
        <div className="auth-shell-user">
          <div className="auth-visual-user">
            <div className="auth-visual-overlay-user"></div>

            <div className="auth-visual-content-user">
              <span>
                LUXURYSTAY HOSPITALITY
              </span>

              <h1>
                Welcome
                <br />
                Back.
              </h1>

              <p>
                Sign in to manage your
                reservations and experience
                personalized luxury
                hospitality.
              </p>

              <div className="auth-benefits-user">
                <div>
                  <i className="bi bi-check-circle"></i>
                  Manage reservations
                </div>

                <div>
                  <i className="bi bi-check-circle"></i>
                  Access guest services
                </div>

                <div>
                  <i className="bi bi-check-circle"></i>
                  View booking history
                </div>
              </div>
            </div>
          </div>

          <div className="auth-form-side-user">
            <div className="auth-form-user">
              <span className="auth-eyebrow-user">
                GUEST ACCESS
              </span>

              <h2>Sign In</h2>

              <p className="auth-subtitle-user">
                Enter your credentials to
                continue.
              </p>

              {error && (
                <div className="auth-alert-user">
                  <i className="bi bi-exclamation-circle"></i>
                  <span>{error}</span>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
              >
                <div className="auth-field-user">
                  <label>
                    Email Address
                  </label>

                  <div className="auth-input-user">
                    <i className="bi bi-envelope"></i>

                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={
                        formData.email
                      }
                      onChange={
                        handleChange
                      }
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="auth-field-user">
                  <label>Password</label>

                  <div className="auth-input-user">
                    <i className="bi bi-lock"></i>

                    <input
                      type={
                        showPassword
                          ? 'text'
                          : 'password'
                      }
                      name="password"
                      placeholder="Enter password"
                      value={
                        formData.password
                      }
                      onChange={
                        handleChange
                      }
                      autoComplete="current-password"
                    />

                    <button
                      type="button"
                      className="auth-password-toggle-user"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      <i
                        className={
                          showPassword
                            ? 'bi bi-eye-slash'
                            : 'bi bi-eye'
                        }
                      ></i>
                    </button>
                  </div>
                </div>

                <div className="auth-options-user">
                  <label className="auth-check-user">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={
                        formData.remember
                      }
                      onChange={
                        handleChange
                      }
                    />

                    <span>
                      Remember me
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="auth-submit-user"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm"></span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <i className="bi bi-arrow-right"></i>
                    </>
                  )}
                </button>
              </form>

              <div className="auth-switch-user">
                Don't have an account?{' '}
                <Link to="/register">
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login