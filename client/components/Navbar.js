import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { setUsers } from '../store/user'

const Navbar = ({handleClick, isLoggedIn, auth}) => (
  <div>
    <h1>FS-App-Template</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">
            <span className="material-symbols-outlined">
              home
            </span> Home
          </Link>
          <Link to={`/profile/${auth.id}`}>
            <span className="material-symbols-outlined">
              person
            </span> Profile
          </Link>
          <a href="#" onClick={handleClick}>
            <span className="material-symbols-outlined">
              logout
            </span> Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {

  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
