//to create user when they signup
//need to update form according to needed column in table ie email / if we need firstName / lastName  / bio

import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'

const UserCreateForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        {/* <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div> */}
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
    //   const email = evt.target. email.value
    // dispatch(authenticate(username, password, email, formName))
      dispatch(authenticate(username, password, formName))
    }
  }
}

export const Signup = connect(mapSignup, mapDispatch)(UserCreateForm);
