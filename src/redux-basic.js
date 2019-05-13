/* node require syntax */
const Redux = require('redux')
const createStore = Redux.createStore;
const initialState = {
  counter: 0
}

//Reducer
/* 
  Reducer 負責根據 action.type 去決定要更改 state 裡的哪個 attribute
  在 return state 的時候記得要是 immutable 的。就是要複製原本的 state 然後
  修改之後再回傳。
*/
const rootReducer = (state = initialState, action) => {
  if(action.type === 'INC_COUNTER') {
    return {
      ...state,
      counter: ++state.counter
    }
  }

  if(action.type === 'ADD_COUNTER') {
    return {
      ...state,
      counter: state.counter + action.value
    }
  }

  return state
}

// Store
/* 
  用 Redux.createStore 來建立 store
  initialize 的時候要傳入一個 reducer
*/
const store = createStore(rootReducer);
console.log('init store',store.getState())

//Subscription
/* 
  監聽 state 的改變然後坐相對應的行為
*/
store.subscribe(() => {
  console.log('[Subscription]', store.getState());
})


//Dispatching Action
/* 
  發送消息 (message) 給 store 告訴他說要做什麼行為，然後 store 會交給 reducer 去實作
*/
store.dispatch({ type: 'INC_COUNTER'});
store.dispatch({ type: 'ADD_COUNTER', value: 10});
console.log('After Dispatch',store.getState())


/* 
init store { counter: 0 }
[Subscription] { counter: 1 }
[Subscription] { counter: 11 }
After Dispatch { counter: 11 }

*/
