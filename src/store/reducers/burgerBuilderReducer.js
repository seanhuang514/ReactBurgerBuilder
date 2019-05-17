import * as actionTypes from '../actions/actionTypes';
import { INGREDIENT_LIST } from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import { immutableUpdateState } from '../utilities/utility';

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false
};

const addIngredient = (state, action) => {
  const ingredientName = action.ingredientName;
  // console.log('ingredientName', INGREDIENT_LIST[ingredientName].price)
  const updateState = {
    ingredients: {
      [ingredientName]: state.ingredients[ingredientName] + 1
    },
    totalPrice: state.totalPrice + INGREDIENT_LIST[ingredientName].price
  };
  // console.log(state, 'vs', updateState)
  return immutableUpdateState(state, updateState);
};

const removeIngredient = (state, action) => {
  const ingredientName = action.ingredientName;

  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [ingredientName]: state.ingredients[ingredientName] - 1
    },
    totalPrice: state.totalPrice - INGREDIENT_LIST[ingredientName].price
  };
}

const setIngredients = (state, action) => {
  const updateState = {
    ingredients: action.ingredients,
    totalPrice: 0,
    error: false
  }

  console.log('state === updateState', state === updateState)
  return immutableUpdateState(state, updateState)
}

const fetchIngredientFailed = (state, action) => {
  return {
    ...state,
    error: true
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENTS: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientFailed(state, action);
    default:return state;
  }
};

export default reducer;
