import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFoodToBasket, clearFoodBusket, deleteFoodFromBasket, deleteFoodFromBasketThunk } from '../reducers/foods'
import { monthsTitles } from './private/Days'

function nutrientsAndCaloriesSum(content) {
  return function (a, b) {
    return (+a.food[`${content}_content`] * +a.weigthFactor) +
      (+b.food[`${content}_content`] * +b.weigthFactor)
  }
}

export function FoodBasket() {

  const dispatch = useDispatch()

  const basket = useSelector(state => state.foods.foodBasket)
  const basketDate = useSelector(state => state.days.dayToAddFoodIn)
  const basketContent = useSelector(state => state.foods[dayOfMonth(basketDate)])

  const isAuth = useSelector(state => state.auth.isAuth)

  function dayOfMonth(basketDate) {
    if (basketDate) {
      return basketDate.day
    }
  }

  useEffect(() => {
    if (isAuth && basketDate && basketContent) {
      basketContent.forEach(item => dispatch(addFoodToBasket(item.food, item.weight / 100)))
    }
    return () => {
      dispatch(clearFoodBusket())
    };
  }, [basketContent])

  const basketDateInformat = useMemo(() => {
    if (basketDate) {
      return `${basketDate.day} ${monthsTitles[+basketDate.month - 1]} ${basketDate.year}`
    }
  }, [basketDate])

  function deleteFood(id) {
    if (isAuth) {
      dispatch(deleteFoodFromBasketThunk(id, basketDate.day))
    } else {
      dispatch(deleteFoodFromBasket(id))
    }
  }

  return (
    <div>
      <h4>{basketDateInformat}</h4>
      <p>Calories:
        {basket.length > 0 ? basket.length === 1 ?
          basket[0].food.calorie_content * +basket[0].weigthFactor :
          basket.reduce(nutrientsAndCaloriesSum('calorie')).toFixed(1) : 0}</p>
      <p>Protein:
        {basket.length > 0 ? basket.length === 1 ?
          (basket[0].food.protein_content * +basket[0].weigthFactor) :
          basket.reduce(nutrientsAndCaloriesSum('protein')).toFixed(1) : 0}</p>
      <p>Fat:
        {basket.length > 0 ? basket.length === 1 ?
          (basket[0].food.fat_content * +basket[0].weigthFactor) :
          basket.reduce(nutrientsAndCaloriesSum('fat')).toFixed(1) : 0}</p>
      <p>Carbohydrate:
        {basket.length > 0 ? basket.length === 1 ?
          (basket[0].food.carbohydrate_content * +basket[0].weigthFactor) :
          basket.reduce(nutrientsAndCaloriesSum('carbohydrate')).toFixed(1) : 0}</p>
      <p>Weigth:
        {basket.length > 0 ? basket.length === 1 ?
          basket[0].weigthFactor * 100 :
          Math.round(basket.reduce((a, b) => a.weigthFactor * 100 + b.weigthFactor * 100)) : 0}</p>
      {basket.map(product => <div key={product.food.id}>
        <span>{product.food.title}</span>
        <button onClick={() => deleteFood(product.food.id)}>Delete</button>
      </div>)}<hr />
    </div>
  )
}
