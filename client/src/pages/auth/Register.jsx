import { useState } from 'react'
import {
  Link,
  useNavigate,
} from 'react-router-dom'

import {
  registerUser,
} from '../../services/authService'

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
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
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setError('')
    setSuccess('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setSuccess('')

    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
    } = formData

    // Required field validation
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError(
        'Please complete all required fields.'
      )
      return
    }

    // Email validation
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(email)) {
      setError(
        'Please enter a valid email address.'
      )
      return
    }

    // Password validation
    if (password.length < 6) {
      setError(
        'Password must contain at least 6 characters.'
      )
      return
    }

    // Confirm password
    if (password !== confirmPassword) {
      setError(
        'Passwords do not match.'
      )
      return
    }

    try {
      setLoading(true)

      const data = await registerUser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        password,
      })

      setSuccess(
        data.message ||
          'Account created successfully.'
      )

      // Clear form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      })

      // Redirect to login
      setTimeout(() => {
        navigate('/login')
      }, 1500)

    } catch (error) {
      setError(
        error.message ||
          'Registration failed. Please try again.'
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

            {/* LEFT SIDE */}
            <div className="col-lg-5 d-none d-lg-block">

              <div className="auth-visual-user auth-register-visual-user">

                <div className="auth-visual-overlay-user"></div>

                <div className="auth-visual-content-user">

                  <div>
                    <span>
                      JOIN LUXURYSTAY
                    </span>

                    <h1>
                      Your Journey
                      <br />
                      Starts Here.
                    </h1>

                    <p>
                      Create your guest profile and
                      enjoy simpler reservations,
                      personalized hospitality and
                      convenient access to your stays.
                    </p>
                  </div>

                  <div className="auth-benefits-user">

                    <div>
                      <i className="bi bi-check-circle"></i>
                      Manage your reservations
                    </div>

                    <div>
                      <i className="bi bi-check-circle"></i>
                      Save guest preferences
                    </div>

                    <div>
                      <i className="bi bi-check-circle"></i>
                      Access booking history
                    </div>

                    <div>
                      <i className="bi bi-check-circle"></i>
                      Request guest services
                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* RIGHT SIDE */}
            <div className="col-lg-7">

              <div className="auth-form-side-user auth-register-form-user">

                <div className="auth-form-header-user">

                  <span>
                    GUEST REGISTRATION
                  </span>

                  <h2>
                    Create Your Account
                  </h2>

                  <p>
                    Enter your information below to
                    create your LuxuryStay guest
                    profile.
                  </p>

                </div>


                {/* ERROR MESSAGE */}
                {error && (
                  <div className="auth-alert-user">

                    <i className="bi bi-exclamation-circle"></i>

                    <span>
                      {error}
                    </span>

                  </div>
                )}


                {/* SUCCESS MESSAGE */}
                {success && (
                  <div className="auth-success-user">

                    <i className="bi bi-check-circle"></i>

                    <span>
                      {success}
                    </span>

                  </div>
                )}


                <form onSubmit={handleSubmit}>

                  <div className="row g-3">


                    {/* FIRST NAME */}
                    <div className="col-md-6">

                      <div className="auth-field-user">

                        <label htmlFor="firstName">
                          First Name
                        </label>

                        <div className="auth-input-wrapper-user">

                          <i className="bi bi-person"></i>

                          <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First name"
                            autoComplete="given-name"
                            disabled={loading}
                          />

                        </div>

                      </div>

                    </div>


                    {/* LAST NAME */}
                    <div className="col-md-6">

                      <div className="auth-field-user">

                        <label htmlFor="lastName">
                          Last Name
                        </label>

                        <div className="auth-input-wrapper-user">

                          <i className="bi bi-person"></i>

                          <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last name"
                            autoComplete="family-name"
                            disabled={loading}
                          />

                        </div>

                      </div>

                    </div>


                    {/* EMAIL */}
                    <div className="col-md-6">

                      <div className="auth-field-user">

                        <label htmlFor="registerEmail">
                          Email Address
                        </label>

                        <div className="auth-input-wrapper-user">

                          <i className="bi bi-envelope"></i>

                          <input
                            id="registerEmail"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            autoComplete="email"
                            disabled={loading}
                          />

                        </div>

                      </div>

                    </div>


                    {/* PHONE */}
                    <div className="col-md-6">

                      <div className="auth-field-user">

                        <label htmlFor="phone">
                          Phone Number
                        </label>

                        <div className="auth-input-wrapper-user">

                          <i className="bi bi-telephone"></i>

                          <input
                            id="phone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+92 300 1234567"
                            autoComplete="tel"
                            disabled={loading}
                          />

                        </div>

                      </div>

                    </div>


                    {/* PASSWORD */}
                    <div className="col-md-6">

                      <div className="auth-field-user">

                        <label htmlFor="registerPassword">
                          Password
                        </label>

                        <div className="auth-input-wrapper-user">

                          <i className="bi bi-lock"></i>

                          <input
                            id="registerPassword"
                            type={
                              showPassword
                                ? 'text'
                                : 'password'
                            }
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Minimum 6 characters"
                            autoComplete="new-password"
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
                              className={`bi ${
                                showPassword
                                  ? 'bi-eye-slash'
                                  : 'bi-eye'
                              }`}
                            ></i>

                          </button>

                        </div>

                      </div>

                    </div>


                    {/* CONFIRM PASSWORD */}
                    <div className="col-md-6">

                      <div className="auth-field-user">

                        <label htmlFor="confirmPassword">
                          Confirm Password
                        </label>

                        <div className="auth-input-wrapper-user">

                          <i className="bi bi-shield-lock"></i>

                          <input
                            id="confirmPassword"
                            type={
                              showPassword
                                ? 'text'
                                : 'password'
                            }
                            name="confirmPassword"
                            value={
                              formData.confirmPassword
                            }
                            onChange={handleChange}
                            placeholder="Repeat password"
                            autoComplete="new-password"
                            disabled={loading}
                          />

                        </div>

                      </div>

                    </div>

                  </div>


                  {/* TERMS */}
                  <label className="auth-checkbox-user auth-terms-user">

                    <input
                      type="checkbox"
                      required
                      disabled={loading}
                    />

                    <span>
                      I agree to the Terms &
                      Conditions and Privacy Policy.
                    </span>

                  </label>


                  {/* REGISTER BUTTON */}
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


                <div className="auth-divider-user">

                  <span>
                    Already registered?
                  </span>

                </div>


                <Link
                  to="/login"
                  className="btn btn-outline-luxury w-100"
                >
                  Sign In
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

export default Register