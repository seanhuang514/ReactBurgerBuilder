import React, { Component, Suspense } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index'

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import AsyncComponent from './hoc/AsyncComponent/AsyncComponent'

const asyncCheckout = AsyncComponent(() => {
  return import('./containers/Checkout/Checkout')
})

const asyncOrders = AsyncComponent(() => {
  return import('./containers/Orders/Orders')
})

const asyncAuth = () => {
  const LazyAuth = React.lazy(() => import('./containers/Auth/Auth'))
  return <Suspense fallback={<div>Loading....</div>}><LazyAuth /></Suspense>
}

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  get routes() {
    if(this.props.isAuthenticate) {
      return (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/auth" render={() => asyncAuth()} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/"/>
        </Switch>
      )
    }else{
      return(
        <Switch>
          <Route path="/auth" render={() => asyncAuth()} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/"/>
        </Switch>
      )
    }
  }

  render() {
    return(
      <div>
        <Layout>
          {this.routes}
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticate: state.auth.token !== null
  }
}

const mapDispatchToState = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToState)(App));
