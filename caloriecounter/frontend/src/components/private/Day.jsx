import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDayToLoaded } from '../../reducers/days'
import { getUserFoodItems, setCalorieContent } from '../../reducers/foods'
import { monthInFormat } from './Days'

export function Day({ num, days, showBasket, month, year }) {

  const dispatch = useDispatch()

  useEffect(() => {
    days.map(day => {
      if (+day.day === num) {
        dispatch(getUserFoodItems(day))
      }
    })
  }, [])

  const foodItems = useSelector(state => state.foods[num])

  const loadedDays = useSelector(state => state.days.datesWereLoaded)

  useEffect(() => {
    if (foodItems && !loadedDays.includes(num)) {
      dispatch(addDayToLoaded(num))
      dispatch(setCalorieContent(num))
    }
  }, [foodItems])

  const calorieCapacity = useSelector(state => state.foods.calories[num])

  return (
    <div>
      <button onClick={() => showBasket(num, monthInFormat(month), year)}>{num}</button>
      <span> {calorieCapacity > 0 ? Math.round(calorieCapacity) : null} </span>
    </div>
  )
}
