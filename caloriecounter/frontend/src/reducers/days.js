import axios from 'axios'
import { addHeaderWithToken } from './auth'

import { errorAC, GET_ERRORS } from './errors'
import { SET_MESSAGE } from './success'

const GET_DAYS = 'GET_DAYS'

const initialState = {
  days: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DAYS:
      return {
        ...state,
        days: action.payload
      }
    default:
      return state
  }
}

export const getDays = () => (dispatch, getState) => {
  axios
    .get('/api/days/', addHeaderWithToken(getState))
    .then(res => {
      dispatch({
        type: SET_MESSAGE,
        payload: "Days are loaded"
      })
      dispatch({
        type: GET_DAYS,
        payload: res.data
      })
    })
    .catch(error => {
      dispatch(errorAC(error.toJSON().message, error.response.status))
    });
}