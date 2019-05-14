import * as actionTypes from '../actions'

const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    bacon: 0,
    meat: 0
  },
  totalPrice: 4,
}

const reducer = (state = initialState, action) => {

  switch(action.type){
    case actionTypes.ADD_INGREDIENTS:
      let ingredientName = action.ingredientName;

      return {
        ...state,
        /* copy ingredients from state then override one of attribute */
        ingredients: {
          ...state.ingredients,
          [ingredientName]: state.ingredients[ingredientName] + 1
        }
      }
    case actionTypes.REMOVE_INGREDIENTS:
      ingredientName = action.ingredientName;

      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [ingredientName]: state.ingredients[ingredientName] - 1
        }
      }
    default:
    return state
  }
}

export default reducer;