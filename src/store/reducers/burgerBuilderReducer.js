import * as actionTypes from '../actions/actionTypes'
import { INGREDIENT_LIST } from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import { immutableUpdateState } from '../utilities//utility';
const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false
}

const reducer = (state = initialState, action) => {
  
  switch(action.type){
    case actionTypes.ADD_INGREDIENTS: {
      const ingredientName = action.ingredientName;
      console.log('ingredientName', INGREDIENT_LIST[ingredientName].price)
      
      const updateState = {
        ingredients: {
          [ingredientName]: state.ingredients[ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_LIST[ingredientName].price
      }
      console.log(state, 'vs', updateState)
      return immutableUpdateState(state, updateState);
    }
    case actionTypes.REMOVE_INGREDIENTS: {
      const ingredientName = action.ingredientName;

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
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        totalPrice: 0,
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