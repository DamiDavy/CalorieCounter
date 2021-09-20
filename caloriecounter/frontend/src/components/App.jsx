import React, { useEffect } from 'react'
import { Route, Switch, Redirect, Link } from 'react-router-dom'
import { Login } from './auth/Login'
import { Register } from './auth/Register'
import { PrivateRoute } from './common/PrivateRoute'
import { useAlert } from 'react-alert'

import { Header } from './Header'
import { Days } from './private/Days'
import { loadUser } from '../reducers/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Search } from './Search'
import { Category } from './Category'
import { Food } from './Food'
import Categories from './Categories'
import { FoodBasket } from './FoodBasket'
import { toggleDropdownVisibility } from '../reducers/foods'
import { CalorieIntake } from './CalorieIntake'

export function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  const successMessage = useSelector(state => state.success.message)
  const errorMessage = useSelector(state => state.errors.message)

  const alert = useAlert()

  useEffect(() => {
    if (successMessage) {
      alert.show(successMessage, {
        type: 'success',
      })
    }
  }, [successMessage])

  useEffect(() => {
    if (errorMessage) {
      alert.show(errorMessage, {
        type: 'error',
      })
    }
  }, [errorMessage])

  return (
    <div onClick={() => dispatch(toggleDropdownVisibility(false))}>
      <Header />
      <Search />
      <FoodBasket />
      <main>
        <Switch>
          <Route exact path="/" component={Categories} />
          <PrivateRoute exact path="/app/days" component={Days} />
          <Route exact path="/app/category/:category" component={Category} />
          <Route exact path="/app/food/:food" component={Food} />
          <Route exact path="/app/calorie-intake" component={CalorieIntake} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </main>
    </div>
  )
}