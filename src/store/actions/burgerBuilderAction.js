import * as actionType from './actionTypes';
import axios from '../../axios-orders'

export const addIngredient = name => {
  return {
    type: actionType.ADD_INGREDIENTS,
    ingredientName: name
  }
}

export const removeIngredient = name => {
  return {
    type: actionType.REMOVE_INGREDIENTS,
    ingredientName: name
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionType.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios
      .get('/ingredients.json')
      .then(response => {
        dispatch({
          type: actionType.SET_INGREDIENTS,
          ingredients: response.data
        })
      })
      .catch(error => {
        dispatch({
          type: actionType.FETCH_INGREDIENTS_FAILED
        })
      });
  }
}