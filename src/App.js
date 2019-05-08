import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder qqq='123'></BurgerBuilder>
      </Layout>    
    </div>
  );
}

export default App;
