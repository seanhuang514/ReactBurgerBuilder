import React, { Component } from 'react';

import Counter from './containers/redux101/Counter/Counter';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import counterReducer from './store/redux101/reducers/counter'
import resultReducer from './store/redux101/reducers/result'

const rootReducer = combineReducers({
  counter: counterReducer,
  result: resultReducer
})

const logger = store => {
  /*　在一開始就執行 */
  console.log('store = ', store) //{getState: ƒ, dispatch: ƒ}
  return next => {
    /*　在一開始就執行 */
    console.log('next = ', next) // ƒ dispatch(action){}
    return action => {
      /*　等到有 action dispatch　過來才執行 */
      console.log('[Middleware] Dispatching = ', action); // {type: "INCREMENT"}
      console.log('[Middleware] before next state = ', store.getState()); //{counter: {counter: 0}, result: {…}}
      const result = next(action);
      console.log('[Middleware] result next(action) = ', result); // {type: "INCREMENT"}
      console.log('[Middleware] next state = ', store.getState()); //{counter: {counter: 1}, result: {…}}
      return result;
    }
  }
}

// console.log('applyMiddleware = ', applyMiddleware(logger)); // ƒ (createStore) , return function(){}
// applyMiddleware 可以帶入多個 middleware, applyMiddleware(logger, logger2, logger 3, ...)
const store = createStore(rootReducer, applyMiddleware(logger))
class ReduxApp extends Component {
  
  render() {
    return (
      /* 用 Provider component 來包住需要跟 redux 溝通的 component */
      <Provider store={store}>
        <div style={{textAlign: 'center'}}>
        <Counter />
        </div>
      </Provider>
    );
  }
}

export default ReduxApp;
