import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/auth'
import { getUserRecomendedIntakeThunk } from '../reducers/intake'
import { Link } from 'react-router-dom'

export function Header() {

  const dispatch = useDispatch()

  const isAuth = useSelector(state => state.auth.isAuth)
  const user = useSelector(state => state.auth.user)
  const intake = useSelector(state => {
    if (state.intake.intake) {
      return state.intake.intake.daily_calorie_intake
    }
  })

  useEffect(() => {
    if (isAuth) {
      dispatch(getUserRecomendedIntakeThunk())
    }
  }, [isAuth])

  const guestButtons = <>
    <Link to={'/login'}>Login</Link><br />
    <Link to={'/register'}>Register</Link><br />
  </>

  const authButtons = <><p>as {user && user.username} </p>
    {intake ? <p>RCI: {intake} kcal</p> : null}
    <button onClick={() => dispatch(logoutUser())}>Logout</button><br /></>

  return (
    <header>
      <h2>meal&i</h2>
      {isAuth ? authButtons : guestButtons}
      <Link to="/app/calorie-intake">Calculate Ideal Daily Calorie Intake</Link>
      <hr />
      {/* {foods.map(food => <li key={food.id}>{food.title}</li>)} */}
    </header>
  )
}
