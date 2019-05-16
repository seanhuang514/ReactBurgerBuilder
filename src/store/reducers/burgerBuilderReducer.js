import * as actionTypes from '../actions/actionTypes'
import { INGREDIENT_LIST } from '../../components/Burger/BurgerIngredient/BurgerIngredient';

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false
}

const reducer = (state = initialState, action) => {
  
  switch(action.type){
    case actionTypes.ADD_INGREDIENTS: {
      let ingredientName = action.ingredientName;
      console.log('ingredientName', INGREDIENT_LIST[ingredientName].price)
      return {
        ...state,
        /* copy ingredients from state then override one of attribute */
        ingredients: {
          ...state.ingredients,
          [ingredientName]: state.ingredients[ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_LIST[ingredientName].price
      }
    }
    case actionTypes.REMOVE_INGREDIENTS: {
      let ingredientName = action.ingredientName;

      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [ingredientName]: state.ingredients[ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_LIST[ingredientName].price
      }
    }
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false
      }
    case actionTypes.FETCH_INGREDIENTS_FAILED: 
      return {
        ...state,
        error: true
      }
    default:
    return state
  }
}

export default reducer;