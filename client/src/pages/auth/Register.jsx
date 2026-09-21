import {
  useState,
} from 'react'

import {
  Link,
  useNavigate,
} from 'react-router-dom'

import {
  useAuth,
} from '../../context/AuthContext'

function Register() {
  const navigate =
    useNavigate()

  const { register } =
    useAuth()

  const [formData, setFormData] =
    useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    })

  const [showPassword, setShowPassword] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const [success, setSuccess] =
    useState('')

  const handleChange = (event) => {
    const { name, value } =
      event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setError('')
  }

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault()

    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
    } = formData

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password
    ) {
      setError(
        'Please complete all required fields.'
      )
      return
    }

    if (password.length < 6) {
      setError(
        'Password must contain at least 6 characters.'
      )
      return
    }

    if (
      password !==
      confirmPassword
    ) {
      setError(
        'Passwords do not match.'
      )
      return
    }

    try {
      setLoading(true)

      await register({
        firstName:
          firstName.trim(),
        lastName:
          lastName.trim(),
        email:
          email
            .trim()
            .toLowerCase(),
        phone: phone.trim(),
        password,
      })

      setSuccess(
        'Account created successfully. Redirecting to sign in...'
      )

      setTimeout(() => {
        navigate('/login')
      }, 1200)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-page-user">
      <div className="container">
        <div className="auth-shell-user auth-register-shell-user">
          <div className="auth-visual-user auth-register-visual-user">
            <div className="auth-visual-overlay-user"></div>

            <div className="auth-visual-content-user">
              <span>
                BECOME OUR GUEST
              </span>

              <h1>
                Your Luxury
                <br />
                Journey Begins.
              </h1>

              <p>
                Create your LuxuryStay
                account for effortless
                reservations and personalized
                guest services.
              </p>
            </div>
          </div>

          <div className="auth-form-side-user">
            <div className="auth-form-user auth-register-form-user">
              <span className="auth-eyebrow-user">
                CREATE ACCOUNT
              </span>

              <h2>Join LuxuryStay</h2>

              <p className="auth-subtitle-user">
                Complete your guest profile
                to get started.
              </p>

              {error && (
                <div className="auth-alert-user">
                  <i className="bi bi-exclamation-circle"></i>
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="auth-success-user">
                  <i className="bi bi-check-circle"></i>
                  <span>{success}</span>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
              >
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="auth-field-user">
                      <label>
                        First Name
                      </label>

                      <div className="auth-input-user">
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
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="auth-field-user">
                      <label>
                        Last Name
                      </label>

                      <div className="auth-input-user">
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
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
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
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="auth-field-user">
                      <label>
                        Phone Number
                      </label>

                      <div className="auth-input-user">
                        <i className="bi bi-telephone"></i>

                        <input
                          type="tel"
                          name="phone"
                          placeholder="+92 300 1234567"
                          value={
                            formData.phone
                          }
                          onChange={
                            handleChange
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="auth-field-user">
                      <label>
                        Password
                      </label>

                      <div className="auth-input-user">
                        <i className="bi bi-lock"></i>

                        <input
                          type={
                            showPassword
                              ? 'text'
                              : 'password'
                          }
                          name="password"
                          placeholder="Password"
                          value={
                            formData.password
                          }
                          onChange={
                            handleChange
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="auth-field-user">
                      <label>
                        Confirm Password
                      </label>

                      <div className="auth-input-user">
                        <i className="bi bi-shield-lock"></i>

                        <input
                          type={
                            showPassword
                              ? 'text'
                              : 'password'
                          }
                          name="confirmPassword"
                          placeholder="Confirm"
                          value={
                            formData.confirmPassword
                          }
                          onChange={
                            handleChange
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <label className="auth-show-password-user">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  />

                  <span>
                    Show passwords
                  </span>
                </label>

                <button
                  type="submit"
                  className="auth-submit-user mt-4"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm"></span>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <i className="bi bi-arrow-right"></i>
                    </>
                  )}
                </button>
              </form>

              <div className="auth-switch-user">
                Already have an account?{' '}
                <Link to="/login">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register