import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { getCategories } from '../reducers/foods'

export default function Categories() {

  const dispatch = useDispatch()

  const categories = useSelector(state => state.foods.categories)

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  const isAuth = useSelector(state => state.auth.isAuth)
  if (isAuth) return <Redirect to="/app/days" />

  return (
    <div>
      <h2>Categories</h2>
      {categories
        .map(category => <div key={category.id} >
          <Link to={`/app/category/${category.title}`} >{category.title}</Link>
        </div>)}
    </div>
  )
}
