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
import * as actionTypes from '../../store/actions'
import { connect } from 'react-redux'
class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    purchaseable: true,
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

  updatePurchaseState(ingredients) {
    const ingredientsQuantity = Object.values(ingredients).reduce(
      (sum, el) => sum + el,
      0
    );
    console.log('ingredientsQuantity', ingredientsQuantity);
    this.setState({ purchaseable: ingredientsQuantity > 0 });
  }

  addIngredientHandler = type => {
    const oldQuantity = this.props.ingredients[type];
    const newQuantity = oldQuantity + 1;
    const newIngredients = { ...this.props.ingredients };
    newIngredients[type] = newQuantity;

    const oldTotalPrice = this.state.totalPrice;
    const newTotalPrice = oldTotalPrice + INGREDIENT_LIST[type].price;

    this.setState({ ingredients: newIngredients, totalPrice: newTotalPrice });
    /* 
      Do not pass this.props.ingredients to updatePurchaseState
      because of setState is asynchronous, you might pass old ingredients
      to updatePurchaseState, so use newIngredients to make sure it is newest ingredients
    */
    this.updatePurchaseState(newIngredients);
  };

  removeIngredientHandler = type => {
    const oldQuantity = this.props.ingredients[type];
    const newQuantity = oldQuantity - 1;

    if (newQuantity < 0) return;

    const newIngredients = { ...this.props.ingredients };
    newIngredients[type] = newQuantity;

    const oldTotalPrice = this.state.totalPrice;
    const newTotalPrice = oldTotalPrice - INGREDIENT_LIST[type].price;

    this.setState({ ingredients: newIngredients, totalPrice: newTotalPrice });
    this.updatePurchaseState(newIngredients);
  };

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
    let queryParams = [];
    for (const [key, value] of Object.entries(this.props.ingredients)) {
      console.log(`${key} ${value}`); // "bacon 1", "meat 1", "salad 1"
      queryParams.push(`${key}=${value}`)
    }

    /* 
    Object.entries(obj).forEach(([key, value]) => {
      console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
    }); 
    */

    console.log(queryParams) //["bacon=1", "cheese=1", "meat=1", "salad=1"]
    queryParams.push(`totalPrice=${this.state.totalPrice}`)
    const queryString = queryParams.join('&');
    console.log(queryString) //bacon=1&cheese=1&meat=1&salad=1

    this.props.history.push({
      pathname: '/checkout',
      search: queryString
    });
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
          totalPrice={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
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
        totalPrice={this.state.totalPrice}
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
    ingredients: state.ingredients
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (name) => dispatch({ type: actionTypes.ADD_INGREDIENTS, ingredientName: name}),
    onIngredientRemoved: (name) => dispatch({ type: actionTypes.REMOVE_INGREDIENTS, ingredientName: name})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));
