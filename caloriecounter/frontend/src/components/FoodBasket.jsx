import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFoodToBasketFromDayState, deleteFoodFromBasket, deleteFoodFromBasketThunk } from '../reducers/foods'
import { monthsTitles } from './private/Calendar'
import '../styles/_food-basket.scss';
import { toggleBusketVisibility } from './common/toggleBusketVisibility';
import { Link } from 'react-router-dom';

function nutrientsAndCaloriesSum(content) {
  return function (a, b) {
    return (+a.food[`${content}_content`] * +a.weigthFactor) +
      (+b.food[`${content}_content`] * +b.weigthFactor)
  }
}

export function FoodBasket({ aside, main }) {

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
      basketContent.forEach(item => dispatch(addFoodToBasketFromDayState(item.food, item.weight / 100)))
    }
  }, [basketDate])

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
    <div className="food-basket-container">
      <h3>Food Basket</h3>
      <h4>{basketDateInformat}</h4>
      <div className="food-composition-indexes">
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

        <button className="hide-busket-button"
          onClick={() => toggleBusketVisibility(aside, main)}>&#215;</button>
      </div>
      <div className="food-items-container">
        {basket.length !== 0 ? basket.map(product => <div className="item-container" key={product.food.id}>
          <h6>{product.food.title}</h6>
          <img src={product.food.image} />
          <button className="delete-item-from-basket-button"
            onClick={() => deleteFood(product.food.id)}>&#215;</button>
          <span className="item-weight-info">{Math.round(product.weigthFactor * 100)}g</span>
          <span className="item-calories-info">{Math.round(product.weigthFactor * product.food.calorie_content)}kcal</span>
        </div>) : <div className="empty-basket"><p>No foods in basket</p> {isAuth && !basketDateInformat ?
          <p>Please, choose the date in <Link to="/app/days" className="header-link">Diary</Link></p> : null}</div>}
        <div className="item-container-empty" key={`empty`}> </div>
      </div>
    </div>
  )
}
