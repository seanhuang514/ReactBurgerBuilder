import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility'

const initialState = {
  results:[]
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionType.INCREMENT: 
      console.log('result!!!')
      return state
    case actionType.STORE_RESULT:
      // immutable way to push element to array and return new array
      return updateObject(state, { results: state.results.concat({ id: new Date(), value: action.result }) });
    case actionType.DELETE_RESULT:
      /* way1
      const id = 2;
      const new_arr = [...state.results]
      new_arr.splice(id, 1) 
      */

      // way 2
      const new_arr = state.results.filter(result => result.id !== action.resultId)
      return updateObject(state, { results: new_arr })
    default:
      return state
  }

}

export default reducer;