import { useState } from 'react'

import {
  Link,
  useNavigate,
} from 'react-router-dom'

import {
  loginUser,
} from '../../services/authService'

import {
  useAuth,
} from '../../context/AuthContext'



function Login() {
  const navigate = useNavigate()

  // ✅ Hook yahan call hoga
  const { login } = useAuth()

  const [formData, setFormData] =
    useState({
      email: '',
      password: '',
    })

  const [showPassword, setShowPassword] =
    useState(false)

  const [rememberMe, setRememberMe] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const [success, setSuccess] =
    useState('')




  // ========================================
  // HANDLE INPUT
  // ========================================

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setError('')
    setSuccess('')
  }


  // ========================================
  // LOGIN
  // ========================================

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setSuccess('')

    const {
      email,
      password,
    } = formData

    if (!email.trim() || !password) {
      setError(
        'Please enter your email and password.'
      )
      return
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(email)) {
      setError(
        'Please enter a valid email address.'
      )
      return
    }

    try {
      setLoading(true)

      const data = await loginUser({
        email:
          email.trim().toLowerCase(),
        password,
      })

      // ✅ useAuth() nahi,
      // upar se mila hua login function use hoga
      login(
        data.user,
        data.token,
        rememberMe
      )

      setSuccess(
        `Welcome back, ${data.user.firstName}!`
      )

      setTimeout(() => {
        switch (data.user.role) {
          case 'admin':
            navigate('/admin/dashboard')
            break

          case 'manager':
            navigate('/manager/dashboard')
            break

          case 'receptionist':
            navigate(
              '/receptionist/dashboard'
            )
            break

          case 'housekeeping':
            navigate(
              '/housekeeping/dashboard'
            )
            break

          default:
            navigate('/guest/dashboard')
        }
      }, 1000)

    } catch (error) {
      setError(
        error.message ||
        'Login failed.'
      )
    } finally {
      setLoading(false)
    }
  }


  return (
    <section className="auth-section-user">

      <div className="container">

        <div className="auth-wrapper-user">

          <div className="row g-0">


            {/* =========================
                LEFT IMAGE
            ========================== */}

            <div className="col-lg-6 d-none d-lg-block">

              <div className="auth-visual-user auth-login-visual-user">

                <div className="auth-visual-overlay-user"></div>

                <div className="auth-visual-content-user">

                  <div>

                    <span>
                      WELCOME BACK
                    </span>

                    <h1>
                      Your Exceptional
                      <br />
                      Stay Awaits.
                    </h1>

                    <p>
                      Sign in to manage your
                      reservations, guest
                      preferences and LuxuryStay
                      experiences.
                    </p>

                  </div>


                  <div className="auth-security-user">

                    <i className="bi bi-shield-check"></i>

                    <div>

                      <strong>
                        Secure Access
                      </strong>

                      <small>
                        Your information is
                        handled securely.
                      </small>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* =========================
                LOGIN FORM
            ========================== */}

            <div className="col-lg-6">

              <div className="auth-form-side-user">

                <div className="auth-form-header-user">

                  <span>
                    MEMBER ACCESS
                  </span>

                  <h2>
                    Welcome Back
                  </h2>

                  <p>
                    Enter your credentials
                    to access your LuxuryStay
                    account.
                  </p>

                </div>


                {/* ERROR */}

                {error && (

                  <div className="auth-alert-user">

                    <i className="bi bi-exclamation-circle"></i>

                    <span>
                      {error}
                    </span>

                  </div>

                )}


                {/* SUCCESS */}

                {success && (

                  <div className="auth-success-user">

                    <i className="bi bi-check-circle"></i>

                    <span>
                      {success}
                    </span>

                  </div>

                )}


                <form
                  onSubmit={handleSubmit}
                >


                  {/* EMAIL */}

                  <div className="auth-field-user">

                    <label htmlFor="loginEmail">
                      Email Address
                    </label>

                    <div className="auth-input-wrapper-user">

                      <i className="bi bi-envelope"></i>

                      <input
                        id="loginEmail"
                        type="email"
                        name="email"
                        value={
                          formData.email
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="you@example.com"
                        autoComplete="email"
                        disabled={loading}
                      />

                    </div>

                  </div>


                  {/* PASSWORD */}

                  <div className="auth-field-user">

                    <div className="auth-label-row-user">

                      <label htmlFor="loginPassword">
                        Password
                      </label>

                      <button
                        type="button"
                        className="auth-text-button-user"
                      >
                        Forgot Password?
                      </button>

                    </div>


                    <div className="auth-input-wrapper-user">

                      <i className="bi bi-lock"></i>

                      <input
                        id="loginPassword"
                        type={
                          showPassword
                            ? 'text'
                            : 'password'
                        }
                        name="password"
                        value={
                          formData.password
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        disabled={loading}
                      />


                      <button
                        type="button"
                        className="auth-password-toggle-user"
                        onClick={() =>
                          setShowPassword(
                            (previous) =>
                              !previous
                          )
                        }
                        disabled={loading}
                        aria-label={
                          showPassword
                            ? 'Hide password'
                            : 'Show password'
                        }
                      >

                        <i
                          className={`bi ${showPassword
                            ? 'bi-eye-slash'
                            : 'bi-eye'
                            }`}
                        ></i>

                      </button>

                    </div>

                  </div>


                  {/* REMEMBER ME */}

                  <div className="auth-options-user">

                    <label className="auth-checkbox-user">

                      <input
                        type="checkbox"
                        checked={
                          rememberMe
                        }
                        onChange={(event) =>
                          setRememberMe(
                            event.target.checked
                          )
                        }
                        disabled={loading}
                      />

                      <span>
                        Remember me
                      </span>

                    </label>

                  </div>


                  {/* LOGIN BUTTON */}

                  <button
                    type="submit"
                    className="btn btn-luxury auth-submit-user"
                    disabled={loading}
                  >

                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          aria-hidden="true"
                        ></span>

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


                <div className="auth-divider-user">

                  <span>
                    New to LuxuryStay?
                  </span>

                </div>


                <p className="auth-switch-user">
                  Create your guest account
                  to manage reservations and
                  preferences.
                </p>


                <Link
                  to="/register"
                  className="btn btn-outline-luxury w-100"
                >
                  Create Guest Account
                </Link>


                <Link
                  to="/"
                  className="auth-back-user"
                >

                  <i className="bi bi-arrow-left"></i>

                  Return to homepage

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