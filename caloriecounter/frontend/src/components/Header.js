import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'

import { useDispatch, useSelector } from 'react-redux'
import { getDays } from '../reducers/days'
import { getFoods } from '../reducers/foods'

export function Header() {

  const foods = useSelector(state => state.foods.foods)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getFoods())
  }, [])

  const successMessage = useSelector(state => state.success.message)

  useEffect(() => {
    if (successMessage) {
      alert.show(successMessage, {
        type: 'success',
      })
    }
  }, [successMessage])

  const error = useSelector(state => state.errors)
  const message = error.message

  useEffect(() => {
    if (message) {
      alert.show(message, {
        type: 'error',
      })
    }
  }, [message])

  const alert = useAlert()

  return (
    <div>
      <button onClick={() => dispatch(getDays())}>Get Days</button>
      <ul>
        {foods.map(food => <li key={food.id}>{food.title}</li>)}
      </ul>
    </div>
  )
}
