import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder qqq='123'></BurgerBuilder>
        <Checkout/>
      </Layout>    
    </div>
  );
}

export default App;
