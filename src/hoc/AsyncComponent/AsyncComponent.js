import React, { Component } from 'react';
/* 用來動態 import 所需要的 class
   可以避免 app 在一開始載入 不必要的 js
   main.chunk.js 從 17.5kb 降至 16.7 kb
   動態載入的 2.chunk.js 為 2.4 kb
 */
const AsyncComponent = importComponent => {
  return class extends Component {
    state = {
      component: null
    };

    componentDidMount() {
      /* 
      這邊的 importComponent function 是傳一個 Promise
      import('../xxx') 會回傳一個 Promise，要取得這個 Promise
      裡面 import 進來的 class 就會用的 .default
      */
      console.log(importComponent())
      importComponent().then(cmp => {
        console.log('cmp',cmp) // 為一個 mudule 裡面有一個名為 default 的 object
        console.log('cmp.default',cmp.default) //class NewPost extends
        this.setState({ component: cmp.default });
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  };
};

export default AsyncComponent;
