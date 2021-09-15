import { combineReducers } from "redux"
import foods from './foods'
import errors from './errors'
import success from './success'
import auth from './auth'
import days from './days'

export default combineReducers({ foods, days, errors, success, auth })