import React, { Component } from 'react';
import classes from './Checkout.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: null
  };

  componentWillMount() {
    // console.log(this.props);
    const query = new URLSearchParams(this.props.location.search);
    let totalPrice = null;
    let ingredients = {};
    query.forEach((value, key) => {
      // console.log(value, key);
      if (key === 'totalPrice') {
        totalPrice = value;
      } else {
        ingredients[key] = value;
      }
    });

    this.setState({ ingredients: ingredients, totalPrice: totalPrice });
  }

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

        <Route
          path={this.props.match.url + '/contact-data'}
          render={() => <ContactData ingredients={this.state.ingredients}
                                     totalPrice={this.state.totalPrice} />}
        />
      </div>
    );
  }
}

export default Checkout;
