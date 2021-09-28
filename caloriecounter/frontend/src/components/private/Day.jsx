import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDayToLoaded } from '../../reducers/days'
import { getUserFoodItems, setCalorieContent } from '../../reducers/foods'
import { monthInFormat } from './Calendar'
import '../../styles/calendar.scss';

export function Day({ num, days, showBasket, month, year }) {

  const dispatch = useDispatch()

  const foodItems = useSelector(state => state.foods[num])

  useEffect(() => {
    days.map(day => {
      if (+day.day === num) {
        dispatch(getUserFoodItems(day))
      }
    })
  }, [])

  const loadedDays = useSelector(state => state.days.datesWereLoaded)

  const intake = useSelector(state => {
    if (state.intake.intake) {
      return state.intake.intake.daily_calorie_intake
    }
  })

  useEffect(() => {
    if (foodItems && !loadedDays.includes(num)) {
      console.log("count!")
      dispatch(addDayToLoaded(num))
      dispatch(setCalorieContent(num))
    }
  }, [foodItems])

  const calorieCapacity = useSelector(state => state.foods.calories[num])

  function dayColor() {
    const ratio = +calorieCapacity / +intake
    if (ratio <= 0.9 && ratio > 0.7) {
      return 'green-day'
    }
    else if (ratio > 0.85 && ratio <= 1.05) {
      return 'yellow-day'
    }
    else if (ratio > 1.05 && ratio <= 1.2) {
      return 'orange-day'
    }
    else if (ratio > 1.2) {
      return 'red-day'
    }
    else if (ratio <= 0.7 && ratio !== 0) {
      return 'blue-day'
    }
    return ''
  }

  return (
    <div className={"day-in-month " + dayColor()}>
      <button className="day-in-month-btn"
        onClick={() => showBasket(num, monthInFormat(month), year)}>
        <span>{num}</span>
      </button>
      {calorieCapacity > 0 ? <span className="day-calorie-capacity">{Math.round(calorieCapacity)}</span> : null}
    </div >
  )
}
