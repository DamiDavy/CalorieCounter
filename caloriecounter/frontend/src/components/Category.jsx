import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

export function Category() {

  const categoryParam = useParams().category

  const category = useSelector(state => state.foods.categories.find(c => c.title === categoryParam))

  return (
    <div>
      <h2>{category.title}</h2>
      {category.foods.map(food => <div key={food.id}>
        <Link to={`/app/food/${food.title}`}>{food.title}</Link>
      </div>)}
    </div>
  )
}
