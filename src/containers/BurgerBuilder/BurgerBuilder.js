import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuilderControls from '../../components/BuilderControls/BuilderControls';
import { INGREDIENT_LIST } from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import Modal from '../../components/ui/Model/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/ui/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WIthErrorHandler/WithErrorHandler';
import * as actionTypes from '../../store/actions/actionTypes'
import { connect } from 'react-redux'
class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    /* axios
      .get('/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      }); */
  }

  updatePurchaseState = () => {
    const ingredientsQuantity = Object.values(this.props.ingredients).reduce(
      (sum, el) => sum + el,
      0
    );
    console.log('ingredientsQuantity', ingredientsQuantity);
    return ingredientsQuantity > 0 
  }

  disabledInfo = () => {
    const disabledInfo = { ...this.props.ingredients };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    // { bacon: true, cheese: false, ... }
    return disabledInfo;
  };

  updatePurchasingState = () => {
    this.setState({ purchasing: true });
  };

  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout')
    /* 
    let queryParams = [];
    for (const [key, value] of Object.entries(this.props.ingredients)) {
      console.log(`${key} ${value}`); // "bacon 1", "meat 1", "salad 1"
      queryParams.push(`${key}=${value}`)
    }

    
    //Object.entries(obj).forEach(([key, value]) => {
      //console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
    //}); 
    

    console.log(queryParams) //["bacon=1", "cheese=1", "meat=1", "salad=1"]
    queryParams.push(`totalPrice=${this.props.totalPrice}`)
    const queryString = queryParams.join('&');
    console.log(queryString) //bacon=1&cheese=1&meat=1&salad=1

    this.props.history.push({
      pathname: '/checkout',
      search: queryString
    });

    */
  };

  get burger() {
    if (this.state.error) return <p>Can not get ingredients from server!</p>;
    if (!this.props.ingredients) return <Spinner />;

    return (
      <Aux>
        <Burger ingredients={this.props.ingredients} />
        <BuilderControls
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          disabledInfo={this.disabledInfo()}
          totalPrice={this.props.totalPrice}
          purchaseable={this.updatePurchaseState()}
          ordered={this.updatePurchasingState}
        />
      </Aux>
    );
  }

  get orderSummary() {
    if (this.state.loading) return <Spinner />;
    if (!this.props.ingredients) return null;

    return (
      <OrderSummary
        totalPrice={this.props.totalPrice}
        ingredients={this.props.ingredients}
        cancelPurchase={this.cancelPurchaseHandler}
        continuePurchase={this.purchaseContinueHandler}
      />
    );
  }
  render() {
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClose={this.cancelPurchaseHandler}
        >
          {this.orderSummary}
        </Modal>
        {this.burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (name) => dispatch({ type: actionTypes.ADD_INGREDIENTS, ingredientName: name}),
    onIngredientRemoved: (name) => dispatch({ type: actionTypes.REMOVE_INGREDIENTS, ingredientName: name})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));
