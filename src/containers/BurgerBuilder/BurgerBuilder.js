import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuilderControls from '../../components/BuilderControls/BuilderControls'

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      bacon: 1,
      cheese: 2,
      salad: 1,
      meat: 2
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