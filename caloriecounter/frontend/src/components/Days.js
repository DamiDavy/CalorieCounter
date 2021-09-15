import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { getDays } from '../reducers/days'

export function Days() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDays())
  }, [])


  return (
    <div>
      Days
    </div>
  )
}
