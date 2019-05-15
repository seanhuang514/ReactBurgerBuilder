import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility'

const initialState = {
  results:[]
}

const deleteResult = (state, action) => {
  const new_arr = state.results.filter(result => result.id !== action.resultId)
  return updateObject(state, { results: new_arr })
}

const storeResult = (state, action) => {
  // immutable way to push element to array and return new array
  const results = state.results.concat({ id: new Date(), value: action.result })
  return updateObject(state, { results: results })
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionType.INCREMENT: 
      console.log('result!!!')
      return state
    case actionType.STORE_RESULT : return storeResult(state, action);
    case actionType.DELETE_RESULT : return deleteResult(state, action);
    default:
      return state
  }

}

export default reducer;