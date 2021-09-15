import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { loginUser } from '../../reducers/auth'

export const Login = () => {

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')

  const isAuth = useSelector(state => state.auth.isAuth)

  const dispatch = useDispatch()

  const submitLoginForm = (e) => {
    dispatch(loginUser(login, password))
    e.preventDefault()
  }

  const inputValidationOnBlur = (e, type, title) => {
    if (type.length < 4) {
      setError(`${title} must contain at least four letters`)
    }
  }

  const inputValidationOnKeyUp = (e, type) => {
    if (type.length > 3) {
      setError('')
      e.target.style.border = '1px solid gray'
    }
  }

  if (isAuth) return <Redirect to="days" />

  return (
    <>
      <h2>Login</h2>
      <form onClick={() => setError('')}>
        <input value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder='login'
          onKeyUp={e => inputValidationOnKeyUp(e, login, 'login')}
          onBlur={e => inputValidationOnBlur(e, login, 'login')} /><br />
        <input value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          placeholder='password'
          onKeyUp={e => inputValidationOnKeyUp(e, password, 'password')}
          onBlur={e => inputValidationOnBlur(e, password, 'password')} /><br />
      </form>
      <p>{error}</p>

      {login.length < 4 || password.length < 4 ?
        <button>Login</button> :
        <button onClick={submitLoginForm}>
          Login
        </button>}

      <p>Or</p>
      <p>
        <Link to='/register'>
          <button>Register</button>
        </Link>
      </p>
    </>
  )
}