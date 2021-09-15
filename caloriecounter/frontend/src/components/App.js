import React, { useEffect } from 'react'
import { Route, Switch, Link, } from 'react-router-dom'
import { Login } from './auth/Login'
import { Register } from './auth/Register'
import { PrivateRoute } from './common/PrivateRoute'

import { Header } from './Header'
import { Days } from './Days'
import { loadUser, logoutUser } from '../reducers/auth'
import { useDispatch, useSelector } from 'react-redux'

export function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  const isAuth = useSelector(state => state.auth.isAuth)

  const guestButtons = <>
    <Link to={'/login'}>Login</Link><br />
    <Link to={'/register'}>Register</Link><br />
  </>

  const authButtons = <><button onClick={() => dispatch(logoutUser())}>Logout</button><br /></>

  return (
    <>
      <h1>React & Django</h1>
      <Header />
      {isAuth ? authButtons : guestButtons}
      <Link to={'/days'}>Days</Link>
      <Switch>
        <PrivateRoute exact path="/days" component={Days} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </>
  )
}