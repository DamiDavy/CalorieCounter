import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createOrUpdateUserRecomendedIntakeThunk } from '../reducers/intake'

export function CalorieIntake() {

  const isAuth = useSelector(state => state.auth.isAuth)

  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [age, setAge] = useState('')

  const activityInputs = ['1', '2', '3', '4']
  const sexInputs = ['man', 'woman']

  const [activityChecked, setActivityChecked] = useState(null)
  const [sexChecked, setSexChecked] = useState(null)
  const [calorieIntake, setCalorieIntake] = useState(0)

  const [error, setError] = useState('')

  const dispatch = useDispatch()

  function saveRecomendedIntake(num) {
    if (!sexChecked || !activityChecked) {
      setError('select gender and activity level')
    } else {
      dispatch(createOrUpdateUserRecomendedIntakeThunk(num))
    }
  }

  function validateNumberInput(name, value) {
    if (name === 'height') setHeight(value)
    else if (name === 'weight') setWeight(value)
    else setAge(value)
  }

  function handleRadioInputs(title, value) {
    if (title === 'sex') {
      setSexChecked(value)
    } else {
      setActivityChecked(value)
    }
  }

  function inputValidationOnBlur(e, state) {
    if (state <= 0) {
      setError('field must contain positive number')
      e.target.style.border = `2px solid IndianRed`
    }
  }

  function clearError(e) {
    setError('')
    e.target.style.border = `1px solid gray`
  }

  useEffect(() => {
    setCalorieIntake(calorieIntakeCounter())
  }, [height, weight, age, sexChecked, activityChecked])

  const calorieIntakeCounter = () => {
    let intake = (10 * +weight) + (6.25 * +height) - (5 * +age)
    if (sexChecked === 'woman') {
      intake -= 161
    } else if (sexChecked === 'man') {
      intake += 5
    }
    switch (activityChecked) {
      case '1':
        return intake * 1.2
      case '2':
        return intake * 1.375
      case '3':
        return intake * 1.55
      case '4':
        return intake * 1.725
      default:
        return intake
    }
  }

  return (
    <div>
      <form>
        <h3>Calculate Your Recommended Daily Calorie Intake</h3>
        <input type="number" name="height" placeholder="height" value={height}
          onChange={e => validateNumberInput(e.target.name, e.target.value)}
          onBlur={e => inputValidationOnBlur(e, height)}
          onClick={e => clearError(e)} /><span>cm</span><br />
        <input type="number" name="weight" placeholder="weight" value={weight}
          onChange={e => validateNumberInput(e.target.name, e.target.value)}
          onBlur={e => inputValidationOnBlur(e, weight)}
          onClick={e => clearError(e)} /><span>kg</span><br />
        <input type="number" name="age" placeholder="age" value={age}
          onChange={e => validateNumberInput(e.target.name, e.target.value)}
          onBlur={e => inputValidationOnBlur(e, age)}
          onClick={e => clearError(e)} /><span>years</span><br />
        <p>Gender</p>
        <div>
          <input type="radio" id="male" value={sexInputs[0]}
            checked={sexInputs[0] === sexChecked}
            onChange={e => handleRadioInputs('sex', e.target.value)} />
          <label htmlFor="male">male</label><br />
          <input type="radio" id="female" value={sexInputs[1]}
            checked={sexInputs[1] === sexChecked}
            onChange={e => handleRadioInputs('sex', e.target.value)} />
          <label htmlFor="female">female</label>
        </div>
        <p>Physical activity</p>
        <div>
          <input type="radio" id="activity1" value={activityInputs[0]}
            checked={activityInputs[0] === activityChecked}
            onChange={e => handleRadioInputs('activity', e.target.value)} />
          <label>sedentary work, no physical activity</label><br />
          <input type="radio" id="activity2" value={activityInputs[1]}
            checked={activityInputs[1] === activityChecked}
            onChange={e => handleRadioInputs('activity', e.target.value)} />
          <label>light gymnastics 1-3 times a week</label><br />
          <input type="radio" id="activity3" value={activityInputs[2]}
            checked={activityInputs[2] === activityChecked}
            onChange={e => handleRadioInputs('activity', e.target.value)} />
          <label>medium intensity workouts 3-5 times a week</label><br />
          <input type="radio" id="activity4" value={activityInputs[3]}
            checked={activityInputs[3] === activityChecked}
            onChange={e => handleRadioInputs('activity', e.target.value)} />
          <label>daily high intensity workouts</label>
        </div>
      </form >
      <p>{error}</p>
      <p>Your recommended daily calorie intake is: {Math.round(calorieIntake)}</p>
      {
        isAuth ?
          <button disabled={height === '' || weight === '' || age === ''}
            onClick={() => saveRecomendedIntake(Math.round(calorieIntake))}
          >Save
          </button> : null
      }
    </div >
  )
}