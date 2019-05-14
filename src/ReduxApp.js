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
const store = createStore(rootReducer)
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
