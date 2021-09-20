import React, { useEffect, useState } from 'react'
import '../../styles.css'
import { v4 as uuidv4 } from 'uuid'

import { useDispatch, useSelector } from 'react-redux'
import { clearCurrentMonthInfoInDays, createOrGetDay, searchDays, setCalendarIsRendered } from '../../reducers/days'
import { Day } from './Day'
import { clearCurrentMonthInfoInFoods, clearFoodBusket } from '../../reducers/foods'

const weekDays = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su']
export const monthsTitles = ['january', 'february', 'march', 'april', 'may', 'june', 'july',
  'august', 'september', 'october', 'november', 'december']

const weekDayInFormat = (day) => {
  if (day === 0) return 6
  else return day - 1
}

const lastMonthDay = (year, month) => {
  const firstDay = new Date(year, month)
  firstDay.setMonth(firstDay.getMonth() + 1)
  firstDay.setDate(0)
  return firstDay.getDate()
}

const getMonthFirstDayInWeek = (year, month) => {
  const firstDay = new Date(year, month)
  return weekDayInFormat(firstDay.getDay())
}

export const monthInFormat = (month) => {
  return month + 1 < 10 ? `0${month + 1}` : month + 1
}

export function Days() {

  const dispatch = useDispatch()

  const now = new Date()

  const calendarIsRendered = useSelector(state => state.days.calendarIsRendered)

  useEffect(() => {
    if (!calendarIsRendered) {
      dispatch(createOrGetDay(now.getDate(), monthInFormat(now.getMonth()), now.getFullYear()))
      dispatch(setCalendarIsRendered())
    }
  }, [])

  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())

  function showBasket(day, month, year) {
    dispatch(createOrGetDay(day, month, year))
    dispatch(clearFoodBusket())
    console.log('clear')
  }

  const [monthFirstWeekDay, setMonthFirstWeekDay] =
    useState(getMonthFirstDayInWeek(year, month))

  useEffect(() => {
    setMonthFirstWeekDay(getMonthFirstDayInWeek(year, month))
    dispatch(searchDays(year, monthInFormat(month)))
  }, [year, month])

  const showPreviousMonth = () => {
    dispatch(clearCurrentMonthInfoInFoods())
    dispatch(clearCurrentMonthInfoInDays())
    setMonth(prev => {
      if (prev === 0) {
        setYear(y => y - 1)
        return 11
      }
      return prev - 1
    })
  }

  const showNextMonth = () => {
    dispatch(clearCurrentMonthInfoInFoods())
    dispatch(clearCurrentMonthInfoInDays())
    setMonth(prev => {
      if (prev === 11) {
        setYear(y => y + 1)
        return 0
      }
      return prev + 1
    })
  }
  const days = useSelector(state => state.days.days)

  return <>
    <div>
      <button onClick={showPreviousMonth}>&#8249;</button>
      <h3>{`${monthsTitles[month]} ${year}`}</h3>
      <button onClick={showNextMonth}>&#8250;</button>
    </div>
    <div className="calendar-grid">
      {weekDays.map(day => <div key={day}>{day}</div>)}
      {monthFirstWeekDay !== 0 &&
        [...Array(monthFirstWeekDay).keys()].map(() => <div key={`empty${uuidv4()}`}></div>)}

      {[...Array(lastMonthDay(year, month)).keys()]
        .map((index) =>
          <Day key={`num${uuidv4()}`} num={index + 1} days={days}
            showBasket={showBasket} month={month} year={year} />)}
    </div>
  </>
}
