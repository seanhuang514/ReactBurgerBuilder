import * as actionTypes from '../actions/actionTypes'
import { INGREDIENT_LIST } from '../../components/Burger/BurgerIngredient/BurgerIngredient';

const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    bacon: 0,
    meat: 0
  },
  totalPrice: 0,
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
    default:
    return state
  }
}

export default reducer;