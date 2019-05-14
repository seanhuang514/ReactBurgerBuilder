import React, { Component } from 'react';

import Counter from './containers/redux101/Counter/Counter';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer'

const store = createStore(reducer)
class ReduxApp extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <div style={{textAlign: 'center'}}>
        <Counter />
        </div>
      </Provider>
    );
  }
}

export default ReduxApp;
