import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuilderControls from '../../components/BuilderControls/BuilderControls'

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      [INGREDIENT_LIST.bacon.name]: 1,
      [INGREDIENT_LIST.cheese.name]: 1,
      [INGREDIENT_LIST.salad.name]: 1,
      [INGREDIENT_LIST.meat.name]: 1
    }
  }
  render () {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuilderControls/>
      </Aux>
    )
  }
}

export default BurgerBuilder