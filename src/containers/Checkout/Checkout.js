import React, { Component } from 'react';
import classes from './Checkout.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {
  state = {
    ingredients: {
      bacon: 1,
      cheese: 1,
      meat: 1,
      salad: 1
    }
  };

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancel={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}
        />

        <Route path={this.props.match.url + '/contact-data'} component={ContactData}/>
      </div>
    );
  }
}

export default Checkout;
