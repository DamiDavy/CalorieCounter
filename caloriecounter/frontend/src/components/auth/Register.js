import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { registerUser } from '../../reducers/auth'

export const Register = () => {

  const isAuth = useSelector(state => state.auth.isAuth)

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [email, setEmail] = useState('')

  const [error, setError] = useState('')

  const dispatch = useDispatch()

  const submitRegistrationForm = (e) => {
    dispatch(registerUser(login, email, password))
    e.preventDefault()
  }

  const inputValidationOnBlur = (e, type, title) => {
    if (type.length < 4) {
      setError(`${title} must contain at least four letters`)
    }
  }

  const inputValidationOnKeyUp = (e, type, title) => {
    if (type.length > 3) {
      setError('')
      e.target.style.border = '1px solid gray'
    }
  }

  const equalityPasswordsValidation = (e) => {
    if (password !== passwordRepeat) {
      setError('passwords are not equal')
    }
    else {
      setError('')
      e.target.style.border = '1px solid gray'
    }
  }

  const re = /^[^@]+@[^@]+.[^@]+$/
  const emailValidationOnBlur = (e) => {
    if (!re.test(email)) {
      setError('invalid email address')
      e.target.style.border = `4px solid ${theme === 'dark' ? '#ff7373' : 'IndianRed'}`
    }
  }
  const emailValidationOnKeyUp = (e) => {
    if (re.test(email)) {
      setError('')
      e.target.style.border = '1px solid gray'
    }
  }

  if (isAuth) return <Redirect to="days" />

  return (
    <>
      {/* {registered && <Redirect to='/login' />} */}
      <h2>Registration</h2>
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
        <input value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
          type='password'
          placeholder='repeat password'
          onKeyUp={e => equalityPasswordsValidation(e)} /><br />
        <input value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='email'
          onKeyUp={e => emailValidationOnKeyUp(e)}
          onBlur={e => emailValidationOnBlur(e)} /><br />
      </form>
      <p>{error}</p>

      {login.length < 4 || password.length < 4 || passwordRepeat !== password || email.length < 5 ?
        <button>Register</button> :
        <button onClick={submitRegistrationForm}>
          Register
        </button>}

      <p>Or</p>
      <p>
        <Link to='/login'>
          <button>Login</button>
        </Link>
      </p>
    </>
  )
}