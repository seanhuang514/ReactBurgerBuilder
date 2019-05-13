import React, { Component } from 'react';

import Counter from './containers/redux101/Counter/Counter';
import Redux from 'redux';

class App extends Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
       <Counter />
      </div>
    );
  }
}

export default App;
