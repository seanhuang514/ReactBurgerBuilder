import * as actionType from '../actions/actionTypes';

const initialState = {
  results:[]
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionType.STORE_RESULT:
      return {
        ...state,
        // immutable way to push element to array and return new array
        results: state.results.concat({ id: new Date(), value: action.result })
      }
    case actionType.DELETE_RESULT:
      /* way1
      const id = 2;
      const new_arr = [...state.results]
      new_arr.splice(id, 1) 
      */

      // way 2
      const new_arr = state.results.filter(result => result.id !== action.resultId)

      return {
        ...state,
        results: new_arr
      }
    default:
      return state
  }

}

export default reducer;