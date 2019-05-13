import React, { Component } from 'react';

import Counter from './containers/redux101/Counter/Counter';

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
