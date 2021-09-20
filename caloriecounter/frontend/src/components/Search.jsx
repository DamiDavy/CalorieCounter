import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { foodsSearch, toggleDropdownVisibility } from '../reducers/foods'
import '../styles.css';

export function Search() {
  const [title, setTitle] = useState('')

  const foods = useSelector(state => state.foods.foods)
  const dropDownIsVisible = useSelector(state => state.foods.dropDownIsVisible) && foods.length

  const dispatch = useDispatch()
  function showResultsDropDown() {
    if (title.length < 2) {
      dispatch(toggleDropdownVisibility(false))
      return
    }
    dispatch(foodsSearch(title))
    dispatch(toggleDropdownVisibility(true))
  }

  return (
    <>
      <form className="search-form">
        <input type="text"
          value={title}
          placeholder="food title"
          onChange={e => setTitle(e.target.value)}
          onKeyUp={showResultsDropDown} />
        {dropDownIsVisible ? <div className="search-dropdown">
          {foods.map(food => <div key={food.id}><Link onClick={() => setTitle('')}
            to={`/app/food/${food.title}`}>{food.title}</Link></div>)}
        </div> : null}
      </form>
      <hr />
    </>
  )
}
