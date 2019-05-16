import React, { Component } from 'react';
import classes from './Checkout.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {
  /* componentWillMount() {
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
  } */

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    if(!this.props.ingredients) return <Redirect to="/"/>

    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          checkoutCancel={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}
        />

        <Route
          path={this.props.match.url + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients
  }
}

export default connect(mapStateToProps)(Checkout);
