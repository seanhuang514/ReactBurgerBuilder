import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuilderControls from '../../components/BuilderControls/BuilderControls'
import { INGREDIENT_LIST } from '../../components/Burger/BurgerIngredient/BurgerIngredient'

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      [INGREDIENT_LIST.bacon.name]: 1,
      [INGREDIENT_LIST.cheese.name]: 1,
      [INGREDIENT_LIST.salad.name]: 1,
      [INGREDIENT_LIST.meat.name]: 1
    },
    totalPrice: 4
  }

  addIngredientHandler = (type) => {
    const oldQuantity = this.state.ingredients[type];
    const newQuantity = oldQuantity + 1;
    const newIngredients = {...this.state.ingredients}
    newIngredients[type] = newQuantity

    const oldTotalPrice = this.state.totalPrice;
    const newTotalPrice = oldTotalPrice + INGREDIENT_LIST[type].price;
    
    this.setState({ ingredients: newIngredients, totalPrice: newTotalPrice })
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
  }

  disabledInfo = () => {
    const disabledInfo = { ...this.state.ingredients }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    // { bacon: true, cheese: false, ... }
    return disabledInfo
  }


  render () {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuilderControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabledInfo={this.disabledInfo()} />
      </Aux>
    )
  }
}

export default BurgerBuilder