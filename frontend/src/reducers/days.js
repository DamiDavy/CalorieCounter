import axios from 'axios'
import { addHeaderWithToken } from './auth'

import { errorAC } from './errors'

const GET_DAYS = 'GET_DAYS'
const CLEAR_DAYS_STATE = 'CLEAR_DAYS_STATE'

const SET_DAY_TO_ADD_FOOD_IN = 'SET_DAY_TO_ADD_FOOD_IN'
const SET_LOADED_BUSKET_DATE = 'ADD_DAY_TO_LOADED_BUSKET'

const ADD_DAY_TO_LOADED = 'ADD_DAY_TO_LOADED'
const DELETE_DAY_FROM_LOADED = 'DELETE_DAY_FROM_LOADED'

const SET_CALENDAR_IS_RENDERED = 'SET_CALENDAR_IS_RENDERED'
export const DROP_CALENDAR_STATE_ON_LOGOUT = 'DROP_CALENDAR_STATE_ON_LOGOUT'

const initialState = {
  days: [],
  dayToAddFoodIn: null,
  loadedBusketDay: null,
  dayCalorieCapacityOnMonth: [],
  datesWereLoaded: [],
  calendarIsRendered: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DAYS:
      return {
        ...state,
        days: action.payload
      }
    case CLEAR_DAYS_STATE:
      return {
        ...initialState,
        dayToAddFoodIn: state.dayToAddFoodIn,
        loadedBusketDay: state.dayToAddFoodIn,
      }
    case SET_DAY_TO_ADD_FOOD_IN:
      return {
        ...state,
        dayToAddFoodIn: action.payload,
        loadedBusketDay: null
      }
    case SET_LOADED_BUSKET_DATE:
      return {
        ...state,
        loadedBusketDay: action.payload
      }
    case ADD_DAY_TO_LOADED:
      return {
        ...state,
        datesWereLoaded: [...state.datesWereLoaded, action.payload]
      }
    case DELETE_DAY_FROM_LOADED:
      return {
        ...state,
        datesWereLoaded: state.datesWereLoaded.filter(item => +item != +action.payload)
      }
    case SET_CALENDAR_IS_RENDERED:
      return {
        ...state,
        calendarIsRendered: true
      }
    case DROP_CALENDAR_STATE_ON_LOGOUT:
      return initialState
    default:
      return state
  }
}

export const clearCurrentMonthInfoInDays = () => ({ type: CLEAR_DAYS_STATE })
export const setCalendarIsRendered = () => ({ type: SET_CALENDAR_IS_RENDERED })

export const addDayToLoaded = (num) => {
  return {
    type: ADD_DAY_TO_LOADED,
    payload: num
  }
}

export const deleteDayFromLoaded = (num) => {
  return {
    type: DELETE_DAY_FROM_LOADED,
    payload: num
  }
}

export const setDayLoadedBusket = (dayObj) => {
  return {
    type: SET_LOADED_BUSKET_DATE,
    payload: dayObj
  }
}

export const createOrGetDay = (day, month, year) => (dispatch, getState) => {
  const userId = getState().auth.user.id
  const body = { user: userId, day, month, year }

  axios.post('http://127.0.0.1:8000/api/days/', body, addHeaderWithToken(getState))
    .then(res => {
      dispatch({
        type: SET_DAY_TO_ADD_FOOD_IN,
        payload: res.data
      })
    })
    .catch(error => {
      dispatch(errorAC("There Was An Error", error.response.status))
    })
}

export const searchDays = (year, month) => (dispatch, getState) => {
  axios
    .get(`http://127.0.0.1:8000/api/days?year=${year}&month=${month}`, addHeaderWithToken(getState))
    .then(res => {
      dispatch({
        type: GET_DAYS,
        payload: res.data
      })
    })
    .catch(error => {
      dispatch(errorAC("There Was An Error", error.response.status))
    });
}