import * as actionTypes from '../actions/actionTypes';
import { INGREDIENT_LIST } from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import { immutableUpdateState } from '../utilities/utility';

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
  hasBurger: false
};

const addIngredient = (state, action) => {
  const ingredientName = action.ingredientName;
  // console.log('ingredientName', INGREDIENT_LIST[ingredientName].price)
  const updateState = {
    ingredients: {
      [ingredientName]: state.ingredients[ingredientName] + 1
    },
    totalPrice: state.totalPrice + INGREDIENT_LIST[ingredientName].price,
  };

  Object.assign(updateState, { hasBurger: checkHasBurger(updateState.ingredients) })

  return immutableUpdateState(state, updateState);
};

const removeIngredient = (state, action) => {
  const ingredientName = action.ingredientName;

  const updateState = {
    ...state,
    ingredients: {
      ...state.ingredients,
      [ingredientName]: state.ingredients[ingredientName] - 1
    },
    totalPrice: state.totalPrice - INGREDIENT_LIST[ingredientName].price,
  };

  Object.assign(updateState, { hasBurger: checkHasBurger(updateState.ingredients) });
  
  return updateState
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

const checkHasBurger = (ingredients) => {
  const totalAmount = Object.values(ingredients).reduce((total, currentValue) => {
    return total + currentValue
  }, 0);

  return totalAmount > 0
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
