import {
  Link,
} from 'react-router-dom'


function Unauthorized() {

  return (
    <section className="unauthorized-user">

      <div className="container">

        <div className="unauthorized-card-user">

          <i className="bi bi-shield-lock"></i>

          <span>
            ACCESS RESTRICTED
          </span>

          <h1>
            Unauthorized Access
          </h1>

          <p>
            Your account does not have
            permission to access this area.
          </p>

          <Link
            to="/"
            className="btn btn-luxury"
          >
            Return Home
          </Link>

        </div>

      </div>

    </section>
  )
}

export default Unauthorized