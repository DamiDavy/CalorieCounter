import axios from 'axios'

import { errorAC, GET_ERRORS } from './errors'
import { SET_MESSAGE } from './success'

const GET_FOODS = 'GET_FOODS'

const initialState = {
  foods: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FOODS:
      return {
        ...state,
        foods: action.payload
      }
    default:
      return state
  }
}

export const getFoods = () => dispatch => {
  axios
    .get('/api/foods/')
    .then(res => {
      dispatch({
        type: SET_MESSAGE,
        payload: "Foods are loaded"
      })
      dispatch({
        type: GET_FOODS,
        payload: res.data
      })
    })
    .catch(error => {
      dispatch(errorAC(error.toJSON().message, error.response.status))
    });
}