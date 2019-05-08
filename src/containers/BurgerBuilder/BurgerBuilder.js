import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuilderControls from '../../components/BuilderControls/BuilderControls'
import { INGREDIENT_LIST } from '../../components/Burger/BurgerIngredient/BurgerIngredient'
import Modal from '../../components/ui/Model/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/ui/Spinner/Spinner'
import WithErrorHandler from '../../hoc/WIthErrorHandler/WithErrorHandler'
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      [INGREDIENT_LIST.bacon.name]: 1,
      [INGREDIENT_LIST.cheese.name]: 1,
      [INGREDIENT_LIST.salad.name]: 1,
      [INGREDIENT_LIST.meat.name]: 1
    },
    totalPrice: 4,
    purchaseable: true,
    purchasing: false,
    loading: false
  }

  updatePurchaseState (ingredients) {
    const ingredientsQuantity = Object.values(ingredients).reduce((sum, el) => sum + el, 0);
    console.log('ingredientsQuantity', ingredientsQuantity)
    this.setState({ purchaseable: ingredientsQuantity > 0 })
  }

  addIngredientHandler = (type) => {
    const oldQuantity = this.state.ingredients[type];
    const newQuantity = oldQuantity + 1;
    const newIngredients = {...this.state.ingredients}
    newIngredients[type] = newQuantity

    const oldTotalPrice = this.state.totalPrice;
    const newTotalPrice = oldTotalPrice + INGREDIENT_LIST[type].price;
    
    this.setState({ ingredients: newIngredients, totalPrice: newTotalPrice })
    /* 
      Do not pass this.state.ingredients to updatePurchaseState
      because of setState is asynchronous, you might pass old ingredients
      to updatePurchaseState, so use newIngredients to make sure it is newest ingredients
    */
    this.updatePurchaseState(newIngredients)
  }

  removeIngredientHandler = (type) => {
    const oldQuantity = this.state.ingredients[type];
    const newQuantity = oldQuantity - 1;

    if(newQuantity < 0) return 

    const newIngredients = {...this.state.ingredients}
    newIngredients[type] = newQuantity

    const oldTotalPrice = this.state.totalPrice;
    const newTotalPrice = oldTotalPrice - INGREDIENT_LIST[type].price;
    
    this.setState({ ingredients: newIngredients, totalPrice: newTotalPrice })
    this.updatePurchaseState(newIngredients)
  }

  disabledInfo = () => {
    const disabledInfo = { ...this.state.ingredients }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    // { bacon: true, cheese: false, ... }
    return disabledInfo
  }

  updatePurchasingState = () => {
    this.setState({ purchasing: true })
  }

  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.setState({ loading: true });

    const order = {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice,
      customer: {
        name: 'sean huang',
        address: {
          street: 'test street 1',
          country: 'Taiwan',
          zipCode: '12345'
        },
        email: 'sean.huang@email.com'
      },
      deliveryMethod: 'fastest'
    }

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      })
  }

  orderSummary = () => {
    let orderSummary = <OrderSummary 
                          totalPrice={this.state.totalPrice}
                          ingredients={this.state.ingredients}
                          cancelPurchase={this.cancelPurchaseHandler}
                          continuePurchase={this.purchaseContinueHandler}
                        />
    if(this.state.loading) orderSummary = <Spinner/>;

    return orderSummary;
  }
  render () {
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClose={this.cancelPurchaseHandler}>
          {this.orderSummary()}
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuilderControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabledInfo={this.disabledInfo()} 
          totalPrice={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          ordered={this.updatePurchasingState}
          />
      </Aux>
    )
  }
}

export default WithErrorHandler(BurgerBuilder, axios)