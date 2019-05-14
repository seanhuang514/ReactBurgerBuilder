import React, { Component } from 'react';

import Counter from './containers/redux101/Counter/Counter';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer'

const store = createStore(reducer)
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
