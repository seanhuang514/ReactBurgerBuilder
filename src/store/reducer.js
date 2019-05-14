const initialState = {
  counter: 0,
  results:[]
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'INCREMENT':
      /* 
         Object.assign({}, state) same as { ...state }
         those way are not deep clone
      */
      const new_state = Object.assign({}, state);
      new_state.counter = state.counter + 1

      return new_state
    case 'DECREMENT':
      return {
        ...state,
        counter: state.counter - 1
      }
    case 'ADD':
      return {
        ...state,
        counter: state.counter + action.value
      }
    case 'SUBTRACT':
      return {
        ...state,
        counter: state.counter - action.value
      }
    case 'STORE_RESULT':
      return {
        ...state,
        // immutable way to push element to array and return new array
        results: state.results.concat({ id: new Date(), value: state.counter })
      }
    case 'DELETE_RESULT':
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