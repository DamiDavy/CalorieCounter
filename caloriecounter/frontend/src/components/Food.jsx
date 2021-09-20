import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { addFoodToBasket, foodsSearch, addFoodToBasketThunk } from '../reducers/foods'

export function Food() {

  const [weight, setWeight] = useState(100)

  const weigthFactor = useMemo(() => {
    return weight / 100
  }, [weight])

  const foodParam = useParams().food

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(foodsSearch(foodParam))
  }, [])

  const food = useSelector(state => state.foods.foods[0])
  const isAuth = useSelector(state => state.auth.isAuth)

  let history = useHistory();

  function addToBasket(food, weigthFactor) {
    if (isAuth) {
      dispatch(addFoodToBasketThunk(food.id, +weight))
    } else {
      dispatch(addFoodToBasket(food.id, weigthFactor))
    }
    history.push("/");
  }

  if (!food) return null

  return (
    <div>
      <h2>{food.title}</h2>
      <pre>{`
          ${(food.calorie_content * weigthFactor).toFixed()} calories
          ${(food.protein_content * weigthFactor).toFixed(1)} protein
          ${(food.fat_content * weigthFactor).toFixed(1)} fat
          ${(food.carbohydrate_content * weigthFactor).toFixed(1)} carbohydrate`}
      </pre>
      <input type="text" value={weight} onChange={e => setWeight(e.target.value)} /><span> g</span>
      <button onClick={() => addToBasket(food, weigthFactor)}>Add To Basket</button>
    </div>
  )
}
